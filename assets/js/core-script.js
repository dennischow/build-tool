// Switch
var debugMode = false;

var mobileAgents = /(android|webos|iphone|ipad|ipod|blackberry|opera mini|iemobile|windows phone|mobile)/i;
var currentAgent = navigator.userAgent.toLowerCase();
var scrollBarWidth = scrollBarMeasurement();
var scrollBarWidth;

// Window Scroll Variables
var windowHeight, windowWidth, windowTop, windowBottom;
// Measurement of browser scroll bar width
function scrollBarMeasurement() {
	var scrollbarmeasure = document.createElement('DIV');
	$(scrollbarmeasure).appendTo("BODY").css({"display":"block","position":"absolute","height":"500px","width":"50px","overflow":"scroll","visibility":"hidden"});
	var sbWidth = Math.abs(scrollbarmeasure.offsetWidth - scrollbarmeasure.clientWidth);
	$(scrollbarmeasure).remove();
	if(debugMode) console.log("scrollBarWidth is : " + sbWidth );
	return sbWidth;
}

// Window Data Updates
function windowDateUpdates(){
	windowHeight = $(window).height();
	windowWidth = $(window).width();
	windowTop = $(window).scrollTop();
	windowBottom = windowTop + windowHeight;
	if(debugMode) console.log("windowDateUpdates()" + " - W : " + windowWidth + " -  H : " + windowHeight + " - T : " + windowTop + " - B : " + windowBottom );
}

// Detect Touch Devices
function is_touchDevice() {
	// var mobileAgents = /(android|webos|iphone|ipad|ipod|blackberry|opera mini|iemobile|windows phone|mobile)/i;
	if(debugMode) console.log("Current brwoser is : "+currentAgent);
	if(currentAgent.match(mobileAgents)) return true; else return false;
}

// Detect Browser and applyng class
function browserClass(){
	// Detect Safari Browser
	if( currentAgent.match('safari') ) {$("BODY").addClass('safari');}
	// Detect Chrome Browser
	if( currentAgent.match('chrome') ) {$("BODY").removeClass('safari').addClass('chrome');}
	// Detect Chrome Browser
	if( currentAgent.match('firefox') ) {$("BODY").addClass('firefox');}
	// Detect IE Browser
	if( currentAgent.match('msie') || currentAgent.match('trident/') ) {
		// ie-new is 8 and up || ie-old is 7 and below
		var ver = ( currentAgent.match('trident/') ) ? 'ie-new' : 'ie-old';
		$("BODY").addClass('ie ' + ver);
	}
	// Detect Window Browser
	if( currentAgent.match('window') ) {
		// Window Browser
		$("BODY").addClass('window');
	}
	// Detect Macintosh Browser
	if( currentAgent.match('macintosh') ) {
		// Macintosh Browser
		$("BODY").addClass('macintosh');
	}
	// Detect Desktop Browser
 	if( !currentAgent.match(mobileAgents) ) {$("BODY").addClass('desktop');}else{$("BODY").addClass('mobile');}
}
$(window).on('load',function(e){

}).on('scroll', function(e){

}).on('resize', function(e){

});


$(document).on('ready',function(e){
	DOM.initialize();
});


var DOM = {
	initialize : function(){

		browserClass();

		$("BODY").attr({
			'data-sb-width' : scrollBarWidth
		});

		$('A').on('click', function(e){
			e.preventDefault();
		});

	}
}