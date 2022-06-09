const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
let campaignID = params.chiendich;
fetch(BASE_URL+API_CAMPAIGN+CAMPAIGN_GETBYID+campaignID,{
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
			let data = res.data;
			console.log(data);
			$("#input-id").val(data.MaCD);
			$("#input-name").val(data.TenCD);
			$("#input-content").val(data.NoiDung);
			$(".time-active").html(data.ThoiGianKichHoat);
			if(data.LoaiTinNhan==2)
				$(".type-massage").html("Gmail");
			else
				$(".type-massage").html("SMS");
			let customers = data.KhachHang.map(item => {
				let status = ``;
				if(item.TrangThai==1){
					status = `
						<div class="bg-primary text-white rounded text-center">
							Gửi thành công
						</div>
					`;
				}else if (item.TrangThai==2){
					status = `
						<div class="bg-danger text-white rounded text-center">
							Gửi thất bại
						</div>
					`;
				}else{
					status = `
						<div class="bg-info text-white rounded text-center">
							Chưa kích hoạt
						</div>
					`;
				}
				return {
					MaKH: item.MaKH,
					HoTen: item.HoTen,
					SDT: item.SDT,
					Gmail: item.Gmail,
					TrangThai: status
				}
			})
			$('#table-customer').DataTable({
				"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
				data: customers,
				"processing": true,
				columns: [
					{data: 'MaKH'},
					{data: 'HoTen'},
					{data: 'SDT'},
					{data: 'Gmail'},
					{data: 'TrangThai'}
				]
			});
		}else console.log(res.msg);
	})
	.catch(handlerError);