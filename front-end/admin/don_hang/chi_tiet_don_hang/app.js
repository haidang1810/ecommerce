const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
let orderID = params.donhang;
fetch(BASE_URL+API_ORDER+ORDER_GETBYID+orderID,{
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
			$("#input-name-customer").val(res.data.HoTen);
			if(res.data.DiaChiNhanHang){
				$("#input-address").val(res.data.DiaChiNhanHang);
			}else{
				$("#input-address").val(res.data.DiaChi);
			}
			$("#input-phone").val(res.data.SDT);
			$("#input-gmail").val(res.data.Gmail);
			$(".transport__cost").html(`${numberWithCommas(res.data.PhiVanChuyen)}đ`);
			$("#price").html(`${numberWithCommas(res.data.TongTienHang)}đ`);
			$("#transport-cost").html(`${numberWithCommas(res.data.PhiVanChuyen)}đ`);
			$("#total-cost").html(`${numberWithCommas(Number(res.data.PhiVanChuyen)+Number(res.data.TongTienHang))}đ`);
			if(res.data.PhuongThucThanhToan==1){
				$(".payment").html(`
					<div class="form-group">
						<label for="">Thanh toán khi nhận hàng COD</label>
					</div>
				`)
			}else{
				$(".payment").html(`
					<div class="form-group">
						<label for="">Thanh toán trực tuyến</label>
						<div class="payment__item">
							<img src="../../../shared/img/MoMo_Logo.png" alt="">
						</div>
					</div>
				`)
			}
			let products = res.data.SanPham.map((product,index)=>{
				return {
					STT: index+1,
					AnhBia: `<img src="${product.AnhBia}" class="table-product-img" alt="">`,
					TenSP: product.TenSP,
					Gia: `${numberWithCommas(product.Gia)}đ`,
					SoLuong: product.SoLuong,
					ThanhTien: `${numberWithCommas(Number(product.Gia)*Number(product.SoLuong))}đ`
				};
			});
			$('#product-list').DataTable({
				"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
				data: products,
				"processing": true,
				columns: [
					{data: 'STT'},
					{data: 'AnhBia'},
					{data: 'TenSP'},
					{data: 'Gia'},
					{data: 'SoLuong'},
					{data: 'ThanhTien'}
				]
			});
		}else console.log('Lỗi: ',res.msg);
	})
	.catch(handlerError);