$(".payment__item").click(function(){
	$(".payment__item").each(function(){
		$(this).removeClass("payment__item--active");
	})
	$(this).addClass("payment__item--active");
});

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

let products;
let totalPrice = 0;
let transportCost = 0;
let totalDiscount = 0;
let vouchers = [];
let customerID = '';
try {
	products = JSON.parse(params.url);
} catch (error) {
	window.location.href = BASE_URL_CLIENT;
}
if(!products){
	window.location.href = BASE_URL_CLIENT;
}else{
	for(let product of products){
		if(!product.MaSP || !product.SoLuong){
			window.location.href = BASE_URL_CLIENT;
		}
	}
}
function getAddress(customerID, handle){
	fetch(BASE_URL+API_ADDRESS+ADDRESS_GETBYCUSTOMER+customerID,{
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
				handle(res.data);				
			}else console.log(res.msg);
		})
		.catch(handlerError);
}
fetch(BASE_URL+API_CUSTOMER+CUSTOMER_GETMYACCOUNT,{
	method: 'GET', 
	credentials: 'include',
	headers:{
		'Content-Type': 'application/json',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	}
})
	.then(statusRes)
	.then(json)
	.then(res => {
		if(res.status == 1){
			customerID = res.data.MaKH;
			$(".header-payment__customer").html(`${res.data.HoTen} ${res.data.SDT}`);
			getAddress(res.data.MaKH, (address)=>{
				$(".header-payment__address").html(`
					${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}
				`);
				getProducts(address);
			})
		}else{
			window.location.href = BASE_URL_CLIENT;
		}
	})
	.catch(handlerError);


$("#btn-open-modal-address").click(function(){
	$("#select_province").val(currentAddres.province.id);
	$('.selectpicker').selectpicker('refresh');
	$('.selectpicker').selectpicker('refresh');

	fetch(API_GETDISTRICT+`?province_id=${currentAddres.province.id}`, {
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
				$('.selectpicker').selectpicker('refresh');
				$('.selectpicker').selectpicker('refresh');
				for(let item of res.data){
					$("#select_district").removeAttr("disabled");
					$("#select_district").append(`
						<option value="${item.DistrictID}" id="${item.DistrictID}">
						${item.DistrictName}
						</option>
					`);
				}
				$("#select_district").val(currentAddres.district.id);
				$('.selectpicker').selectpicker('refresh');
				$('.selectpicker').selectpicker('refresh');
			}else console.log(res.message);
		})
		.catch(handlerError);
	fetch(API_GETWARD+`?district_id=${currentAddres.district.id}`, {
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
				$('.selectpicker').selectpicker('refresh');
				for(let item of res.data){
					$("#select_ward").removeAttr("disabled");
					$("#select_ward").append(`
						<option value="${item.WardCode}" id="${item.WardCode}">
							${item.WardName}
						</option>
					`);
				}
				$("#select_ward").val(currentAddres.ward.id);
				$('.selectpicker').selectpicker('refresh');
				$('.selectpicker').selectpicker('refresh');
			}else console.log(res.message);
		})
		.catch(handlerError);
	setTimeout(() => {
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}, 700);
})
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
fetch(BASE_URL+API_VOUCHER+VOUCHER_GETALL, {
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
			if(res.data){
				vouchers = res.data;
				for(let i=0; i<vouchers.length; i++){
					vouchers[i].ApDung = false;
				}
				genderVoucherList();
			}
		}else console.log("Lỗi",res.message);
	})
	.catch(handlerError);
