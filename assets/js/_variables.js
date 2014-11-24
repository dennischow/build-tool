// Switch
var debugMode = false;

var mobileAgents = /(android|webos|iphone|ipad|ipod|blackberry|opera mini|iemobile|windows phone|mobile)/i;
var currentAgent = navigator.userAgent.toLowerCase();
var scrollBarWidth = scrollBarMeasurement();
var scrollBarWidth;

// Window Scroll Variables
var windowHeight, windowWidth, windowTop, windowBottom;