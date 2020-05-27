
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
