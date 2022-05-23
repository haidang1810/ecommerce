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
			let categories = res.data.map((item) => {
				return {
					MaLoai: item.MaLoai,
					TenLoai: item.TenLoai,
					HanhDong: `
					<button class="btn btn-action btn-primary btn-edit-category" data-toggle="modal" 
					data-target=".modal_edit_category" id="${item.MaLoai}|${item.TenLoai}">
						<i class="fa-solid fa-pen-to-square" ></i>
					</button>
					<button class="btn btn-action btn-danger btn-delete-category"
					id="${item.MaLoai}">
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
					{data: 'MaLoai'},
					{data: 'TenLoai'},
					{data: 'HanhDong'}
				]
			});
			eventEditCategory();
			eventDeleteCategory();
			nextPage();
		}else console.log(res.msg);
	})
	.catch(handlerError);
validator('#form-add-category',{
	formGroup: '.form-group',
	formMessage: '.message-err',
	onSubmit: function(formValues){
		fetch(BASE_URL+API_CATEGORY+CATEGORY_ADD,{
			method: 'POST', 
			credentials: 'include',
			body: JSON.stringify(formValues), 
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
					title: "Thêm danh mục thành công",
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
	}
});
$("#btn-add-category").click(function(){
	$("#form-add-category").submit();
});
$("#btn-edit-category").click(function(){
	$("#form-edit-category").submit();
});
function eventEditCategory(){
	$(".btn-edit-category").click(function(){
		const categoryID = $(this).attr('id').split('|')[0];
		const categoryName = $(this).attr('id').split('|')[1];
		$("#input-category-id").val(categoryID);
		$("#input-category-name").val(categoryName);
	});
}
function deleteCategory(id){
	fetch(BASE_URL+API_CATEGORY+CATEGORY_DELETE+id,{
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
				title: "Đã xoá danh mục thành công",
				background: 'rgba(35, 147, 67, 0.9)',
				color: '#ffffff',
				timer: 1200,
				didClose: ()=>{
					window.location.reload();
				}
			});
		}else{
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
}
function eventDeleteCategory(){
	$(".btn-delete-category").click(function(){
		Swal.fire({
			title: 'Bạn có chắc muốn xoá danh mục',
			text: "Bạn không thể khôi phục sau khi xoá!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Xoá',
			cancelButtonText: 'Không',
			footer: 'Bạn chỉ có thê xoá danh mục chưa có sản phẩm'
		}).then((result) => {
			if (result.isConfirmed) {
				deleteCategory($(this).attr('id'));
			}
		})
	});
}
function nextPage(){
    $(".paginate_button").click(function(){
        eventEditCategory();
        eventDeleteCategory();
        nextPage();
    })
}
validator('#form-edit-category',{
	formGroup: '.form-group',
	formMessage: '.message-err',
	onSubmit: function(formValues){
		fetch(BASE_URL+API_CATEGORY+CATEGORY_EDIT,{
			method: 'POST', 
			credentials: 'include',
			body: JSON.stringify(formValues), 
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
					title: "Cập nhật danh mục thành công",
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
	}
});