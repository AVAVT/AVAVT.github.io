TechKidsApp.scrollSpy = (function($, undefined){

	var configs = {
		skinWidth: 100,
		animateClasses : [
			"fade_up",
			"fade_left",
			"fade_right",
			"fade_scale",
		],
		animateOffSuffix : "_off",
		animateTransitionClass : "animate_fade"
	}

	var scrollThrotte = false;
	var viewportHeight = 0;
	var gotFade = false;

	/*
	 * Public functions
	 */
	var init = function(){
		$(window).bind("resize", calculateViewportHeight);
		calculateViewportHeight();
		$(".navbar_at_top").each(function(){
			gotNav = true;
		});

		initFadeElements();

		if(gotFade){
			$(window).bind("scroll",scrollSpy);
			setTimeout(lateInitFadeElements, 100);
		}
	}


	/*
	 * Private functions
	 */
	var calculateViewportHeight = function(){
		viewportHeight = $(window).height() - configs.skinWidth;
		if(viewportHeight < 0) viewportHeight = 0;
	}

	var scrollSpy = function(){
		if(scrollThrotte) return;
		scrollThrotte = true;
		setTimeout(function(){scrollThrotte = false}, 100);

		// Fades
		if(gotFade){
			configs.animateClasses.forEach(function(theClass){
				$("."+ theClass + configs.animateOffSuffix).each(function(){
					if($(this).offset().top > $(window).scrollTop() && $(this).offset().top < $(window).scrollTop() + viewportHeight){
						$(this).removeClass(theClass + configs.animateOffSuffix);
					}
				});
			});
		}

	}

	var initFadeElements = function(){
		configs.animateClasses.forEach(function(theClass){
			$("."+theClass).each(function(){
				$(this).addClass(theClass + configs.animateOffSuffix);

				$(this).removeClass(theClass);

				gotFade = true;
			});
		});
	}

	var lateInitFadeElements = function(){
		configs.animateClasses.forEach(function(theClass){
			$("."+ theClass + configs.animateOffSuffix).each(function(){
				$(this).addClass(configs.animateTransitionClass);
			});
		});

		scrollSpy();
	}

	return {
		init: init,
	}
}(jQuery));
