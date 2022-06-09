const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
let discountID = params.khuyenmai;

fetch(BASE_URL+API_DISCOUNT+DISCOUNT_GETBYID+discountID,{
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
			$("#input-start").val(res.data.ThoiGianBD.replace(" ","T"));
			$("#input-end").val(res.data.ThoiGianKT.replace(" ","T"));
			$("#input-discount").val(res.data.ChietKhau);
			
			let products = res.data.SanPham.map(item => {
				let Gia = item.Gia - (item.Gia * res.data.ChietKhau / 100);
				return {
					AnhBia: `
						<img src="${item.AnhBia}" class="img-product" alt="Loading...">
					`,
					MaSP: item.MaSP,
					TenSP: item.TenSP,
					TenLoai: item.TenLoai,
					Gia,
					SoLuong: item.SoLuong
				}
			});
			$('#product-list').DataTable({
				"lengthMenu": [5, 10, 15, 20, 25, 30, 40, 50 ],
				data: products,
				"processing": true,
				columns: [
					{data: 'AnhBia'},
					{data: 'MaSP'},
					{data: 'TenSP'},
					{data: 'TenLoai'},
					{data: 'Gia'},
					{data: 'SoLuong'}
				]
			});
		}else console.log(res.msg);
	})
	.catch(handlerError);