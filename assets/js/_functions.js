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