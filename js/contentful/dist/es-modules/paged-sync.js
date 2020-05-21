function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * See <a href="https://www.contentful.com/developers/docs/concepts/sync/">Synchronization</a> for more information.
 * @namespace Sync
 */
import { createRequestConfig, freezeSys, toPlainObject } from 'contentful-sdk-core';
import resolveResponse from 'contentful-resolve-response';
import mixinStringifySafe from './mixins/stringify-safe';
/**
 * @memberof Sync
 * @typedef SyncCollection
 * @prop {Array<Entities.Entry>} entries - All existing entries on first sync. New and updated entries on subsequent syncs.
 * @prop {Array<Entities.Asset>} assets - All existing assets on first sync. New and updated assets on subsequent syncs.
 * @prop {Array<Sync.DeletedEntry>} deletedEntries - List of deleted Entries since last sync
 * @prop {Array<Sync.DeletedAsset>} deletedAssets - List of deleted Assets since last sync
 * @prop {string} nextSyncToken - Token to be sent to the next sync call
 * @prop {function(): Object} toPlainObject() - Returns this Sync collection as a plain JS object
 * @prop {function(?function=, space=): Object} stringifySafe(replacer,space) - Stringifies the Sync collection, accounting for circular references. Circular references will be replaced with just a Link object, with a <code>circular</code> property set to <code>true</code>. See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify">MDN</a> and <a href="https://www.npmjs.com/package/json-stringify-safe">json-stringify-safe</a> for more details on the arguments this method can take.
 */

/**
 * Deleted Entries are the same as Entries, but only appear on the sync API.
 * @memberof Sync
 * @typedef DeletedEntry
 * @type Entities.Entry
 */

/**
 * Deleted Assets are the same as Assets, but only appear on the sync API.
 * @memberof Sync
 * @typedef DeletedAsset
 * @type Entities.Asset
 */

/**
 * This module retrieves all the available pages for a sync operation
 * @private
 * @param {Object} http - HTTP client
 * @param {Object} query - Query object
 * @param {Object} options - Sync options object
 * @param {boolean} [options.resolveLinks = true] - If links should be resolved
 * @param {boolean} [options.removeUnresolved = false] - If unresolvable links should get removed
 * @param {boolean} [options.paginate = true] - If further sync pages should automatically be crawled
 * @return {Promise<SyncCollection>}
 */

export default function pagedSync(http, query) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!query || !query.initial && !query.nextSyncToken && !query.nextPageToken) {
    throw new Error('Please provide one of `initial`, `nextSyncToken` or `nextPageToken` parameters for syncing');
  }

  if (query && query.content_type && !query.type) {
    query.type = 'Entry';
  } else if (query && query.content_type && query.type && query.type !== 'Entry') {
    throw new Error('When using the `content_type` filter your `type` parameter cannot be different from `Entry`.');
  }

  var defaultOptions = {
    resolveLinks: true,
    removeUnresolved: false,
    paginate: true
  };

  var _defaultOptions$optio = _objectSpread({}, defaultOptions, {}, options),
      resolveLinks = _defaultOptions$optio.resolveLinks,
      removeUnresolved = _defaultOptions$optio.removeUnresolved,
      paginate = _defaultOptions$optio.paginate;

  var syncOptions = {
    paginate: paginate
  };
  return getSyncPage(http, [], query, syncOptions).then(function (response) {
    // clones response.items used in includes because we don't want these to be mutated
    if (resolveLinks) {
      response.items = resolveResponse(response, {
        removeUnresolved: removeUnresolved,
        itemEntryPoints: ['fields']
      });
    } // maps response items again after getters are attached


    var mappedResponseItems = mapResponseItems(response.items);

    if (response.nextSyncToken) {
      mappedResponseItems.nextSyncToken = response.nextSyncToken;
    }

    if (response.nextPageToken) {
      mappedResponseItems.nextPageToken = response.nextPageToken;
    }

    return freezeSys(mixinStringifySafe(toPlainObject(mappedResponseItems)));
  }, function (error) {
    throw error;
  });
}
/**
 * @private
 * @param {Array<Entities.Entry|Entities.Array|Sync.DeletedEntry|Sync.DeletedAsset>} items
 * @return {Object} Entities mapped to an object for each entity type
 */

function mapResponseItems(items) {
  var reducer = function reducer(type) {
    return function (accumulated, item) {
      if (item.sys.type === type) {
        accumulated.push(toPlainObject(item));
      }

      return accumulated;
    };
  };

  return {
    entries: items.reduce(reducer('Entry'), []),
    assets: items.reduce(reducer('Asset'), []),
    deletedEntries: items.reduce(reducer('DeletedEntry'), []),
    deletedAssets: items.reduce(reducer('DeletedAsset'), [])
  };
}
/**
 * If the response contains a nextPageUrl, extracts the sync token to get the
 * next page and calls itself again with that token.
 * Otherwise, if the response contains a nextSyncUrl, extracts the sync token
 * and returns it.
 * On each call of this function, any retrieved items are collected in the
 * supplied items array, which gets returned in the end
 * @private
 * @param {Object} http
 * @param {Array<Entities.Entry|Entities.Array|Sync.DeletedEntry|Sync.DeletedAsset>} items
 * @param {Object} query
 * @param {Object} options - Sync page options object
 * @param {boolean} [options.paginate = true] - If further sync pages should automatically be crawled
 * @return {Promise<{items: Array, nextSyncToken: string}>}
 */


function getSyncPage(http, items, query, _ref) {
  var paginate = _ref.paginate;

  if (query.nextSyncToken) {
    query.sync_token = query.nextSyncToken;
    delete query.nextSyncToken;
  }

  if (query.nextPageToken) {
    query.sync_token = query.nextPageToken;
    delete query.nextPageToken;
  }

  if (query.sync_token) {
    delete query.initial;
    delete query.type;
    delete query.content_type;
    delete query.limit;
  }

  return http.get('sync', createRequestConfig({
    query: query
  })).then(function (response) {
    var data = response.data;
    items = items.concat(data.items);

    if (data.nextPageUrl) {
      if (paginate) {
        delete query.initial;
        query.sync_token = getToken(data.nextPageUrl);
        return getSyncPage(http, items, query, {
          paginate: paginate
        });
      }

      return {
        items: items,
        nextPageToken: getToken(data.nextPageUrl)
      };
    } else if (data.nextSyncUrl) {
      return {
        items: items,
        nextSyncToken: getToken(data.nextSyncUrl)
      };
    }
  });
}
/**
 * Extracts token out of an url
 * @private
 */


function getToken(url) {
  var urlParts = url.split('?');
  return urlParts.length > 0 ? urlParts[1].replace('sync_token=', '') : '';
}