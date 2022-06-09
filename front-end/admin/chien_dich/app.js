
fetch(BASE_URL+API_CAMPAIGN+CAMPAIGN_GETALL,{
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
			let camp = res.data.map(item => {
				let LoaiCD = '';
				if(item.LoaiTinNhan==2)
					LoaiCD = 'Gmail';
				else LoaiCD = 'SMS';
				let NhomKH = "Tất cả";
				if(item.NhomKH){
					NhomKH = item.NhomKH;
				}
				let label = ``;
				let now = new Date();
				let activeTime = new Date(item.ThoiGianKichHoat);
				if(activeTime <= now)
					label = `<div class="bg-primary text-white rounded text-center">Đã kích hoạt</div>`;
				else
					label = `<div class="bg-info text-white rounded text-center">Chưa kích hoạt</div>`;
				return {
					MaCD: item.MaCD,
					TenCD: item.TenCD,
					LoaiCD,
					NhomKH,
					ThoiGIan: item.ThoiGianKichHoat,
					TrangThai: label,
					HanhDong: `
						<a href="./chi_tiet_chien_dich/?chiendich=${item.MaCD}" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></a>
					`
				}
			});
			$('#table-campaign').DataTable({
				"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
				data: camp,
				"processing": true,
				columns: [
					{data: 'MaCD'},
					{data: 'TenCD'},
					{data: 'LoaiCD'},
					{data: 'NhomKH'},
					{data: 'ThoiGIan'},
					{data: 'TrangThai'},
					{data: 'HanhDong'}
				]
			});
		}
	})
	.catch(handlerError);