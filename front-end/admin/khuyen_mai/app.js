fetch(BASE_URL+API_DISCOUNT+DISCOUNT_GETALL,{
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
			let discounts = res.data.map(item => {
				return {
					ThoiGianBD: item.ThoiGianBD,
					ThoiGianKT: item.ThoiGianKT,
					ChietKhau: item.ChietKhau,
					HanhDong: `
						<a href="./chi_tiet_khuyen_mai/?khuyenmai=${item.Id}" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></a>
						<button class="btn btn-danger delete-discount" id="${item.Id}">
							<i class="fa-solid fa-trash-can"></i>
						</button>
					`
				}
			});
			$('#table-discount').DataTable({
				"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
				data: discounts,
				"processing": true,
				columns: [
					{data: 'ThoiGianBD'},
					{data: 'ThoiGianKT'},
					{data: 'ChietKhau'},
					{data: 'HanhDong'}
				]
			});
		}else console.log(res.msg);
	})
	.catch(handlerError);

$('#table-discount tbody').on('click', '.delete-discount', function() {
	let id = $(this).attr("id");
	Swal.fire({
		title: 'Bạn có chắc muốn xoá đợt khuyến mãi này',
		text: "Bạn không thể khôi phục dữ liệu sau khi xoá!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Xoá',
		cancelButtonText: 'Không'
	}).then((result) => {
		if (result.isConfirmed) {
			deleteDiscount(id);
		}
	})
	
});

function deleteDiscount(id){
	fetch(BASE_URL+API_DISCOUNT+DISCOUNT_DELETE+id,{
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
				title: "Đã xoá đợt khuyến mãi thành công",
				background: 'rgba(35, 147, 67, 0.9)',
				color: '#ffffff',
				timer: 1500,
				didClose: ()=>{
					window.location.reload();
				}
			});
		}else Toast.fire({
			icon: 'error',
			title: res.msg,
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
	})
	.catch(handlerError);
}