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

$('.amount-input').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
$('.amount-input').blur(function(){
    if($(this).val()==""||$(this).val()==0)
        $(this).val(1);
})
$(".btn-sub").on("click", function(){
    let value = Number($('.amount-input').val());
    if(value==0) return;
    $('.amount-input').val(value-1);
})
$(".btn-add").on("click", function(){
    let value = Number($('.amount-input').val());
    $('.amount-input').val(value+1);
})
const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

let productID = params.sanpham;
fetch(BASE_URL+API_PRODUCT+PRODUCT_GETDETAIL+productID, {
	method: 'GET', 
	credentials: 'include',
	headers:{
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	}
})
	.then(statusRes)
	.then(json)
	.then((res)=>{
		if(res.status==1){
			console.log(res.data);
			$(".info-name").html(res.data.TenSP);
			$(".info-rating-total").html(res.data.DanhGia);
			const ratingIcon = renderStarRating(res.data.DanhGia);
			$(".info-rating").append(ratingIcon);
			$(".count-rating-number").html(res.data.LuotDanhGia);
			$(".count-sold-number").html(res.data.DaBan);
			if(res.data.ChietKhau){
				const price = res.data.Gia;
				const discount = res.data.ChietKhau;
				const newPrice = price - (price * discount / 100);
				const priceInfo = `
					<span class="old-price">${price}</span>
					<span class="current-price">${newPrice}</span>
					<div class="info-discount">Giảm ${discount}%</div>
				`;
				$(".info-price").html(priceInfo);
			}else{
				$(".info-price").html(`
					<span class="current-price">${res.data.Gia}</span>
				`);
			}
			$(".product-desc__detail").append(res.data.MoTa);
		}else console.log(res.msg);
	})
	.catch(handlerError);