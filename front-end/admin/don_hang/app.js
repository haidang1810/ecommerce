
var orders = [];
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
			orders = res.data;
			genderOrder(orders,-1);
		}else console.log(res.msg);
	})
	.catch(handlerError);
function genderOrder(orderList, filter){
	table.clear().draw();
	order = orderList.map(item => {
		let statusOrder = ``;
		if(filter==-1){
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
			table.row.add([
				item.MaDon,
				item.HoTen,
				item.TongTienHang,
				item.NgayLap,
				statusOrder,
				action
			]).draw(false)
		}else{
			if(item.TrangThai==filter){
				console.log('draw');
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
				table.row.add([
					item.MaDon,
					item.HoTen,
					item.TongTienHang,
					item.NgayLap,
					statusOrder,
					action
				]).draw(false)
			}
		}
		
	});
	
	// table = $('#table-order').DataTable({
	// 	"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
	// 	data: order,
	// 	"processing": true,
	// 	columns: [
	// 		{data: 'MaDon'},
	// 		{data: 'HoTen'},
	// 		{data: 'TongTienHang'},
	// 		{data: 'NgayLap'},
	// 		{data: 'TrangThai', "width": "125px"},
	// 		{data: 'HanhDong', "width": "180px"}
	// 	]
	// });
}
$(".btn-filter-order").click(function(){
	let status = $(this).attr("id");
	genderOrder(orders,Number(status));
})
var table = $('#table-order').DataTable({
		"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
		"processing": true,
		columns: [
			{},
			{},
			{},
			{},
			{"width": "125px"},
			{"width": "180px"}
		]
	});
$("#table-order tbody").on("click", ".btn-change-status",function(){
	let orderID = $(this).attr('id').split('|')[0];
	let status = $(this).attr('id').split('|')[1];
	if(status==0){
		status=1;
	}
	$("#input-order-id").val(orderID);
	$("#select-status").val(status);
})
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