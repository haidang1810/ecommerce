
fetch(BASE_URL+API_GROUP+GROUP_GETALL,{
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
			let groups = res.data.map(item => {
				return {
					TenNhom: item.TenNhom,
					MoTa: item.MoTa,
					DieuKien: item.DieuKien.join(", "),
					SoKH: item.SoKH,
					NgayTao: item.NgayTao,
					HanhDong: `
						<button class="btn btn-action btn-danger btn-delete-group" id="${item.MaNhom}">
							<i class="fa-solid fa-trash-can"></i>
						</button>
					`
				};
			});
			$('#table-group').DataTable({
				"lengthMenu": [5, 10, 15, 20, 25, 30, 40 ],
				data: groups,
				"processing": true,
				columns: [
					{data: 'TenNhom'},
					{data: 'MoTa'},
					{data: 'DieuKien'},
					{data: 'SoKH'},
					{data: 'NgayTao'},
					{data: 'HanhDong'}
				]
			});
		}else console.log(res.msg);
	})
	.catch(handlerError);

$('#table-group tbody').on('click', '.btn-delete-group', function() {
	Swal.fire({
		title: 'Bạn có chắc muốn xoá nhóm',
		text: "Bạn không thể khôi phục dữ liệu sau khi xoá!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Xoá',
		cancelButtonText: 'Không'
	}).then((result) => {
		if (result.isConfirmed) {
			let id = $(this).attr('id');
			deleteGroup(id);
		}
	})
	
});
function deleteGroup(id){
	fetch(BASE_URL+API_GROUP+GROUP_DELETE+id,{
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
					title: "Đã xoá nhóm khách hàng thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1200,
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
					timer: 1500
				});
			}
		})
		.catch(handlerError);
}
