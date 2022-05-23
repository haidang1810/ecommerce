

fetch(BASE_URL+API_ORDER+ORDER_GETALL,{
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
			let orders = res.data.map(item => {
				let statusOrder = ``;
				let action = ``;
				if(item.TrangThai==3||item.TrangThai==4||item.TrangThai==5){
					action = `
					<a href="./chi_tiet_don_hang/?donhang=${item.MaDon}" class="btn btn-primary">Chi tiết</a>
					`;
				}else{
					action = `
						<a href="./chi_tiet_don_hang/?donhang=${item.MaDon}" class="btn btn-primary">Chi tiết</a>
						<button class="btn btn-success btn-change-status" data-toggle="modal" 
						id="${item.MaDon}|${item.TrangThai}" data-target=".modal_adit_status">
							Trạng thái
						</button>
					`;
				}
				switch(item.TrangThai){
					case 0: statusOrder = `
						<span class="status-text bg-warning">
							Chờ duyệt
						</span>
						`;
						break;
					case 1: statusOrder = `
						<span class="status-text bg-primary">
							Đã duyệt
						</span>
						`;
						break;
					case 2: statusOrder = `
						<span class="status-text bg-info">
							Đang vận chuyển
						</span>
						`;
						break;
					case 3: statusOrder = `
						<span class="status-text bg-success">
							Giao thành công
						</span>
						`;
						break;
					case 4: statusOrder = `
						<span class="status-text bg-danger">
							Giao thất bại
						</span>
						`;
						break;
					case 5: statusOrder = `
						<span class="status-text bg-danger">
							Đã huỷ
						</span>
						`;
						break;
				}
				return {
					MaDon: item.MaDon,
					HoTen: item.HoTen,
					TongTienHang: item.TongTienHang,
					TrangThai: statusOrder,
					HanhDong: action
				}
			});
			$('#table-order').DataTable({
				"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
				data: orders,
				"processing": true,
				columns: [
					{data: 'MaDon'},
					{data: 'HoTen'},
					{data: 'TongTienHang'},
					{data: 'TrangThai'},
					{data: 'HanhDong'}
				]
			});
			eventEditCategory();
			nextPage();
		}else console.log(res.msg);
	})
	.catch(handlerError);

function nextPage(){
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})
	$(".paginate_button").click(function(){
		eventEditCategory();
		nextPage();
	})
}
function eventEditCategory(){
	$(".btn-change-status").click(function(){
		let orderID = $(this).attr('id').split('|')[0];
		let status = $(this).attr('id').split('|')[1];
		if(status==0){
			status=1;
		}
		$("#input-order-id").val(orderID);
		$("#select-status").val(status);
	});
}
$("#btn-edit-status").click(function(){
	const MaDon = $("#input-order-id").val();
	const TrangThai = $("#select-status").val();
	const data = {
		MaDon,
		TrangThai
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
					title: "Cập nhật Trạng thái thành công",
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
})