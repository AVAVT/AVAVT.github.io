var TechKidsApp = (function($, undefined){
	var init = function(){
		if(TechKidsApp.scrollSpy){
			TechKidsApp.scrollSpy.init();
		}
	}

	return {
		init : init
	}

}(jQuery));

$(document).ready(function(){
	TechKidsApp.init();
});
