
ScrollReveal().reveal('.container', { delay: 500 });

(function () {
  $('[data-toggle="popover"]').popover()
})

// Apply Fluidbox to elements of interest
$('.card img').fluidbox();

// Initialize Fluidbox
$('.card img').fluidbox()
     .on('openend.fluidbox', function() {
          var $img = $(this).find('img');
})
.on('closestart.fluidbox', function() {
    
});

// Call public methods
$(window).scroll(function() {
	$('.card img').fluidbox('close');
});

.fluidbox-overlay {
	    .overlay-1 & {
	        background-color: rgba(255,190,78,.85);
	    }
	    .overlay-2 & {
	        background-color: transparent; /* To override default style */
	        background-image: linear-gradient(
	            to top left,
	            rgba(130,168,158,0.85),
	            rgba(134,150,173,.85)
	        );
	    }
}
