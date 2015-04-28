var WITCH = (function(){
	function listener(){
		var position=$(window).scrollTop().valueOf();
		var edge=Math.round(position/100)*100;
		$(window).trigger('witch.'+edge);
	}
	
	function firstScreen(){
		setTimeout(function(){
			$(window).trigger('witch.0');
		}, 1500);
	}


return {init: function(){
		if(!$('.witch').size()) {return true;}
		$(window).scroll(listener);
	
		for(var i=0; i<=100000; i+=100){
			// замыкание: Обработка событий
			(function(){
				var eventName = 'witch.'+i;
				//var className = '.witch-'+i;
				$(window).on(eventName, function(){
					var wh=$(window).height();
					var ws=$(window).scrollTop().valueOf();
					$('.witch').not('.fire').each(function(){
						var element = $(this);
						
						var delay=element.data('witch-offset');
						if(!delay) delay=0;
						var elOffset=element.offset().top;
						var elHeight=element.height();
						var elLine=wh+ws;
						var screenLine=elOffset+elHeight+delay;
						if(screenLine < elLine){ element.addClass('fire'); }
					});
					$(window).off(eventName);
				});
			})(); // конец замыкания
		}
		
		firstScreen();
	}}	
})();
