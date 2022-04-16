$(".list-img-item img").click(function(){
    $(".list-img-item img").each(function(){
        $(this).removeClass('hover-img');
    });
    $(this).addClass('hover-img');
    let imgPath = $(this).attr('src');
    $('.main-img img').attr('src',imgPath);
})
$("#btn-pre").click(function(){
    $('.list-img-item').scrollLeft( $('.list-img-item').scrollLeft() - 86 );
})
$("#btn-next").click(function(){
    $('.list-img-item').scrollLeft( $('.list-img-item').scrollLeft() + 86 );
})