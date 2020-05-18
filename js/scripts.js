$('.receitaFilter a').on('click', function (e) {
  e.preventDefault();
  $(this).tab('show');
});


(function ($) {

    "use strict";

        function isExists(elem){
	    if ($(elem).length > 0) { 
		return true;
	    }
	    return false;
        }

	$(window).on('load', function(){
		
		// ISOTOPE RECEITA WITH FILTER
		if(isExists('.receitaContainer')){
			var $container = $('.receitaContainer');
			$container.isotope({
				filter: '*',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
		 
			$('.receitaFilter a').click(function(e){
                                e.preventDefault();
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
	
	
	$('a[href="#"]').on('click', function(event){
		return;
	});
	
	
})(jQuery);
