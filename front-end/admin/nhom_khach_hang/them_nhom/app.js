var conditionList = [];
$("#btn-add-condition").click(function(){
	let property = $("#property").val();
	let condition = $("#condition").val();
	let value = $("#value").val();

	if(property!=-1 && condition!=-1 && value.trim()!=""){
		conditionList.push({
			ThuocTinh: property,
			DieuKien: condition,
			GiaTri: value,
			text: `${property} ${condition} ${value}`
		});
		genderCondition();
		$(".modal__close-btn").click();
	}
})

function genderCondition(){
	$(".condition__list").html("");
	for(let i=0; i<conditionList.length; i++){
		$(".condition__list").append(`
			<div class="condition__item">
				<div class="condition__info">
					${conditionList[i].text}
				</div>
				<div class="condition__control">
					<button class="condition__btn" id="${i}">
						<i class="fa-solid fa-trash-can condition__btn--gray"></i>
					</button>
				</div>
			</div>
		`);
	}
}
$(".condition__list").on('click', ".condition__btn", function(){
	let index = $(this).attr("id");
	conditionList.splice(index,1);
	genderCondition();
});
$("#btn-save-group").click(function(){
	let name = $("#group-name").val().trim();
	let id = $("#group-id").val().trim();
	let desc = $("#group-desc").val().trim();
	if(!name){
		Toast.fire({
			icon: 'error',
			title: "Chưa nhập tên nhóm",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return
	}
	if(!id){
		Toast.fire({
			icon: 'error',
			title: "Chưa nhập mã nhóm",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return
	}
	if(!desc){
		Toast.fire({
			icon: 'error',
			title: "Chưa nhập mô tả",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return
	}
	if(conditionList.length<=0){
		Toast.fire({
			icon: 'error',
			title: "Chưa chọn điều kiện",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return
	}
	let data = {
		MaNhom: id,
		TenNhom: name,
		MoTa: desc,
		DieuKien: conditionList
	}
	fetch(BASE_URL+API_GROUP+GROUP_ADD,{
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
					title: "Thêm nhóm khách hàng thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1500,
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
})