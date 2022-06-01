
var products = [];
var listProductPayment = [];
fetch(BASE_URL+API_CART+CART_GETBYUSER,{
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
			products = res.data;
			for(let i=0; i<products.length;i++){
				products[i].checked = '';
			}
			genderCart();
		}else{
			if(res.msg=="Chưa đăng nhập")
				window.location.href = BASE_URL_CLIENT;
			else
			console.log(res.msg);
		}
	})
	.catch(handlerError);

function genderCart(){
	$(".cart__list").html("");
	products.map((item, index) => {
		let html = ``;
		html += `
			<div class="cart__item">
					<div class="cart__item-info">
						<input type="checkbox" class="cart__check" ${item.checked} 
						id="${index}">
						<img src="${item.AnhBia}" alt="Loading" class="cart__img">
						<div class="cart__name">
							<p>${item.TenSP}</p>
						</div>
						<div class="cart__variation">
		`;
		for(let variation of item.LuaChon){
			html += `
				<p class="cart__variation--item">
					${variation.TenPL}: ${variation.TenLC}
				</p>
			`
		}
		html += `
				</div>
			</div>
		`;

		let currentPrice = item.Gia;
		if(item.ChietKhau){
			let price = item.Gia;
			let discount = item.ChietKhau;
			currentPrice = price - (price * discount /100);
			html += `
				<div class="cart__price">
					<div class="cart__old-price">
					${numberWithCommas(price)}đ
					</div>
					<div class="cart__new-price">
						${numberWithCommas(currentPrice)}đ
					</div>
				</div>
			`;
		}else{
			html += `
				<div class="cart__price">
					<div class="cart__new-price">
						${numberWithCommas(currentPrice)}đ
					</div>
				</div>
			`;
		}
		let total = item.SoLuong * currentPrice;
		html += `
				<div class="cart__amount">
					<div class="amount-control">
						<button class="btn-sub" id="${index}">
							<img src="../shared/img/icons-remove.svg" alt="loading">
						</button>
						<input type="number" class="amount-input" value="${item.SoLuong}"
						min="1" step="1" id="${index}">
						<button class="btn-add" id="${index}">
							<img src="../shared/img/icons-add.svg" alt="loading">
						</button>
					</div>
				</div>
				<p class="cart__total-price">${numberWithCommas(total)}đ</p>
				<div class="cart__action">
					<button class="cart__delete" id="${index}">Xoá</button>
				</div>
			</div>
		`
		$(".cart__list").append(html);
	});
	$(".cart__check").change(function(){
		let index = $(this).attr("id");
		if ($(this).is(':checked')) {
			products[index].checked = 'checked';
			let currentPrice = products[index].Gia;
			if(products[index].ChietKhau){
				let price = products[index].Gia;
				let discount = products[index].ChietKhau;
				currentPrice = price - (price * discount /100);
			}
			listProductPayment.push({
				MaSP: products[index].MaSP,
				SoLuong: products[index].SoLuong,
				Gia: currentPrice,
				LuaChon: products[index].LuaChon,
			});
			updateTotalPayment();
		}else{
			products[index].checked = '';
			let indexPay = listProductPayment.findIndex(item => item.MaSP == products[index].MaSP);
			listProductPayment.splice(indexPay,1);
			updateTotalPayment();
		}
	})
}

function updateTotalPayment(){
	$("#total-product").html(`(${listProductPayment.length} Sản phâm):`);
	let total = 0;
	for(let product of listProductPayment){
		total += product.SoLuong * product.Gia;
	}
	$(".cart__payment-total").html(`${numberWithCommas(total)}đ`);
}
$('.cart__list').on('keypress', '.amount-input',function (event) {
	var charCode = !event.charCode ? event.which : event.charCode;
	if( charCode == 46 || charCode == 69 || charCode == 101 
	|| charCode == 45 || charCode == 43)
		event.preventDefault();
});

$(".cart__list").on("blur", '.amount-input',function(){
	if($(this).val()==""||$(this).val()==0)
		$(this).val(1);
})
$(".cart__list").on("input", '.amount-input',function(){
	let index = $(this).attr('id');
	updateAmount(products[index].id, $(this).val(),()=>{
		products[index].SoLuong = $(this).val();
		genderCart();
		if(products[index].checked == 'checked'){
			let indexPay = listProductPayment.findIndex(item => item.MaSP == products[index].MaSP);
			listProductPayment[indexPay].SoLuong = $(this).val();
			updateTotalPayment();
		}
	})
})
$(".cart__list").on("click", '.btn-sub',function(){
	let value = Number($(this).next().val());
	if(value==0) return;
	$(this).next().val(value-1);

	let index = $(this).attr('id');
	updateAmount(products[index].id, $(this).next().val(),()=>{
		products[index].SoLuong--;
		genderCart();
		if(products[index].checked == 'checked'){
			let indexPay = listProductPayment.findIndex(item => item.MaSP == products[index].MaSP);
			listProductPayment[indexPay].SoLuong--;
			updateTotalPayment();
		}
	});	
})
$(".cart__list").on("click", '.btn-add',function(){
	let value = Number($(this).prev().val());
	$(this).prev().val(value+1);

	let index = $(this).attr('id');
	updateAmount(products[index].id, $(this).prev().val(),()=>{
		products[index].SoLuong++;
		genderCart();
		if(products[index].checked == 'checked'){
			let indexPay = listProductPayment.findIndex(item => item.MaSP == products[index].MaSP);
			listProductPayment[indexPay].SoLuong++;
			updateTotalPayment();
		}
	});	
});

function updateAmount(id, amount,handle){
	let data = {
		id,
		SoLuong: amount
	};
	$(".loading").toggleClass("loading_hide");
	fetch(BASE_URL+API_CART+CART_UPDATE,{
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
			$(".loading").toggleClass("loading_hide");
			handle();
		}else{
			$(".loading").toggleClass("loading_hide");
		}
	})
	.catch(handlerError);
}
$(".cart__list").on("click", '.cart__delete',function(){
	let index = $(this).attr("id");
	deleteCart(index,()=>{
		let indexPay = listProductPayment.findIndex(item => item.MaSP == products[index].MaSP);
		listProductPayment.splice(indexPay,1);
		products.splice(index,1);
		updateTotalPayment();
		genderCart();
	});
});
function deleteCart(index,handle){
	let cartID = products[index].id;
	$(".loading").toggleClass("loading_hide");
	fetch(BASE_URL+API_CART+CART_DELETE+cartID,{
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
			$(".loading").toggleClass("loading_hide");
			handle();
		}else{
			$(".loading").toggleClass("loading_hide");
		}
	})
	.catch(handlerError);
}
$(".cart__submit").click(function(){
	if(listProductPayment.length>0){
		let listProduct = listProductPayment.map(item => {
			return {
				MaSP: item.MaSP,
				SoLuong: item.SoLuong,
				LuaChon: item.LuaChon
			}
		});
		console.log(products);
		window.location.href = BASE_URL_CLIENT+'dat_hang/?url='+encodeURIComponent(JSON.stringify(listProduct));
	}else{
		Toast.fire({
			icon: 'error',
			title: "Bạn chưa chọn sản phẩm nào",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
	}
})