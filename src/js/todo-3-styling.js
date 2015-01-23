/**
 * Created by Denny on 22/01/2015.
 */
jQuery(function($){
   //$('.painel').height(window.innerHeight*0.8);

    var resizing_ = function(){
        $('.painel').width((window.innerWidth-$('.tools').width()*3));
    };
    resizing_();
    $( window ).resize(function() {
        console.log('oi');
        resizing_();
    });
});