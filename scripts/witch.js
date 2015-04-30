var WITCH = (function(){
	var DEBUG=false;
	var range=[];
	var handlerInterval;
	var needMapper=false;
	var needFire=false;

	function listener(){
		needFire=true;
	}
	
	function mapper(){
		if(DEBUG) console.log('mapper');
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
		if(DEBUG) console.log('fire at: '+front);

		var arr=range[front];
		for(var k in arr){
			$(arr[k]).addClass('fire');
		}
		delete(range[front]); 
	}

	function tick(){
		if(DEBUG) console.log('tick');
		if(needMapper){
			mapper();
			needMapper=false;
		}
		if(needFire){
			if(DEBUG) console.log('fire');
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
			setInterval(function(){needMapper=true;}, 5000);
			setTimeout(function(){ needMapper=false; needFire=false; },2000);
			
			$(window).resize(function(){ needMapper=true; });
		}
	}	
}
)();
