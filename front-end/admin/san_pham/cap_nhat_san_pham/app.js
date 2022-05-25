const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
let productID = params.sanpham;
if(!productID){
	window.location.href = '../';
}
$('#avatar_input').change(function (event) {
    $('.avatar_img').attr("src",URL.createObjectURL(event.target.files[0]));
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image();      
        img.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}); 
let editor;
DecoupledEditor
	.create( document.querySelector( '#editor' ) )
	.then( newEditor => {
		editor = newEditor;
		const toolbarContainer = document.querySelector( '#toolbar-container' );

		toolbarContainer.appendChild( newEditor.ui.view.toolbar.element );
	} )
	.catch( error => {
		console.error( error );
	} );
$('.input-price').on('input',function(){
    var value = $(this).val().replaceAll('.','').replace(/[^\d]/,'');
    $(this).val(numberWithCommas(value));
})

$('.input-amount').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
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
			$("#select-category").html('');
			res.data.map(item => {
				$("#select-category").append(`
					<option value="${item.MaLoai}">${item.TenLoai}</option>
				`);
			});
		}
	})
	.catch(handlerError);

setTimeout(() => {
	fetch(BASE_URL+API_PRODUCT+PRODUCT_GETDETAIL+productID,{
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
				$("#product-name").val(res.data.TenSP);
				$("#product-id").val(res.data.MaSP);
				$("#select-category").val(res.data.LoaiSP);
				$("#product-price").val(numberWithCommas(res.data.Gia));
				$("#product-amount").val(res.data.SoLuong);
				$("#product-mass").val(res.data.KhoiLuong);
				$(".avatar_img").attr('src',res.data.AnhBia);
				editor.setData(res.data.MoTa);
			}else console.log(res.msg);
		})
		.catch(handlerError);
}, 100);

fetch(BASE_URL+API_IMAGE+IMAGE_GETBYPRODUCT+productID,{
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
			$("#list-img-product").html("");
			for(let image of res.data){
				$("#list-img-product").append(`
					<div class="card-img">
						<div class="card-img__wrapper">
							<button class="card-img__btn" id="${image.Id}">
								<i class="fa-solid fa-xmark"></i>
							</button>
							<img src="${image.DuongDan}" 
							alt="Loading" class="card-img__img">
						</div>
					</div>
				`);
			}
			$(".card-img__btn").click(function(){
				Swal.fire({
					title: 'Bạn có chắc muốn xoá?',
					text: "Bạn không thể khôi phục khi xoá!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Xoá',
					cancelButtonText: 'Không',
				}).then((result) => {
					if (result.isConfirmed) {
						deleteImage($(this).attr('id'));
					}
				})
				
			})
		}else console.log(res.msg);
	})
	.catch(handlerError);

$("#btn-save-product").click(function(){
	$(".info-product").submit();
});
validator('.info-product',{
	formGroup: '.form-group',
	formMessage: '.message-err',
	onSubmit: function(formValues){
		let formData = new FormData();
		formData.append('MaSP', formValues.MaSP);
		formData.append('TenSP', formValues.TenSP);
		formData.append('LoaiSP', formValues.LoaiSP);
		formData.append('KhoiLuong',formValues.KhoiLuong);
		formData.append('Gia', formValues.Gia.toString().replaceAll('.',''));
		formData.append('SoLuong', formValues.SoLuong);
		formData.append('AnhBia', $("#avatar_input")[0].files[0]);
		formData.append('MoTa', editor.getData());
		$(".loading").toggleClass("loading_hide");
		fetch(BASE_URL+API_PRODUCT+PRODUCT_EDIT,{
			method: 'POST', 
			credentials: 'include',
			body: formData, 
			headers:{
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		})
		.then(statusRes)
		.then(json)
		.then((res) => {
			if(res.status==1){
				$(".loading").toggleClass("loading_hide");
				Toast.fire({
					icon: 'success',
					title: "Đã cập nhật sản phẩm thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1200,
					didClose: ()=>{
						window.location.reload();
					}
				});
			}else{
				$(".loading").toggleClass("loading_hide");
				Toast.fire({
					icon: 'error',
					title: data.msg,
					background: 'rgba(220, 52, 73, 0.9)',
					color: '#ffffff',
					timer: 2500
				});
			}
		})
		.catch(handlerError);
	}
});

$('#images_input').change(function (event) {
	$(".loading").toggleClass("loading_hide");
    formImage = new FormData();
	formImage.append(`MaSP`, productID);
	
	for(let i = 0; i < $("#images_input")[0].files.length; i++){
		formImage.append(`Anh`, $("#images_input")[0].files[i]);
	}
	fetch(BASE_URL+API_IMAGE+IMAGE_ADD,{
		method: 'POST', 
		credentials: 'include',
		body: formImage, 
		headers:{
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	})
	.then(statusRes)
	.then(json)
	.then(res => {
		if(res.status == 1){
			$(".loading").toggleClass("loading_hide");
			Swal.fire({
				icon: 'success',
				title: 'Thêm thành công',
				text: `Đã thêm hình ảnh thành công`,
				footer: `Số ảnh thành công: ${res.countUploadSuccess}</br>
					Danh sách ảnh lỗi: ${res.listImgError}`,
				didClose: ()=>{
					window.location.reload();
				}
			})
		}
	})
	.catch(handlerError);
});
function deleteImage(id){
	$(".loading").toggleClass("loading_hide");
	fetch(BASE_URL+API_IMAGE+IMAGE_DELETE+id,{
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
			$(".loading").toggleClass("loading_hide");
			Toast.fire({
				icon: 'success',
				title: "Đã xoá hình ảnh thành công",
				background: 'rgba(35, 147, 67, 0.9)',
				color: '#ffffff',
				timer: 1200,
				didClose: ()=>{
					window.location.reload();
				}
			})
		}else{
			Toast.fire({
				icon: 'error',
				title: res.msg,
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			})
		}
	})
	.catch(handlerError);
}
