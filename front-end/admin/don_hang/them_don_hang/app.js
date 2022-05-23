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

$("#input-search-customer").focusout(function(){
	if(customerIdWithSearch){
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
});
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
					$(".transport__cost").html(`${numberWithCommas(costData.data.total)}đ`)
					$("#transport-cost").html(`${numberWithCommas(costData.data.total)}đ`)
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
$("#input-search-product").focusout(function(){
	const index = products.findIndex( (item) => item.MaSP == productIdWithSearch);
})