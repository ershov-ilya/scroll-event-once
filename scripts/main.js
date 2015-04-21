function scrollListener(){
    var position=$(window).scrollTop().valueOf();
    var edge=Math.round(position/100)*100;
    $(window).trigger('witch.'+edge);
}

function activateScrollListner(){
    if(!$('.witch').size()) {return true;}
    $(window).scroll(scrollListener);

    for(var i=100; i<=10000; i+=100){
        // замыкание: Обработка событий
        (function(){
            var eventName = 'witch.'+i;
            //var className = '.witch-'+i;
            $(window).on(eventName, function(){
                var wh=$(window).height();
                var ws=$(window).scrollTop().valueOf();
                var delay=0;
                $('.witch').not('.fire').each(function(){
                    var element = $(this);
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
}

$(document).ready(function(){
	$('.row').not(':first').find('div').addClass('witch');
    activateScrollListner();
});

console.log('Сайт создан веб-разработчиком http://ershov.pw');