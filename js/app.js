ScrollReveal().reveal('', {
  delay: 500
});

(function () {
  $('[data-toggle="popover"]').popover('show')
})

// Apply Fluidbox to elements of interest
//$('.card img').fluidbox();


//navigation
$(function () {
  'use strict'

  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open')
  })
});
 
// Filter Categoria
(function ($) {

  "use strict";

  function isExists(elem) {
    if ($(elem).length > 0) {
      return true;
    }
    return false;
  }

  $(window).on('load', function () {

    // ISOTOPE RECEITA WITH FILTER
    if (isExists('.receitaContainer')) {
      var $container = $('.receitaContainer');
      $container.isotope({
        filter: '*',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });

      $('.receitaFilter a').click(function () {
        $('.receitaFilter .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
          }
        });
        return false;
      });
    }

  });


  $('a[href="#"]').on('click', function (event) {
    return;
  });


})(jQuery);