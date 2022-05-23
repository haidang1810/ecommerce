fetch(BASE_URL+API_CATEGORY+CATEGORY_GETALL,{
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
			let categories = res.data.map((item, index) => {
				return {
					STT: index+1,
					MaLoai: item.MaLoai,
					TenLoai: item.TenLoai,
					HanhDong: `
					<button class="btn btn-action btn-primary" data-toggle="modal" 
					data-target=".modal_edit_category" id="${item.MaLoai}|${item.TenLoai}">
						<i class="fa-solid fa-pen-to-square" ></i>
					</button>
					<button class="btn btn-action btn-danger" id="${item.MaLoai}">
						<i class="fa-solid fa-trash-can"></i>
					</button>
					`
				};
			});
			$('#table-categories').DataTable({
				"lengthMenu": [5, 10, 15, 20, 25, 30 ],
				data: categories,
				"processing": true,
				columns: [
					{data: 'STT'},
					{data: 'MaLoai'},
					{data: 'TenLoai'},
					{data: 'HanhDong'}
				]
			});
		}else console.log(res.msg);
	})
	.catch(handlerError);