let orders = [];
let statusOrder = ["CHỜ XÁC NHẬN", "CHỜ LẤY HÀNG", "ĐANG GIAO", "ĐÃ GIAO", "","ĐÃ HUỶ"];
fetch(BASE_URL+API_ORDER+ORDER_GETBYCUSTOMER,{
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
			orders = res.data;
			genderOrder(-1);
		}else {
			window.location.href = BASE_URL_CLIENT;
		}
	})
	.catch(handlerError);

function genderOrder(status){
	$(".order-list").html("");
	for(let order of orders){
		if(status==-1){
			if(order.TrangThai!=4){
				let html = ``;
				html += `
					<div class="order-item">
						<div class="order-item__status">${statusOrder[order.TrangThai]}</div>
						<div class="order-product__list">
				`;
				for(let product of order.SanPham){
					html += `
						<div class="order-product__item">
							<div class="order-item__img">
								<img src="${product.AnhBia}" alt="Loading...">
							</div>
							<div class="order-item__info">
								<p class="order-item__name">
									${product.TenSP}
								</p>
								<div class="order-item__variation">`;
					if(product.LuaChon)
						for(let variation of product.LuaChon){
							html += `
							<p>${variation.TenPL}: ${variation.TenLC}</p>
							`
						}
					html += `
								</div>
								<div class="order-item__amount">x${product.SoLuong}</div>
							</div>
							<div class="order-item__price">
								${numberWithCommas(product.Gia)}đ
							</div>
						</div>
					`
				}
				html += `
							</div>
						<div class="order-item__footer">
							<div class="order-item__payment">
								Tổng thanh toán: 
								<span class="order-item__payment-value">
									${numberWithCommas(order.TongTienHang+order.PhiVanChuyen-order.TienDuocGiam)}đ
								</span>
							</div>`;
				if(order.TrangThai==3){
					html += `
						<button class="order-item__btn btn-add-rating" id="${order.MaDon}"
						data-toggle="modal" data-target=".modal_rating">
							Đánh giá
						</button>
					`;
				}else if(order.TrangThai==0){
					html += `
						<button class="order-item__btn btn-cancel-order" id="${order.MaDon}">
							Huỷ đơn
						</button>
					`;
				}
							
				html += `	</div>
					</div>
				`;
				$(".order-list").append(html);
			}
		}else{
			if(order.TrangThai == status){
				let html = ``;
				html += `
					<div class="order-item">
						<div class="order-item__status">${statusOrder[order.TrangThai]}</div>
						<div class="order-product__list">
				`;
				for(let product of order.SanPham){
					html += `
						<div class="order-product__item">
							<div class="order-item__img">
								<img src="${product.AnhBia}" alt="Loading...">
							</div>
							<div class="order-item__info">
								<p class="order-item__name">
									${product.TenSP}
								</p>
								<div class="order-item__variation">`;
					if(product.LuaChon)
						for(let variation of product.LuaChon){
							html += `
							<p>${variation.TenPL}: ${variation.TenLC}</p>
							`
						}
					html += `
								</div>
								<div class="order-item__amount">x${product.SoLuong}</div>
							</div>
							<div class="order-item__price">
								${numberWithCommas(product.Gia)}đ
							</div>
						</div>
					`
				}
				html += `
							</div>
						<div class="order-item__footer">
							<div class="order-item__payment">
								Tổng thanh toán: 
								<span class="order-item__payment-value">
									${numberWithCommas(order.TongTienHang+order.PhiVanChuyen-order.TienDuocGiam)}đ
								</span>
							</div>`;
				if(order.TrangThai==3){
					html += `
						<button class="order-item__btn btn-add-rating" id="${order.MaDon}"
						data-toggle="modal" data-target=".modal_rating">
							Đánh giá
						</button>
					`;
				}else if(order.TrangThai==0){
					html += `
						<button class="order-item__btn btn-cancel-order" id="${order.MaDon}">
							Huỷ đơn
						</button>
					`;
				}
							
				html += `	</div>
					</div>
				`;
				$(".order-list").append(html);
			}
		}
	}
}
$(".header-order__item").click(function(){
	$(".header-order__item").each(function(){
		$(this).removeClass("header-order__item--active");
	});
	$(this).addClass("header-order__item--active");
	let id = $(this).attr("id");
	genderOrder(id);
});

$(".order-list").on("click", ".btn-cancel-order", function(){
	let orderID = $(this).attr("id");
	const data = {
		MaDon: orderID,
		TrangThai: 5
	}
	fetch(BASE_URL+API_ORDER+ORDER_CHANGESTATUS,{
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
					title: "Đã huỷ đơn hàng thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1500,
					didClose: ()=>{
						window.location.reload();
					}
				});
			}else {
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
});
$(".order-list").on("click", ".btn-add-rating", function(){
	$("#input-order-id").val($(this).attr("id"));
});

$(".start-item").click(function(){
	let id = Number($(this).attr("id"));
	$(".start-item").each(function(){
		$(this).removeClass("checked");
	})
	$(".start-item").each(function(){
		if(Number($(this).attr("id"))<=id){
			$(this).addClass("checked");
		}
	})
});
$("#btn_submit-rating").click(function(){
	let orderID = $("#input-order-id").val();
	let index = orders.findIndex(item => item.MaDon == orderID);
	let listProduct = orders[index].SanPham.map(item => {
		return item.MaSP;
	});
	let totalStart = $(".start-rating .checked").length;
	let content = $("#input-comment").val();
	Swal.fire({
		title: 'Lưu ý',
		text: `Bạn có chắc muốn đánh giá ${totalStart} cho đơn hàng này`,
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Không',
		confirmButtonText: 'Đồng ý',
	}).then((result) => {
		if (result.isConfirmed) {
			let data = {
				MaDon: orderID,
				NoiDung: content,
				SoSao: totalStart,
				SanPham: listProduct
			};
			addRating(data);
		}
	})
});

function addRating(data){
	fetch(BASE_URL+API_RATING+RATING_ADD,{
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
		.then(data => {
			if(data.status == 1){
				Toast.fire({
					icon: 'success',
					title: "Đã đánh giá đơn hàng thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1200,
					didClose: ()=>{
						window.location.reload();
					}
				});
			}else Toast.fire({
				icon: 'error',
				title: data.msg,
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			})
		})
		.catch(handlerError);
}