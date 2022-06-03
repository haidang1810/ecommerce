$('.discount__input--number').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
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
			res.data.map(item => {
				$("#select-group").append(`
					<option value="${item.MaNhom}">${item.TenNhom}</option>
				`);
			})
		}
	})
	.catch(handlerError);
$("#btn-add-campaign").click(function(){
	let name = $("#camp-name").val().trim();
	let id = $("#camp-id").val().trim();
	let content = $("#camp-content").val().trim();
	let type = $("#select-type").val();
	if(!name){
		Toast.fire({
			icon: 'error',
			title: "Chưa nhập tên chiến dịch",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return
	}
	if(!id){
		Toast.fire({
			icon: 'error',
			title: "Chưa nhập mã chiến dịch",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return
	}
	if(!content){
		Toast.fire({
			icon: 'error',
			title: "Chưa nhập nội dung chiến dịch",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2500
		});
		return
	}
	let data = {
		TenCD: name,
		MaCD: id,
		LoaiCD: type,
		NoiDung: content
	}
	let isGroup = $('input[name="group-customer"]:checked').val();
	if(isGroup!="all"){
		let group = $("#select-group").val();
		if(group!=-1)
			data.NhomKH = group;
		else {
			Toast.fire({
				icon: 'error',
				title: "Chưa nhập chọn nhóm khách hàng",
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			});
			return
		}
	}
	let isNow = $('input[name="time-send"]:checked').val();
	if(isNow=='later'){
		let time = $(".input-time-send").val();
		if(!time){
			Toast.fire({
				icon: 'error',
				title: "Chưa chọn thời gian kích hoạt",
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			});
			return
		}
		data.ThoiGian = time;
	}
	let isDiscount = $('input[name="discount-code"]:checked').val();
	if(isDiscount=="yes"){
		let discoutDesc = $("#input-discount-desc").val().trim();
		let discoutValue = $("#input-discount-value").val();
		let expiry = $("#input-expiry").val();
		if(!discoutDesc){
			Toast.fire({
				icon: 'error',
				title: "Chưa nhập mô tả mã khuyến mãi",
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			});
			return
		}
		if(!discoutValue){
			Toast.fire({
				icon: 'error',
				title: "Chưa nhập giá trị mã khuyến mãi",
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			});
			return
		}
		if(!expiry){
			Toast.fire({
				icon: 'error',
				title: "Chưa chọn hạn sử dụng cho khuyến mãi",
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			});
			return
		}
		data.GiamGia = {
			MoTa: discoutDesc,
			TienGiam: discoutValue,
			HanSuDung: expiry
		}
	}
	addCampaign(data);
})
function addCampaign(data){
	$(".loading").toggleClass("loading_hide");
	fetch(BASE_URL+API_CAMPAIGN+CAMPAIGN_ADD,{
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
					title: "Thêm chiến dịch thành công",
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
			$(".loading").toggleClass("loading_hide");
		})
		.catch(handlerError);
}