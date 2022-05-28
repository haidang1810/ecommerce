$(".payment__item").click(function(){
	$(".payment__item").each(function(){
		$(this).removeClass("payment__item--active");
	})
	$(this).addClass("payment__item--active");
})