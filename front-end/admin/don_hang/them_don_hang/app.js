
$('#phone-add-customer').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});

var customerList = [];
var customerIdWithSearch = '';
var totalWeight = 0;
var to_district_id;
var to_ward_code;
var transportCost = 0;
var totalPrice = 0;
getAllCustomer();
function getAllCustomer(){
	fetch(BASE_URL+API_CUSTOMER+CUSTOMER_GETALL,{
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
				customerList= res.data;
				$(".select-search__list--customer").html("");
				for(let customer of customerList){
					$(".select-search__list--customer").append(`
						<div class="select-search__item select-search__item--customer">
							<input type="hidden" value="${customer.MaKH}" id="customer-id">
							<p class="select-search__info">
								${customer.HoTen}
							</p>
							<p class="select-search__info">
								${customer.SDT}
							</p>
						</div>
					`)
				}
				$(".select-search__item--customer").hover(function(){
					customerIdWithSearch = $(this).children("#customer-id").val();
				});
				if(customerIdWithSearch){
					genderInfoCustomer(customerIdWithSearch);
				}
			}else console.log(res.msg);
		})
		.catch(handlerError);
}

$("#input-search-customer").focusout(function(){
	if(customerIdWithSearch){
		genderInfoCustomer(customerIdWithSearch);
	}
});
function genderInfoCustomer(customerIdWithSearch){
	const index = customerList.findIndex( (item) => item.MaKH == customerIdWithSearch);
	$("#input-search-customer").val(customerList[index].HoTen);
	$("#input-phone-customer").val(customerList[index].SDT);
	if(customerList[index].Gmail){
		$("#input-gmail-customer").val(customerList[index].Gmail);
	}else{
		$("#input-gmail-customer").val('');
	}
	getAddresByCustomer(customerIdWithSearch);
}
$("#input-search-customer").on('input', function(event){
	const isNumber = isFinite($(this).val());
	let value = $(this).val();
	$(".select-search__list--customer").html("");
	if(isNumber){
		searchCustomerByPhone(value,(data)=>{
			for(let item of data){
				$(".select-search__list--customer").append(`
					<div class="select-search__item select-search__item--customer">
						<input type="hidden" value="${item.MaKH}" id="customer-id">
						<p class="select-search__info">
							${item.HoTen}
						</p>
						<p class="select-search__info">
							${item.SDT}
						</p>
					</div>
				`)
			}
			$(".select-search__item--customer").hover(function(){
				customerIdWithSearch = $(this).children("#customer-id").val();
			});
		});
	}else {
		searchCustomerByName(value,(data)=>{
			for(let item of data){
				$(".select-search__list--customer").append(`
					<div class="select-search__item select-search__item--customer">
						<input type="hidden" value="${item.MaKH}" id="customer-id">
						<p class="select-search__info">
							${item.HoTen}
						</p>
						<p class="select-search__info">
							${item.SDT}
						</p>
					</div>
				`)
			}
			$(".select-search__item--customer").hover(function(){
				customerIdWithSearch = $(this).children("#customer-id").val();
			});
		});
	}
	if($("#input-search-customer").val().trim()==''){
		$(".select-search__list--customer").html("");
		fetch(BASE_URL+API_CUSTOMER+CUSTOMER_GETALL,{
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
					customerList= res.data;
					for(let customer of customerList){
						$(".select-search__list--customer").append(`
							<div class="select-search__item select-search__item--customer">
								<input type="hidden" value="${customer.MaKH}" id="customer-id">
								<p class="select-search__info">
									${customer.HoTen}
								</p>
								<p class="select-search__info">
									${customer.SDT}
								</p>
							</div>
						`)
					}
					$(".select-search__item--customer").hover(function(){
						customerIdWithSearch = $(this).children("#customer-id").val();
					});
				}else console.log(res.msg);
			})
			.catch(handlerError);
		
	}
});

