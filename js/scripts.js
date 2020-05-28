/*var elem = document.querySelector('.grid');
var pckry = new Packery( elem, {
  // options
  itemSelector: '.grid-item',
  gutter: 10
});


var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: 'none', // select none at first
  columnWidth: '.grid__col-sizer',
  gutter: '.grid__gutter-sizer',
  percentPosition: true,
  stagger: 30,
  // nicer reveal transition
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});


// initial items reveal
imagesLoaded( grid, function() {
  grid.classList.remove('are-images-unloaded');
  msnry.options.itemSelector = '.grid__item';
  var items = grid.querySelectorAll('.grid__item');
  msnry.appended( items );
});

//-------------------------------------//
// hack CodePen to load pens as pages

var nextPenSlugs = [
  '202252c2f5f192688dada252913ccf13',
  'a308f05af22690139e9a2bc655bfe3ee',
  '6c9ff23039157ee37b3ab982245eef28',
];

function getPenPath() {
  var slug = nextPenSlugs[ this.loadCount ];
  return 'https://s.codepen.io/desandro/debug/' + slug;
}

//-------------------------------------//
// init Infinte Scroll

var infScroll = new InfiniteScroll( grid, {
  path: getPenPath,
  append: '.grid__item',
  outlayer: msnry,
  status: '.page-load-status',
});*/


// external js: isotope.pkgd.js

// init Isotope
var iso = new Isotope( '.receitaContainer', {
  itemSelector: '.element-item',
  layoutMode: 'fitRows'
});

// bind filter button click
var filtersElem = document.querySelector('.receitaFilter');
filtersElem.addEventListener( 'click', function( event ) {
  // only work with buttons
  if ( !matchesSelector( event.target, 'a' ) ) {
    return;
  }
  var filterValue = event.target.getAttribute('data-filter');
  // use matching filter function
  filterValue = filterFns[ filterValue ] || filterValue;
  iso.arrange({ filter: filterValue });
});

// change active class on a
var buttonGroups = document.querySelectorAll('.receitaFilter a');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
  buttonGroup.addEventListener( 'click', function( event ) {
    // only work with buttons
    //event.preventDefault()
    if ( !matchesSelector( event.target, 'a' ) ) {
      return;
    }
    buttonGroup.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');
  });
}
/*

(function ($) {

    "use strict";

	$(window).on('load', function(){
		
		// ISOTOPE RECEITA WITH FILTER
		if(isExists('.receitaContainer')){
			var $container = $('.receitaContainer');
			$container.isotope({
				filter: '*',
				
			});
		 
			$('.receitaFilter a').click(function(){  
				$('.receitaFilter .active').removeClass('active');
				$(this).addClass('active');
		 
				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector,
				 });
				 return false;
			}); 
		}
	
	});
	
	
	$('a[href="#"]').on('click', function(event){
		return;
	});
	
	
})(jQuery);


function isExists(elem){
	if ($(elem).length > 0) { 
		return true;
	}
	return false;
}*/
