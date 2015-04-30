var WITCH = (function(){
	var range=[];
	var needMapper=true;
	var needFire=true;
	var handlerInterval;

	function listener(){
		needFire=true;
	}
	
	function mapper(){
		console.log('mapper');
		range=[];

		var $selector = $('.witch').not('.fire');

		if(!$selector.size()) clearInterval(handlerInterval);
		
		$selector.each(function(i){
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
	
	function fireAt(front){
		console.log('fire at: '+front);

		var arr=range[front];
		for(var k in arr){
			$(arr[k]).addClass('fire');
		}
		delete(range[front]); 
	}

	function tick(){
		console.log('tick');
		if(needMapper){
			mapper();
			needMapper=false;
		}
		if(needFire){
			console.log('fire');
			var wh, ws, element, delay, elOffset, elHeight, fireFront, fireFrontLine, screenLine, i, j;
			wh=$(window).height();
			ws=$(window).scrollTop().valueOf();
			fireFront=wh+ws;

			fireFrontLine=Math.round(fireFront/100)*100;
			
			for(j in range){
				if(j>=ws && j<=fireFrontLine) {
					fireAt(j);
				}
			}

			needFire=false;
		}
		return true;		
	}


return {
	init: function(){
			if(!$('.witch').size()) {return true;}
			$(window).scroll(listener);

			handlerInterval = setInterval(tick, 500);
			setInterval(function(){needMapper=true;}, 3000);
			
			$(window).resize(function(){ needMapper=true; });
		}
	}	
}
)();
