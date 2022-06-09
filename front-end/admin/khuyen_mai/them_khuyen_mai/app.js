$('#input_discount').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
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
			let discount = Number(product.ChietKhau);
			Gia = price - (price * discount / 100);
		}else{
			Gia = products[index].Gia;
		}
		listProductOrder.push({
			AnhBia: products[index].AnhBia,
			MaSP: products[index].MaSP,
			TenSP: products[index].TenSP,
			TenLoai: products[index].TenLoai, 
			Gia,
			SoLuong: products[index].SoLuong, 
			ThanhTien: Gia,
			KhoiLuong: products[index].KhoiLuong,
		});
	}
	productIdWithSearch = '';
	loadProductOrder();
});
var tableProduct = $('#product-list').DataTable({
	"lengthMenu": [5, 10, 15, 20, 25, 30, 40, 50 ],
	"processing": true,
});

function loadProductOrder(){
	tableProduct.clear().draw();
	totalPrice = 0;
	totalWeight = 0;
	listProductOrder.map(async (item)=>{
		totalWeight += Number(item.KhoiLuong);
		totalPrice += item.ThanhTien;
		tableProduct.row.add([
			`<img src="${item.AnhBia}" class="table-product-img" alt="">`,
			item.MaSP,
			item.TenSP,
			item.TenLoai,
			`${numberWithCommas(item.Gia)}đ`,
			item.SoLuong,
			`
				<button class="btn btn-action btn-danger btn-remove-product" id="${item.MaSP}">
					<i class="fa-solid fa-trash-can"></i>
				</button>
			`
		]).draw(false);
	});
}
$('#product-list tbody').on('click', '.btn-remove-product', function() {
	let index = listProductOrder.findIndex( (item) => item.MaSP == $(this).attr('id'));
	listProductOrder.splice(index,1);
	loadProductOrder();
});
fetch(BASE_URL+API_CATEGORY+CATEGORY_GETALL,{
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
			for(let category of res.data){
				$("#select-category").append(`
					<option id="${category.TenLoai}">${category.TenLoai}</option>
				`);
			}
			$('.selectpicker').selectpicker('refresh');
		}
	})
	.catch(handlerError);
$('#select-category').on('changed.bs.select', function (e) {
	let categories =  $(e.currentTarget).val();
	products.map(item => {
		const index = listProductOrder.findIndex( (products) => products.MaSP == item.MaSP);
		if(categories.includes(item.TenLoai) && index==-1){
			let Gia = 0;
			if(item.ChietKhau){
				price = item.Gia;
				let discount = Number(item.ChietKhau);
				Gia = price - (price * discount / 100);
			}else{
				Gia = item.Gia;
			}
			listProductOrder.push({
				AnhBia: item.AnhBia,
				MaSP: item.MaSP,
				TenSP: item.TenSP,
				TenLoai: item.TenLoai, 
				Gia,
				SoLuong: item.SoLuong, 
				ThanhTien: Gia,
				KhoiLuong: item.KhoiLuong,
			})
		}
		loadProductOrder();
	})
});
$("#btn-save-discount").click(function(){
	let listProdutID = listProductOrder.map(item => item.MaSP);
	let start = $("#input_start").val();
	let end = $("#input_end").val();
	let discountValue = $("#input_discount").val();
	if(!start){
		Toast.fire({
			icon: 'error',
			title: 'Chưa chọn thời gian bắt đầu',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return;
	}
	if(!end){
		Toast.fire({
			icon: 'error',
			title: 'Chưa chọn thời gian kết thúc',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return;
	}
	if(!listProdutID){
		Toast.fire({
			icon: 'error',
			title: 'Chưa chọn sản phẩm cho đợt khuyến mãi',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return;
	}
	if(!discountValue){
		Toast.fire({
			icon: 'error',
			title: 'Chưa nhập chiét khấu khuyến mãi',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return;
	}
	if(Number(discountValue)>100 || Number(discountValue)==0){
		Toast.fire({
			icon: 'error',
			title: 'Chưa nhập chiét khấu không hợp lệ',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return;
	}
	let data = {
		ThoiGianBD: start,
		ThoiGianKT: end,
		ChietKhau: discountValue,
		SanPham: listProdutID
	};
	let now = new Date();
	let dateStart = new Date(start);
	let dateEnd = new Date(end);
	if(dateStart<now){
		Toast.fire({
			icon: 'error',
			title: 'Thời gian bắt đầu không được nhỏ hơn thời gian hiện tại',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return;
	}
	if(dateStart>dateEnd){
		Toast.fire({
			icon: 'error',
			title: 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc',
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return;
	}
	fetch(BASE_URL+API_DISCOUNT+DISCOUNT_ADD,{
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
		.then(res => {
			if(res.status == 1){
				Toast.fire({
					icon: 'success',
					title: "Thêm đợt khuyến mãi thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1500,
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
					timer: 2500
				});
			}
		})
		.catch(handlerError);
})