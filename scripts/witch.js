var WITCH = (function(){
	var collection=[];
	var range=[];
	var needrefresh=false;

	function listener(){
		var position=$(window).scrollTop().valueOf();
		var edge=Math.round(position/100)*100;
		$(window).trigger('witch.'+edge);
		needrefresh=true;
	}
	
	function firstScreen(){
		mapper();
		setTimeout(function(){
			$(window).trigger('witch.0');
		}, 1500);
	}
	
	function mapper(){
		console.log('mapper:');
		collection=[];
		range=[];
		
		$('.witch').not('.fire').each(function(i){
			//collection[i]={'fire':0};
			//collection[i]['ptr']=this;
			
			var element= $(this);
			var delay=element.data('witch-offset');
			if(!delay) delay=0;
			var elOffset=element.offset().top;
			var elHeight=element.height();
			if(elHeight>200) elHeight=200;
			var offset=elOffset+elHeight+delay;
			offset=Math.round(offset/100)*100;
			
			//collection[i]['offset']=offset;
			if(!range[offset]) range[offset]=[];
			range[offset].push(this);
		});
	}
	
	function tick(){
		if(needrefresh){
			mapper();
			needrefresh=false;
		}
	}


return {init: function(){
				if(!$('.witch').size()) {return true;}
				$(window).scroll(listener);
				
				
				
				var eventName, wh, ws, element, delay, elOffset, elHeight, fireFront, fireFrontLine, screenLine, i, j;
			
				for(i=0; i<=100000; i+=100){
					// замыкание: Обработка событий
					(function(){
						eventName = 'witch.'+i;
						//if(i<1000) console.log(eventName);
						$(window).on(eventName, function(){
							wh=$(window).height();
							ws=$(window).scrollTop().valueOf();
							fireFront=wh+ws;

							fireFrontLine=Math.round(fireFront/100)*100;
							
							for(j in range){
								if(j>=ws && j<=fireFrontLine) {
									console.log('fire at: '+j);
								}
							}
							$('.witch').not('.fire').each(function(){
								element = $(this);
								
								delay=element.data('witch-offset');
								if(!delay) delay=0;
								elOffset=element.offset().top;
								elHeight=element.height();
								screenLine=elOffset+elHeight+delay;
								if(screenLine < fireFront){ element.addClass('fire'); }
							});
							$(window).off(eventName);
						});
					})(); // конец замыкания
				}
				
				
				
				firstScreen();
				setInterval(tick, 1000);
				$(window).resize(function(){ needrefresh=true; });
			},
			get: function(){
				for(var i in collection){
					console.log(i+') '+collection[i]['offset']+' fire:'+collection[i]['fire']);
				}
				return collection.length;
			},
			show: function(){ console.log(range)}
		}	
})();
