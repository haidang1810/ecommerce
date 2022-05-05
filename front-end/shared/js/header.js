$("#btn-search").click(function(){
	const keyword = $(".header__input").val();
	$(".header__input").val("");
	window.location.href = BASE_URL_CLIENT+`/tim_kiem/?keyword=${keyword}`;
})