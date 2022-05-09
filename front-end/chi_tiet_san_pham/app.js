var listRating = [];
var weightProduct = 0;
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
					<span class="old-price">${numberWithCommas(price)}đ</span>
					<span class="current-price">${numberWithCommas(newPrice)}đ</span>
					<div class="info-discount">Giảm ${discount}%</div>
				`;
				$(".info-price").html(priceInfo);
			}else{
				$(".info-price").html(`
					<span class="current-price">${numberWithCommas(res.data.Gia)}đ</span>
				`);
			}
			
			DecoupledEditor
			.create( document.querySelector( '#editor_detail_product' ) )
			.then( editor => {
				editor.enableReadOnlyMode( 'editor' );
				editor.setData(res.data.MoTa);
			} )
			.catch( error => {
				console.error( error );
			} );
			
			weightProduct = res.data.KhoiLuong;
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
			listRating = res.data;
			if(listRating) renderRatingItem(listRating,-1);
		}else console.log(res.msg);
	})
	.catch(handlerError);

function renderRatingItem(data,filter){
	let fiveStar = 0;
	let fourStar = 0;
	let threeStar = 0;
	let twoStar = 0;
	let oneStar = 0;
	let zeroStar = 0;
	let totalStar = 0;
	let html = ``;
	let sumStar = 0;
	let list = [];
	switch(filter){
			case 5: 
				list = data.filter((rating)=> rating.SoSao==5);
				break
			case 4: 
				list = data.filter((rating)=> rating.SoSao==4);
				break
			case 3: 
				list = data.filter((rating)=> rating.SoSao==3);
				break
			case 2: 
				list = data.filter((rating)=> rating.SoSao==2);
				break
			case 1: 
				list = data.filter((rating)=> rating.SoSao==1);
				break
			case 0: 
				list = data.filter((rating)=> rating.SoSao==0);
				break
			case -1: 
				list = [...data];
				break
	}
	for(let item of list){
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
	}
	for(let item of data){
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
	if(data.length>0){
		let avgStar = sumStar/data.length;
		$(".overview__briefing--start").html(renderStarRating(avgStar));
		$(".overview__briefing--score").html(roundingRating(avgStar));
	}else{
		$(".overview__briefing--start").html(renderStarRating(0));
		$(".overview__briefing--score").html(roundingRating(0));
	}
	
}

$(".overview__filter-button").click(function(){
	const btnId = $(this).attr('id');
	switch(btnId){
		case 'fiveStar': 
				renderRatingItem(listRating,5);
				break
			case 'fourStar': 
				renderRatingItem(listRating,4);
				break
			case 'threeStar': 
				renderRatingItem(listRating,3);
				break
			case 'twoStar': 
				renderRatingItem(listRating,2);
				break
			case 'oneStar': 
				renderRatingItem(listRating,1);
				break
			case 'zeroStar': 
				renderRatingItem(listRating,0);
				break
			case 'totalStar': 
				renderRatingItem(listRating,-1);
				break
	}
});

fetch(BASE_URL+API_IMAGE+IMAGE_GETBYPRODUCT+productID, {
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
			let listImg = res.data;
			listImg.map((item, index)=>{
				if(index==1){
					$(".main-img").html(`
					<img src="${item.DuongDan}" alt="loading">
					`);
				}else{
					$(".list-img-item").append(`
						<img src="${item.DuongDan}" alt="loading">
					`);
				}
			});
			$(".list-img-item img").click(function(){
				$(".list-img-item img").each(function(){
					$(this).removeClass('hover-img');
				});
				$(this).addClass('hover-img');
				let imgPath = $(this).attr('src');
				$('.main-img img').attr('src',imgPath);
			});
		}else console.log(res.msg);
	})
	.catch(handlerError);

checkLogin((data)=>{
	fetch(BASE_URL+API_ADDRESS+ADDRESS_GETBYCUSTOMER+data.id,{
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
				const data = res.data;
				let address = `${data.ward.name}, ${data.district.name}, ${data.province.name}`;
				$(".info-address").html(address);
				$(".label_current_address").html(address);
				getTransportCost(data.district.id, data.ward.id, weightProduct,(costRes)=>{
					if(costRes.code==200){
						let cost = numberWithCommas(costRes.data.total)+'đ';
						$(".info-transport-price").html(`
							Phí vận chuyển: ${cost}
						`);
					}
				});

			}else console.log(res.msg);
		})
		.catch(handlerError);
});





fetch(API_GETPROVINCE, {
	method: 'GET',
	headers:{
		'Content-Type': 'application/json',
		'Token': TOKEN
	}
})
	.then(statusRes)
	.then(json)
	.then((res)=>{
		if(res.code==200){
			for(let item of res.data){
				$("#select_province").append(`
					<option value="${item.ProvinceID}" id="${item.ProvinceID}">
						${item.ProvinceName}
					</option>
				`);
			}
			$('.selectpicker').selectpicker('refresh');
		}else console.log(res.message);
	})
	.catch(handlerError);

$('#select_province').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		fetch(API_GETDISTRICT+`?province_id=${selectedValue}`, {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json',
				'Token': TOKEN
			}
		})
			.then(statusRes)
			.then(json)
			.then((res)=>{
				if(res.code==200){
					$("#select_district").html(`
						<option value="-1">Chọn quận huyện</option>
					`);
					$("#select_ward").html(`
						<option value="-1">Chọn phường xã</option>
					`);
					$('.selectpicker').selectpicker('refresh');
					for(let item of res.data){
						$("#select_district").removeAttr("disabled");
						$("#select_district").append(`
							<option value="${item.DistrictID}" id="${item.DistrictID}">
							${item.DistrictName}
							</option>
						`);
					}
					$('.selectpicker').selectpicker('refresh');
				}else console.log(res.message);
			})
			.catch(handlerError);
	}else{
		$("#select_district").html(`
			<option value="-1">Chọn quận huyện</option>
		`);
		$("#select_ward").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$('#select_district').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		fetch(API_GETWARD+`?district_id=${selectedValue}`, {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json',
				'Token': TOKEN
			}
		})
			.then(statusRes)
			.then(json)
			.then((res)=>{
				if(res.code==200){
					$("#select_ward").html(`
						<option value="-1">Chọn phường xã</option>
					`);
					$('.selectpicker').selectpicker('refresh');
					for(let item of res.data){
						$("#select_ward").removeAttr("disabled");
						$("#select_ward").append(`
							<option value="${item.WardCode}" id="${item.WardCode}">
								${item.WardName}
							</option>
						`);
					}
					$('.selectpicker').selectpicker('refresh');
				}else console.log(res.message);
			})
			.catch(handlerError);
	}else{
		$("#select_ward").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});

$("#btn_select_addres").click(function(){
	if($("#current_address").is(':checked')){
		$('.modal').modal('hide');
	}else{
		const provinceID = $("#select_province").val();
		const districtID = $("#select_district").val();
		const wardID = $("#select_ward").val();
		if(provinceID!=-1 && districtID!=-1 && wardID!=-1){
			const provinceName = $("#select_province").children(`#${provinceID}`).html().trim();
			const districtName = $("#select_district").children(`#${districtID}`).html().trim();
			const wardName = $("#select_ward").children(`#${wardID}`).html().trim();
			const address = `${wardName}, ${districtName}, ${provinceName}`;
			$(".info-address").html(address);
			$(".label_current_address").html(address);
			getTransportCost(districtID, wardID, weightProduct, (res)=>{
				if(res.code==200){
					let cost = numberWithCommas(res.data.total)+'đ';
					$(".info-transport-price").html(`
						Phí vận chuyển: ${cost}
					`);
				}
			})
			$('.modal').modal('hide');
		}
	}
});
