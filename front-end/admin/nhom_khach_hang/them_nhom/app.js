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
	for(let condition of conditionList){
		$(".condition__list").append(`
			<div class="condition__item">
				<div class="condition__info">
					${condition.text}
				</div>
				<div class="condition__control">
					<button class="condition__btn">
						<i class="fa-solid fa-trash-can condition__btn--gray"></i>
					</button>
				</div>
			</div>
		`);
	}
}