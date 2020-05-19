
ScrollReveal().reveal('.container', { delay: 500 });

// Apply Fluidbox to elements of interest
$('.card img').fluidbox();

var $caption = $('<div />', { 'id': 'custom-trigger-1-social' });
$caption
   .html('<div class="img-caption"></div><p class="img-desc"></p><ul><li>Share on:</li><li><a href="#">Facebook</a></li><li><a href="#">Pinterest</a></li><li><a href="#">Twitter</a></li></ul>')
   .appendTo($('body'));
$(document).on('click', '#custom-trigger-1-social', function(e) {
    e.preventDefault();
});

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
