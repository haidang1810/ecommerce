


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
	.then(res => {
		if(res.status == 1){
			let products = res.data.map(item => {
				return {
					AnhBia: `<img src="${item.AnhBia}" class="img-product" alt="" />`,
					MaSP: item.MaSP,
					TenSP: item.TenSP,
					TenLoai: item.TenLoai,
					GiaBan: `${numberWithCommas(item.Gia)}đ`,
					SoLuong: item.SoLuong,
					DaBan: item.DaBan,
					HanhDong: `
						<a class="btn btn-action btn-primary" data-toggle="tooltip" data-placement="top" 
						title="Cập nhật sản phẩm" href="./cap_nhat_san_pham/?sanpham=${item.MaSP}">
							<i class="fa-solid fa-pen-to-square"></i>
						</a>
						<button class="btn btn-action btn-danger btn-delete-product" data-toggle="tooltip" 
						id="${item.MaSP}" data-placement="top" title="Ngừng kinh doanh">
							<i class="fa-solid fa-shop-slash"></i>
						</button>
					`
				};
			})
			$('#product-list').DataTable({
				"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
				data: products,
				"processing": true,
				columns: [
					{data: 'AnhBia'},
					{data: 'MaSP'},
					{data: 'TenSP'},
					{data: 'TenLoai'},
					{data: 'GiaBan'},
					{data: 'SoLuong'},
					{data: 'DaBan'},
					{data: 'HanhDong'},
				]
			});
			eventDeleteProduct();
			nextPage();
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

function deleteProduct(id){
	fetch(BASE_URL+API_PRODUCT+PRODUCT_DELETE+id,{
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
			Toast.fire({
				icon: 'success',
				title: "Đã xác nhận ngừng kinh doanh",
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
				timer: 2500
			});
		}
	})
	.catch(handlerError);
}
function eventDeleteProduct(){
	$(".btn-delete-product").click(function(){
		Swal.fire({
			title: 'Bạn có chắc muốn ngừng kinh doanh?',
			text: "Bạn không thể khôi phục sau khi ngừng kinh doanh!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Xoá',
			cancelButtonText: 'Không',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteProduct($(this).attr('id'));
			}
		})
	});
}
function nextPage(){
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})
    $(".paginate_button").click(function(){
        eventDeleteProduct();
        nextPage();
    })
}