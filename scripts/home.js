(function () {


    $("#ppt").hide();
    $("#menu_canvas").click(function () {
        $("#toolbar").fadeIn(1000)
        $("#ppt").hide();
        $("#canvas").fadeIn(1000);
    });
    $("#menu_ppt").click(function () {
        $("#toolbar").fadeOut(1000)
        $("#canvas").hide();
        $("#ppt").fadeIn(1000);
    });


    // $("#menu").on('click',function(){
    // 	$(".chat").slideToggle(1000)
    // })

})();