function genderVoucherList(){
	$(".modal__voucher-list").html("");
	for(let voucher of vouchers){
		if(!voucher.ApDung){
			$(".modal__voucher-list").append(`
				<div class="modal__voucher-item">
					<div class="modal__voucher-info">
						<p class="modal__voucher-desc">${voucher.MoTa}</p>
						<p class="modal__voucher-discount">Giảm ${numberWithCommas(voucher.TienGiam)}đ</p>
						<p class="modal__voucher-time">HSD: ${voucher.HanSuDung}</p>
					</div>
					<div class="modal__voucher-control">
						<button class="modal__voucher-add" id="${voucher.MaGiamGia}">Áp dụng</button>
					</div>
				</div>
			`);
		}else{
			$(".modal__voucher-list").append(`
				<div class="modal__voucher-item">
					<div class="modal__voucher-info">
						<p class="modal__voucher-desc">${voucher.MoTa}</p>
						<p class="modal__voucher-discount">Giảm ${numberWithCommas(voucher.TienGiam)}đ</p>
						<p class="modal__voucher-time">HSD: ${voucher.HanSuDung}</p>
					</div>
					<div class="modal__voucher-control">
					<button class="modal__voucher-delete" id="${voucher.MaGiamGia}">
						<i class="fa-solid fa-x"></i>
					</button>
					</div>
				</div>
			`);
		}
	}
	updateDiscount();
}
$(".modal__voucher-list").on("click", ".modal__voucher-add", function(){
	let id = $(this).attr("id");
	let count = 0;
	for(let i=0; i<vouchers.length; i++){
		if(vouchers[i].ApDung==true)
			count++;
	}
	if(count<2){
		vouchers.map((item, index) => {
			if(item.MaGiamGia==id){
				vouchers[index].ApDung = true;
				return;
			}
		});
		genderVoucherList();
	}else{
		Toast.fire({
			icon: 'error',
			title: "Chỉ được áp dụng tối đa 2 mã giảm giá",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		})
	}
	
})
$(".modal__voucher-list").on("click", ".modal__voucher-delete", function(){
	let id = $(this).attr("id");
	vouchers.map((item, index) => {
		if(item.MaGiamGia==id){
			vouchers[index].ApDung = false;
			return;
		}
	});
	genderVoucherList();
})
function updateDiscount(){
	totalDiscount = 0;
	$(".voucher__list").html("");
	vouchers.map(item => {
		if(item.ApDung){
			totalDiscount += item.TienGiam;
			$(".voucher__list").append(`
				<div class="voucher__item">
					<div class="voucher__description">
						${item.MoTa}
					</div>
					<div class="voucher__discount">
						-${numberWithCommas(item.TienGiam)}đ
					</div>
					<div class="voucher__time">
						${item.HanSuDung}
					</div>
				</div>
			`);
		}
	});
	$("#discount-value").html(`-${numberWithCommas(totalDiscount)}đ`);
	updateTotalPrice();
}
function updateTotalPrice(){
	let totalPayment = totalPrice+transportCost-totalDiscount;
	$("#total-payment").html(`${numberWithCommas(totalPayment)}đ`);
}
async function getProducts(address){
	for(let i=0; i<products.length;i++){
		try {
			let res = await fetch(BASE_URL+API_PRODUCT+PRODUCT_GETDETAIL+products[i].MaSP, {
				method: 'GET', 
				credentials: 'include',
				headers:{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
				}
			});
			let data = await res.json();
			if(data.data.ChietKhau){
				let price = data.data.Gia;
				let discount = data.data.ChietKhau;
				products[i].Gia = price - (price * discount / 100);
			}else{
				products[i].Gia = data.data.Gia;
			}
			products[i].AnhBia = data.data.AnhBia;
			products[i].TenSP = data.data.TenSP;
			products[i].KhoiLuong = data.data.KhoiLuong;
		} catch (error) {
			console.log(error);
		}
	}
	genderProduct(address);
}
function genderProduct(address){
	totalPrice = 0;
	totalWeight = 0;
	products.map(item => {
		totalPrice += item.Gia*item.SoLuong;
		totalWeight += item.KhoiLuong;
		let html = ``;
		html += `
			<div class="product__item">
				<div class="product_info">
					<img src="${item.AnhBia}" class="product__img" alt="">
					<div class="product__name">
						<p>${item.TenSP}</p>
					</div>
					<div class="product__variation">`;
		for(let variation of item.LuaChon){
			html += `
				${variation.TenPL}: ${variation.TenLC}</br>
			`
		}
		html += `	</div>
				</div>
				<div class="product__price">
					${numberWithCommas(item.Gia)}đ
				</div>
				<div class="product__amount">
					${item.SoLuong}
				</div>
				<div class="product__money">
					${numberWithCommas(item.SoLuong*item.Gia)}
				</div>
			</div>
		`;
		$(".product__list").append(html);
	});
	getTransportCost(address.district.id, address.ward.id, totalWeight,(costRes)=>{
		if(costRes.code==200){
			transportCost = costRes.data.total;
			let cost = numberWithCommas(transportCost)+'đ';
			$("#transport-cost").html(cost);
			updateTotalPrice();
		}
	});
	$("#total-price").html(`${numberWithCommas(totalPrice)}đ`);
	updateTotalPrice();
}
$(".payment__submit").click(function(){
	let listVoucher = [];
	for(let voucher of vouchers){
		if(voucher.ApDung){
			listVoucher.push(voucher.MaGiamGia);
		}
	}
	let data = {
		MaKH: customerID,
		DiaChiNhanHang: $(".header-payment__address").html().trim(),
		PhiVanChuyen: transportCost,
		TongTienHang: totalPrice,
		PhuongThucThanhToan: $('input[name="payment"]:checked').val(),
		SanPham: products,
		MaGiamGia: listVoucher,
		TienGiam: totalDiscount
	}
	fetch(BASE_URL+API_ORDER+ORDER_CREATE,{
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
				Swal.fire({
					icon: 'success',
					title: 'Đã thêm',
					text: 'Thêm đơn hàng thành công',
					footer: 'Bạn sẽ được chuyển đến trang chủ',
					didClose: ()=>{
						window.location.href = BASE_URL_CLIENT;
					}
				})
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