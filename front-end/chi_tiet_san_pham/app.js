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
			// console.log(res.data);
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

fetch(BASE_URL+API_RATING+RATING_GETBYPRODUCT+productID, {
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
			renderRatingItem(res.data);
		}else console.log(res.msg);
	})
	.catch(handlerError);

function renderRatingItem(data){
	let fiveStar = 0;
	let fourStar = 0;
	let threeStar = 0;
	let twoStar = 0;
	let oneStar = 0;
	let zeroStar = 0;
	let totalStar = 0;
	let html = ``;
	let sumStar = 0;
	for(let item of data){
		html += `
			<div class="product-rating__item">
				<div class="item__avatar">`;
					if(item.AnhDaiDien){
						html += `
							<img src="${item.AnhDaiDien}" 
							class="item__avatar-img" alt="loading">
						`
					}else{
						html += `
							<img src="../shared/img/user_default.png" 
							class="item__avatar-img" alt="loading">
						`;
					}
		html +=	`</div>
				<div class="item__main">
					<div class="item__name">
						${item.HoTen}
					</div>
					<div class="item__rating">`;
		html += renderStarRating(item.SoSao);
		html += `	</div>
					<div class="item__time">2022-04-18 07:54</div>
					<div class="item__massage">
						${item.NoiDung}
					</div>`;
		if(item.PhanHoi){
			html += `
				<div class="item__reply">
					<p class="item__reply-title">Phản Hồi Của Người Bán</p>
					<p class="item__reply-massage">
						${item.PhanHoi}
					</p>
				</div>
			`;
		}
		html += `</div>
			</div>
		`;
		switch (item.SoSao){
			case 5: 
				fiveStar++;
				break
			case 4: 
				fourStar++;
				break
			case 3: 
				threeStar++;
				break
			case 2: 
				twoStar++;
				break
			case 1: 
				oneStar++;
				break
			case 0: 
				zeroStar++;
				break
		}
		totalStar++;
		sumStar += item.SoSao;
	}
	$(".product-rating__list").html(html);
	$("#fiveStar").html(`5 Sao (${fiveStar})`);
	$("#fourStar").html(`4 Sao (${fourStar})`);
	$("#threeStar").html(`3 Sao (${threeStar})`);
	$("#twoStar").html(`2 Sao (${twoStar})`);
	$("#oneStar").html(`1 Sao (${oneStar})`);
	$("#zeroStar").html(`0 Sao (${zeroStar})`);
	$("#totalStar").html(`Tất cả (${totalStar})`);
	let avgStar = sumStar/data.length;
	$(".overview__briefing--start").html(renderStarRating(avgStar));
	$(".overview__briefing--score").html(roundingRating(avgStar));
}