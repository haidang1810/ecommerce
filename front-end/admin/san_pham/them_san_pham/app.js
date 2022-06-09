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
$('#avatar_input').change(function (event) {
    $('.avatar_img').attr("src",URL.createObjectURL(event.target.files[0]));
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image();      
        img.src = e.target.result;

        img.onload = function () {
            var w = this.width;
            var h = this.height;
            $('#width').html(w);
            $('#height').html(h);
        }
    };
    reader.readAsDataURL(event.target.files[0]);
}); 

$('#img-product-input').change(function (event) {
    $('.list-img-product').html("");
    for(let item of event.target.files){
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();      
            img.src = e.target.result;

            img.onload = function () {
                var w = this.width;
                var h = this.height;
                $('.list-img-product').append(`
                    <div>
                        <img class='img-product' 
                        src='${URL.createObjectURL(item)}' alt="">
                        <p>${w}x${h}</p>
                    </div>
                `);       
            }
        };
        reader.readAsDataURL(item); 
    }
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

var variation = [];

function genderVariation(){
	$(".variation").html("");
	for(let i=0; i<variation.length; i++){
		let html = ``;
		html += `
			<div class="variation__item">
				<div class="variation__header">
					<div class="variation__name">
						${variation[i].TenPL}
					</div>
					<div class="variation__control">
						<button class="variation__btn variation__btn--add add-variation" 
						id="${i}">
							<i class="fa-solid fa-plus"></i>
						</button>
						<button  class="variation__btn variation__btn--delete delete-variation" 
						id="${i}">
							<i class="fa-solid fa-trash-can"></i>
						</button>
					</div>
				</div>
				<div class="variation__option-list variation__option-list--show">
		`;
		for(let j=0; j<variation[i].LuaChon.length; j++){
			html += `
				<div class="variation__option-item">
					<div>${variation[i].LuaChon[j]}</div>
					<div class="variation__control">
						<button  class="variation__btn variation__btn--delete delete-option" 
						id="${j}" varID="${i}">
							<i class="fa-solid fa-trash-can"></i>
						</button>
					</div>
				</div>
			`;
		}
		html += `
				</div>
			</div>
		`;
		$(".variation").append(html);
	}
}
$("#btn-add-varition").click(async function(){
	const { value: varitionName } = await Swal.fire({
		title: 'Thêm phân loại',
		input: 'text',
		inputPlaceholder: 'Nhập tên phân loại'
	})
	if(varitionName){
		variation.push({
			TenPL: varitionName,
			LuaChon: []
		});
		genderVariation();
	}
	
});
$(".variation").on("click", ".add-variation", async function(){
	const { value: optionName } = await Swal.fire({
		title: 'Thêm lựa chọn',
		input: 'text',
		inputPlaceholder: 'Nhập tên lựa chọn'
	});
	if(optionName){
		let variationIndex = $(this).attr("id");
		variation[variationIndex].LuaChon.push(optionName);
		genderVariation();		
	}
})
$(".variation").on("click", ".delete-variation", async function(){
	let variationIndex = $(this).attr("id");
	variation.splice(variationIndex,1);
	genderVariation();
})
$(".variation").on("click", ".delete-option", async function(){
	let variationIndex = $(this).attr("varID");
	optionIndex = $(this).attr("id");
	variation[variationIndex].LuaChon.splice(optionIndex,1);
	genderVariation();
})
validator('.info-product',{
	formGroup: '.form-group',
	formMessage: '.message-err',
	onSubmit: function(formValues){
		let formData = new FormData();
		formData.append('MaSP', formValues.MaSP);
		formData.append('TenSP', formValues.TenSP);
		formData.append('LoaiSP', formValues.LoaiSP);
		formData.append('KhoiLuong',formValues.KhoiLuong);
		formData.append('Gia', formValues.Gia.toString().replace('.',''));
		formData.append('SoLuong', formValues.SoLuong);
		formData.append('AnhBia', $("#avatar_input")[0].files[0]);
		formData.append('MoTa', editor.getData());
		formData.append('PhanLoai', JSON.stringify(variation));
		$(".loading").toggleClass("loading_hide");
		fetch(BASE_URL+API_PRODUCT+PRODUCT_ADD,{
			method: 'POST', 
			credentials: 'include',
			body: formData, 
			headers:{
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		})
		.then(statusRes)
		.then(json)
		.then(res => {
			if(res.status == 1){
				formImage = new FormData();
				formImage.append(`MaSP`, formValues.MaSP);
				
				for(let i = 0; i < $("#img-product-input")[0].files.length; i++){
					formImage.append(`Anh`, $("#img-product-input")[0].files[i]);
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
							text: `Đã thêm sản phẩm thành công`,
							footer: `Số ảnh thành công: ${res.countUploadSuccess}</br>
								Danh sách ảnh lỗi: ${res.listImgError}`
						})
					}
				})
				.catch(handlerError);
			}else {
				$(".loading").toggleClass("loading_hide");
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
$("#btn-add-product").click(function(){
	$(".info-product").submit();
})
$(".variation").on("click", ".variation__name", function(){
	$(this).parent('.variation__header').next(".variation__option-list").toggleClass("variation__option-list--show");
});