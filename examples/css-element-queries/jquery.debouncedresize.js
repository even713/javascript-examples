/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
	$special,
	resizeTimeout,
	winWidth = $(window).width(),
	t1 = new Date().getTime(),
	threshold;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}
		
		var newWinWidth = $(window).width();
		var t2 = new Date().getTime();
		if(t2 - t1 > $special.threshold) {
			threshold = $special.threshold;
			t1 = t2;
		} 
		//console.log(["threshold", threshold])
		if((newWinWidth < 979 && winWidth >= 979) || (newWinWidth >= 979 && winWidth < 979)) {
			//console.log("delay resize");
			myTimer = new Date().getTime();
			threshold = 400;
			winWidth = newWinWidth;
		}
		
		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, threshold );
	},
	threshold: 300
};

})(jQuery);