$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


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
						<button class="btn btn-action btn-danger" data-toggle="tooltip" 
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
		}else console.log(res.msg);
	})
	.catch(handlerError);