function getAddresByCustomer(id){
	fetch(BASE_URL+API_ADDRESS+ADDRESS_GETBYCUSTOMER+id,{
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
				const address = `${data.address},${data.ward.name}, ${data.district.name}, ${data.province.name}`;
				$("#input-address").val(address);	
				to_district_id = data.district.id;
				to_ward_code = data.ward.id;
				getTransportCost(to_district_id, to_ward_code, totalWeight, (costData)=>{
					transportCost = costData.data.total;
					$(".transport__cost").html(`${numberWithCommas(transportCost)}đ`);
					$("#transport-cost").html(`${numberWithCommas(transportCost)}đ`);
					$("#total-price").html(`${numberWithCommas(totalPrice+transportCost)}đ`);
				})			
			}else console.log(res.msg);
		})
		.catch(handlerError);
}
function searchCustomerByPhone(phone,handle){
	fetch(BASE_URL+API_CUSTOMER+CUSTOMER_SEARCHBYPHONE+phone,{
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
			handle(res.data)
		}else console.log(res.msg);
	})
	.catch(handlerError);
}
function searchCustomerByName(name,handle){
	fetch(BASE_URL+API_CUSTOMER+CUSTOMER_SEARCHBYNAME+name,{
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
			handle(res.data)
		}else console.log(res.msg);
	})
	.catch(handlerError);
}
var products = [];
var productIdWithSearch = '';
fetch(BASE_URL+API_PRODUCT+PRODUCT_GETALL,{
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
			products = res.data;
			$(".select-search__list--product").html("");
			for(let product of products){
				let currentPrice = ``;
				if(product.ChietKhau){
					let price = Number(product.Gia);
					let discount = Number(product.ChietKhau);
					let newPrice = price - (price * discount / 100);
					currentPrice = numberWithCommas(newPrice)+'đ';
				}else{
					currentPrice = numberWithCommas(product.Gia)+'đ';
				}
				$(".select-search__list--product").append(`
					<div class="select-search__item select-search__item--product">
						<input type="hidden" value="${product.MaSP}" id="product-id">
						<div class="row">
							<div class="col-2">
								<img src="${product.AnhBia}" alt="" 
								class="select-search__img product-img">
							</div>
							<div class="col-7">
								<p class="select-search__info--product product-name">
									${product.TenSP}
								</p>
							</div>
							<div class="col-3">
								<p class="select-search__info--product product-price">
									${currentPrice}
								</p>
								<p class="select-search__info--product product-amout">
									Có thể bán: ${product.SoLuong}
								</p>
							</div>
						</div>
					</div>
				`);
			}
			$(".select-search__item--product").hover(function(){
				productIdWithSearch = $(this).children("#product-id").val();
			});
		}else console.log(res.msg);
	})
	.catch(handlerError);

function searchProduct(keyword,handle){
	fetch(BASE_URL+API_PRODUCT+PRODUCT_GETBYKEYWORD+`?keyword=${keyword}`,{
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
				handle(res.data);
			}
		})
		.catch(handlerError);
}

$("#input-search-product").on('input', function(){
	searchProduct($(this).val(),(data)=>{
		$(".select-search__list--product").html("");
		for(let product of data){
			let currentPrice = ``;
			if(product.ChietKhau){
				let price = Number(product.Gia);
				let discount = Number(product.ChietKhau);
				let newPrice = price - (price * discount / 100);
				currentPrice = numberWithCommas(newPrice)+'đ';
			}else{
				currentPrice = numberWithCommas(product.Gia)+'đ';
			}
			$(".select-search__list--product").append(`
				<div class="select-search__item select-search__item--product">
					<input type="hidden" value="${product.MaSP}" id="product-id">
					<div class="row">
						<div class="col-2">
							<img src="${product.AnhBia}" alt="" 
							class="select-search__img product-img">
						</div>
						<div class="col-7">
							<p class="select-search__info--product product-name">
								${product.TenSP}
							</p>
						</div>
						<div class="col-3">
							<p class="select-search__info--product product-price">
								${currentPrice}
							</p>
							<p class="select-search__info--product product-amout">
								Có thể bán: ${product.SoLuong}
							</p>
						</div>
					</div>
				</div>
			`);
		}
		$(".select-search__item--product").hover(function(){
			productIdWithSearch = $(this).children("#product-id").val();
		});
	})
});
var listProductOrder = [];

