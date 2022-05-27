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
		'Content-Type': 'application/json',
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
			res.data.LuotDanhGia ? $(".count-rating-number").html(res.data.LuotDanhGia) : $(".count-rating-number").html('0');
			res.data.DaBan ? $(".count-sold-number").html(res.data.DaBan) : $(".count-sold-number").html('0');
			$(".amount-total").html(`${res.data.SoLuong} sản phẩm sẳn có`);
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
			'Content-Type': 'application/json',
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

let perPage = 6;
let currentPage = 1;
let start = (currentPage-1) * perPage;
let end = currentPage * perPage;

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
	
	let totalPage = Math.ceil(list.length / perPage);
	list.map((item, index)=>{
		if(index>=start && index<end){
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
								<img src="https://res.cloudinary.com/jwb/image/upload/v1652092431/images_default/user_default_dpsjgs.png" 
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
	});
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
	renderPagingBtn(totalPage,list,filter);
}
function renderPagingBtn(totalPage,listRatingRender,filter){
	
	let html = `
	<div class="pagination rating-pagination">
	<button class="pagination__btn pagination__btn--first">
		<i class="fa-solid fa-angles-left"></i>
	</button>
	<button class="pagination__btn pagination__btn--prev">
		<i class="fa-solid fa-angle-left"></i>
	</button>
	`;
	if(totalPage - currentPage < 7 && totalPage - currentPage >0){
		if(currentPage>=totalPage-6 ){
			if(totalPage>6){
				for(let i=totalPage-6; i<=totalPage; i++){
					if(i==currentPage)
						html += `
							<button class="pagination__btn 
							pagination__btn--page pagination__btn--number
							pagination__btn--active">
								${i}
							</button>
						`;
					else html += `
							<button class="pagination__btn 
							pagination__btn--page pagination__btn--number">
								${i}
							</button>
						`;
				}
			}else{
				console.log("4");
				for(let i=1; i<=totalPage; i++){
					if(i==currentPage)
						html += `
							<button class="pagination__btn 
							pagination__btn--page pagination__btn--number
							pagination__btn--active">
								${i}
							</button>
						`;
					else html += `
							<button class="pagination__btn 
							pagination__btn--page pagination__btn--number">
								${i}
							</button>
						`;
				}
			}
			
		}else if(totalPage > 3){
			for(let i=1; i<=3; i++){
				if(i==currentPage)
					html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number
						pagination__btn--active">
							${i}
						</button>
					`;
				else html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number">
							${i}
						</button>
					`;
			}
			html += `
			<button class="pagination__btn pagination__btn--page">
				...
			</button>`;
		}else{
			for(let i=currentPage; i<=totalPage; i++){
				if(i==currentPage)
					html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number
						pagination__btn--active">
							${i}
						</button>
					`;
				else html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number">
							${i}
						</button>
					`;
			}
		}
		if(totalPage>=7 && currentPage < totalPage-6 ){
			for(let i=totalPage-3; i<=totalPage; i++){
				if(i==currentPage)
					html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number
						pagination__btn--active">
							${i}
						</button>
					`;
				else html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number">
							${i}
						</button>
					`;
			}
		}else if(totalPage<7 && currentPage < totalPage-6){
			for(let i=1; i<=totalPage; i++){
				if(i==currentPage)
					html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number
						pagination__btn--active">
							${i}
						</button>
					`;
				else html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number">
							${i}
						</button>
					`;
			}
		}
	}else {
		if(totalPage>=3){
			if(currentPage<= totalPage-7){
				for(let i=currentPage; i<=currentPage+2; i++){
					if(i==currentPage)
						html += `
							<button class="pagination__btn 
							pagination__btn--page pagination__btn--number
							pagination__btn--active">
								${i}
							</button>
						`;
					else html += `
							<button class="pagination__btn 
							pagination__btn--page pagination__btn--number">
								${i}
							</button>
						`;
				}
				html += `
					<button class="pagination__btn pagination__btn--page">
						...
					</button>
				`;
				for(let i=totalPage-2; i<=totalPage; i++){
					if(i==currentPage)
						html += `
							<button class="pagination__btn 
							pagination__btn--page pagination__btn--number
							pagination__btn--active">
								${i}
							</button>
						`;
					else html += `
							<button class="pagination__btn 
							pagination__btn--page pagination__btn--number">
								${i}
							</button>
						`;
				}
			}else{
				if(totalPage>6){
					for(let i=totalPage-6; i<=totalPage; i++){
						if(i==currentPage)
							html += `
								<button class="pagination__btn 
								pagination__btn--page pagination__btn--number
								pagination__btn--active">
									${i}
								</button>
							`;
						else html += `
								<button class="pagination__btn 
								pagination__btn--page pagination__btn--number">
									${i}
								</button>
							`;
					}
				}else{
					for(let i=1; i<=totalPage; i++){
						if(i==currentPage)
							html += `
								<button class="pagination__btn 
								pagination__btn--page pagination__btn--number
								pagination__btn--active">
									${i}
								</button>
							`;
						else html += `
								<button class="pagination__btn 
								pagination__btn--page pagination__btn--number">
									${i}
								</button>
							`;
					}
				}
			}
			
		}else {
			for(let i=1; i<=totalPage; i++){
				if(i==currentPage)
					html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number
						pagination__btn--active">
							${i}
						</button>
					`;
				else html += `
						<button class="pagination__btn 
						pagination__btn--page pagination__btn--number">
							${i}
						</button>
					`;
			}
		}
	}
	html += `
		<button class="pagination__btn pagination__btn--next">
			<i class="fa-solid fa-angle-right"></i>
		</button>
		<button class="pagination__btn pagination__btn--last">
			<i class="fa-solid fa-angles-right"></i>
		</button>
		</div>
	`;
	$(".product-rating__list").append(html);
	$(".pagination__btn--next").click(function(){
		currentPage++;
		if(currentPage > totalPage)
			currentPage = totalPage;
		start = (currentPage-1) * perPage;
		end = currentPage * perPage;
		renderRatingItem(listRatingRender,filter)
	});
	$(".pagination__btn--prev").click(function(){
		currentPage--;
		if(currentPage <= 1)
			currentPage = 1;
		start = (currentPage-1) * perPage;
		end = currentPage * perPage;
		renderRatingItem(listRatingRender,filter)
	});
	$(".pagination__btn--number").click(function(){
		currentPage = Number($(this).html());
		start = (currentPage-1) * perPage;
		end = currentPage * perPage;
		renderRatingItem(listRatingRender,filter)
	});
	$(".pagination__btn--first").click(function(){
		currentPage=1;
		start = (currentPage-1) * perPage;
		end = currentPage * perPage;
		renderRatingItem(listRatingRender,filter)
	});
	$(".pagination__btn--last").click(function(){
		currentPage=totalPage;
		start = (currentPage-1) * perPage;
		end = currentPage * perPage;
		renderRatingItem(listRatingRender,filter)
	});
}
function reActiveBtnRatingFilter(){
	$(".overview__filter-button").each(function(){
		$(this).removeClass("overview__filter-button--active");
	})
}
$(".overview__filter-button").click(function(){
	reActiveBtnRatingFilter();
	$(this).addClass("overview__filter-button--active");
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
			'Content-Type': 'application/json',
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
	if(data)
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

$(".btn-add-cart").click(function(){
	const data = {
		MaSP: productID,
		SoLuong: $(".amount-input").val()
	};
	fetch(BASE_URL+API_CART+CART_ADD,{
		method: 'POST', 
		credentials: 'include',
		body: JSON.stringify(data), 
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	})
		.then(statusRes)
		.then(json)
		.then((res)=>{
			if(res.status==1){
				Toast.fire({
					icon: 'success',
					title: "Đã giỏ hàng thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 2000
				});
				getCart();
			}else{
				Toast.fire({
					icon: 'error',
					title: res.msg,
					background: 'rgba(220, 52, 73, 0.9)',
					color: '#ffffff',
					timer: 2000
				});
			}
		})
		.catch(handlerError);
})

fetch(BASE_URL+API_VARIATION+VARIATION_GETBYPRODUCT+productID,{
	method: 'GET', 
	credentials: 'include',
	headers:{
		'Content-Type': 'application/json',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	}
})
	.then(statusRes)
	.then(json)
	.then((res)=>{
		if(res.status==1){
			let html = ``;
			for(let variation of res.data){
				html+= `
					<div class="modify__item row">
						<div class="modify__name col-2">
							${variation.TenPL}
						</div>
						<div class="modify__option col-10 row">
				`;
				for(let option of variation.LuaChon){
					if(option.TrangThai==1){
						html += `
							<div class="modify__option-item modify__option-item--normal" id="${option.Id}">
								${option.TenLC}
							</div>
						`;
					}else{
						html += `
							<div class="modify__option-item modify__option-item--disable">
								${option.TenLC}
							</div>
						`;
					}
				}
				html += `
						</div>
					</div>
				`;
			}
			$(".info-modify").html(html);
			$(".modify__option-item--normal").click(function(){
				$(".modify__option-item--normal").each(function(){
					$(this).removeClass('modify__option-item--active');
				});
				$(this).addClass('modify__option-item--active');
			})
		}
	})
	.catch(handlerError);