$("#input-search-product").focusout(function(){
	const isExist = listProductOrder.findIndex( (item) => item.MaSP == productIdWithSearch);
	if(isExist==-1){
		const index = products.findIndex( (item) => item.MaSP == productIdWithSearch);
		let Gia = 0;
		if(products[index].ChietKhau){
			price = products[index].Gia;
			let discount = Number(products[index].ChietKhau);
			Gia = price - (price * discount / 100);
		}else{
			Gia = products[index].Gia;
		}
		listProductOrder.push({
			AnhBia: products[index].AnhBia,
			MaSP: products[index].MaSP,
			TenSP: products[index].TenSP,
			Gia,
			SoLuong: 1,
			ThanhTien: Gia,
			KhoiLuong: products[index].KhoiLuong,
			LuaChon: []
		});
	}else{
		listProductOrder[isExist].SoLuong++;
	}
	productIdWithSearch = '';
	loadProductOrder();
});
function loadProductOrder(){
	tableProduct.clear().draw();
	totalPrice = 0;
	totalWeight = 0;
	listProductOrder.map(async (item)=>{
		totalWeight += Number(item.KhoiLuong);
		totalPrice += item.ThanhTien;
		let response = await fetch(BASE_URL+API_VARIATION+VARIATION_GETBYPRODUCT+item.MaSP,{
			method: 'GET', 
			credentials: 'include',
			headers:{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		});
		let option = await response.json();
		let html = ``;
		if(option.data)
			for(let variation of option.data){
				html+= `
						<div class="modify__name">
							${variation.TenPL}
						</div>
						<div class="modify__option ml-3">
				`;
				for(let option of variation.LuaChon){
					if(option.TrangThai==1){
						html += `
							<div class="modify__option-item modify__option-item--normal" 
							id="${item.MaSP}" optProduct="${option.Id}" 
							variationName="${variation.TenPL}">
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
				`;
			}
		tableProduct.row.add([
			`<img src="${item.AnhBia}" class="table-product-img" alt="">`,
			item.TenSP,
			html,
			`${numberWithCommas(item.Gia)}đ`,
			`
				<div class="amount-control">
					<button class="btn-sub" id="${item.MaSP}">
						<img src="../../../shared/img/icons-remove.svg" alt="loading">
					</button>
					<input type="number" class="amount-input" value="${item.SoLuong}"
					min="1" step="1" id="${item.MaSP}">
					<button class="btn-add" id="${item.MaSP}">
						<img src="../../../shared/img/icons-add.svg" alt="loading">
					</button>
				</div>
			`,
			`${numberWithCommas(item.Gia*item.SoLuong)}đ`,
			`
				<button class="btn btn-action btn-danger btn-remove-product" id="${item.MaSP}">
					<i class="fa-solid fa-trash-can"></i>
				</button>
			`
		]).draw(false);
	});
	getTransportCost(to_district_id, to_ward_code, totalWeight, (costData)=>{
		transportCost = costData.data.total;
		$(".transport__cost").html(`${numberWithCommas(transportCost)}đ`);
		$("#transport-cost").html(`${numberWithCommas(transportCost)}đ`);
		$("#total-price").html(`${numberWithCommas(totalPrice+transportCost)}đ`);
	});
	$('#price-all-product').html(`${numberWithCommas(totalPrice)}đ`);
	$("#total-price").html(`${numberWithCommas(totalPrice+transportCost)}đ`);
}
var tableProduct = $('#product-list').DataTable({
	"lengthMenu": [5, 10, 15, 20, 25, 30, 40, 50 ],
	"processing": true,
});


$('#product-list tbody').on('click', '.modify__option-item--normal', function() {
	$(this).parent(".modify__option").children(".modify__option-item--normal").each(function(){
		$(this).removeClass('modify__option-item--active');
	});
	$(this).addClass('modify__option-item--active');
});
$('#product-list tbody').on('click', '.modify__option-item--normal', function() {
	let index = listProductOrder.findIndex( (item) => item.MaSP == $(this).attr('id'));
	let optionIndex = listProductOrder[index].LuaChon.findIndex((item)=> 
		item.TenPL == $(this).attr('variationName')
	);
	if(optionIndex==-1){
		listProductOrder[index].LuaChon.push({
			TenPL: $(this).attr('variationName'),
			MaLC: $(this).attr('optProduct')
		});
	}else{
		listProductOrder[index].LuaChon.splice(optionIndex,1);
		listProductOrder[index].LuaChon.push({
			TenPL: $(this).attr('variationName'),
			MaLC: $(this).attr('optProduct')
		});
	}
});
$('#product-list tbody').on('click', '.btn-remove-product', function() {
	let index = listProductOrder.findIndex( (item) => item.MaSP == $(this).attr('id'));
	listProductOrder.splice(index,1);
	loadProductOrder();
});
$('#product-list tbody').on('click', '.btn-sub', function() {
	let value = Number($(this).next().val());
	if(value==0) return;
	$(this).next().val(value-1);
	updateAmount($(this).attr('id'), $(this).next().val());
});
$('#product-list tbody').on('click', '.btn-add', function() {
	let value = Number($(this).prev().val());
	$(this).prev().val(value+1);
	updateAmount($(this).attr('id'), $(this).prev().val());
});
$('#product-list tbody').on('keypress', '.amount-input', function(event) {
	var charCode = !event.charCode ? event.which : event.charCode;
		if( charCode == 46 || charCode == 69 || charCode == 101 
		|| charCode == 45 || charCode == 43)
			event.preventDefault();
});
$('#product-list tbody').on('blur', '.amount-input', function() {
	if($(this).val()==""||$(this).val()==0)
		$(this).val(1);
});
$('#product-list tbody').on('input', '.amount-input', function() {
	updateAmount($(this).attr('id'), $(this).val());
});
function updateAmount(id, value){
	let index = listProductOrder.findIndex( (item) => item.MaSP == id);
	listProductOrder[index].SoLuong = Number(value);
	listProductOrder[index].ThanhTien = listProductOrder[index].Gia * listProductOrder[index].SoLuong;
	loadProductOrder();
}
getProvince((data)=>{
	for(let item of data){
		$("#select-province-customer").append(`
			<option value="${item.ProvinceID}" id="${item.ProvinceID}">
				${item.ProvinceName}
			</option>
		`);
		$("#select-province-address").append(`
			<option value="${item.ProvinceID}" id="${item.ProvinceID}">
				${item.ProvinceName}
			</option>
		`);
	}
	$('.selectpicker').selectpicker('refresh');
});
$('#select-province-customer').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		getDistrict(selectedValue,(data)=>{
			$("#select-district-customer").html(`
				<option value="-1">Chọn quận huyện</option>
			`);
			$("#select-ward-customer").html(`
				<option value="-1">Chọn phường xã</option>
			`);
			$('.selectpicker').selectpicker('refresh');
			for(let item of data){
				$("#select-district-customer").removeAttr("disabled");
				$("#select-district-customer").append(`
					<option value="${item.DistrictID}" id="${item.DistrictID}">
					${item.DistrictName}
					</option>
				`);
			}
			$('.selectpicker').selectpicker('refresh');
		});
	}else{
		$("#select-district-customer").html(`
			<option value="-1">Chọn quận huyện</option>
		`);
		$("#select-ward-customer").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$('#select-province-address').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		getDistrict(selectedValue,(data)=>{
			$("#select-district-address").html(`
				<option value="-1">Chọn quận huyện</option>
			`);
			$("#select-ward-address").html(`
				<option value="-1">Chọn phường xã</option>
			`);
			$('.selectpicker').selectpicker('refresh');
			for(let item of data){
				$("#select-district-address").removeAttr("disabled");
				$("#select-district-address").append(`
					<option value="${item.DistrictID}" id="${item.DistrictID}">
					${item.DistrictName}
					</option>
				`);
			}
			$('.selectpicker').selectpicker('refresh');
		});
	}else{
		$("#select-district-address").html(`
			<option value="-1">Chọn quận huyện</option>
		`);
		$("#select-ward-address").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$('#select-district-customer').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		getWard(selectedValue,(data)=>{
			$("#select-ward-customer").html(`
					<option value="-1">Chọn phường xã</option>
				`);
				$('.selectpicker').selectpicker('refresh');
				for(let item of data){
					$("#select-ward-customer").removeAttr("disabled");
					$("#select-ward-customer").append(`
						<option value="${item.WardCode}" id="${item.WardCode}">
							${item.WardName}
						</option>
					`);
				}
				$('.selectpicker').selectpicker('refresh');
		})
	}else{
		$("#select-ward-customer").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$('#select-district-address').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		getWard(selectedValue,(data)=>{
			$("#select-ward-address").html(`
					<option value="-1">Chọn phường xã</option>
				`);
				$('.selectpicker').selectpicker('refresh');
				for(let item of data){
					$("#select-ward-address").removeAttr("disabled");
					$("#select-ward-address").append(`
						<option value="${item.WardCode}" id="${item.WardCode}">
							${item.WardName}
						</option>
					`);
				}
				$('.selectpicker').selectpicker('refresh');
		})
	}else{
		$("#select-ward-address").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$("#btn-add-customer").click(function(){
	$('#form-add-customer').submit();
});
validator('#form-add-customer',{
	formGroup: '.form-group',
	formMessage: '.message-err',
	onSubmit: function(formValues){
		const provinceID = $("#select-province-customer").val();
		const districtID = $("#select-district-customer").val();
		const wardID = $("#select-ward-customer").val();
		if(provinceID!=-1 && districtID!=-1 && wardID!=-1){
			const provinceName = $("#select-province-customer").children(`#${provinceID}`).html().trim();
			const districtName = $("#select-district-customer").children(`#${districtID}`).html().trim();
			const wardName = $("#select-ward-customer").children(`#${wardID}`).html().trim();
			let data = formValues;
			let address = data.DiaChi;
			data.DiaChi = {
				address,
				province: {
					id: provinceID,
					name: provinceName
				},
				district: {
					id: districtID,
					name: districtName
				},
				ward: {
					id: wardID,
					name: wardName
				}
			}
			addCustomer(data);
		}else{
			Toast.fire({
				icon: 'error',
				title: "Chưa chọn địa chỉ",
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 1500
			});
		}
	}
});

function addCustomer(data){
	fetch(BASE_URL+API_CUSTOMER+CUSTOMER_ADD,{
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
					title: "Đã thêm khách hàng thành công.",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1200
				});
				customerIdWithSearch = res.customerID;
				getAllCustomer();
				$('.modal__close-btn').click();
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
}
$("#btn-change-address").click(function(){
	let address = $(".input-address-change").val();
	if(address.trim()==''){
		Toast.fire({
			icon: 'error',
			title: 'Chưa nhập địa chỉ',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 1500
		});
		return;
	}
	const provinceID = $("#select-province-address").val();
	const districtID = $("#select-district-address").val();
	const wardID = $("#select-ward-address").val();
	if(provinceID!=-1 && districtID!=-1 && wardID!=-1){
		const provinceName = $("#select-province-address").children(`#${provinceID}`).html().trim();
		const districtName = $("#select-district-address").children(`#${districtID}`).html().trim();
		const wardName = $("#select-ward-address").children(`#${wardID}`).html().trim();
		to_district_id = districtID;
		to_ward_code = wardID;
		getTransportCost(to_district_id, to_ward_code, totalWeight, (costData)=>{
			transportCost = costData.data.total;
			$(".transport__cost").html(`${numberWithCommas(transportCost)}đ`);
			$("#transport-cost").html(`${numberWithCommas(transportCost)}đ`);
			$("#total-price").html(`${numberWithCommas(totalPrice+transportCost)}đ`);
		});
		let fullAddress = `${address},${wardName},${districtName},${provinceName}`;
		$("#input-address").val(fullAddress);
	}
});
$("#btn-create-order").click(function(){
	addOrder(0);
});
$("#btn-create-accept-order").click(function(){
	addOrder(1);
});
function addOrder(status){
	if(!customerIdWithSearch){
		Toast.fire({
			icon: 'error',
			title: 'Chưa chọn khách hàng',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 1500
		});
		return;
	}
	if(listProductOrder.length<=0){
		Toast.fire({
			icon: 'error',
			title: 'Chưa chọn sản phẩm',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 1500
		});
		return;
	}
	let data = {
		MaKH: customerIdWithSearch,
		DiaChiNhanHang: $("#input-address").val(),
		PhiVanChuyen: transportCost,
		TrangThai: status,
		TongTienHang: totalPrice,
		PhuongThucThanhToan: $('input[name="payment"]:checked').val(),
		SanPham: listProductOrder,
		MaGiamGia: []
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
				Toast.fire({
					icon: 'success',
					title: "Thêm đơn hàng thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1200,
					didClose: ()=>{
						window.location.reload();
					}
				});
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
}