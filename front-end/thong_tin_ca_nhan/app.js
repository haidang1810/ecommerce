var customerID = "";
var currentAddres = {};
checkLogin((data)=>{
	if(data){
		customerID = data.id;
		fetch(BASE_URL+API_CUSTOMER+CUSTOMER_GETMYACCOUNT,{
			method: 'GET', 
			credentials: 'include',
			headers:{
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		})
			.then(statusRes)
			.then(json)
			.then((res)=>{
				if(res.status==1){
					$("#profile-username").html(res.data.TaiKhoan);
					$("#profile-fullName").val(res.data.HoTen);
					if(res.data.Gmail){
						const arrGmail = res.data.Gmail.split("@");
						let mainGmail = arrGmail[0].substr(0,2);
						for(let i=2;i<=arrGmail[0].length-1;i++){
							mainGmail += '*';
						}
						const gmailHash = mainGmail+'@'+arrGmail[1];
						$("#profile-email").html(gmailHash);
					}
					else
						$("#profile-email").html('Chưa cập nhật');
					const phone = res.data.SDT;
					let phoneHash = '';
					for(let i=0; i<phone.length-2;i++)
						phoneHash += "*";
					phoneHash += phone.substr(phone.length-2,phone.length-1);
					$("#profile-phone").html(phoneHash);
					if(res.data.GioiTinh){
						if(res.data.GioiTinh==1)
							$('#male').attr("checked",'true');
						else $('#female').attr("checked",'true');
					}
					if(res.data.NgaySinh){
						let date = new Date(res.data.NgaySinh);
						var day = ("0" + date.getDate()).slice(-2);
						var month = ("0" + (date.getMonth() + 1)).slice(-2);

						var birthDay = date.getFullYear()+"-"+(month)+"-"+(day);
						$("#profile-birth").val(birthDay);
					}
					if(res.data.AnhDaiDien){
						$("#profile-avatar").attr("src",res.data.AnhDaiDien);
					}
				}else console.log(res.msg);
			})
			.catch(handlerError);

		fetch(BASE_URL+API_ADDRESS+ADDRESS_GETBYCUSTOMER+data.id,{
			method: 'GET', 
			credentials: 'include',
			headers:{
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		})
			.then(statusRes)
			.then(json)
			.then((res)=>{
				if(res.status==1){
					const data = res.data;
					currentAddres = data;
					$("#profile-address").html(`
						<span>
							${data.address}<br>
							${data.ward.name}, ${data.district.name}, ${data.province.name}
						</span>
					`);
					$("#input-address").val(data.address);
					
				}else console.log(res.msg);
			})
			.catch(handlerError);
		
	}else{
		window.location.href = BASE_URL_CLIENT;
	}
});
validator('#form-change-email',{
	formGroup: '.form-group',
    formMessage: '.message-err',
	onSubmit: function(formValues){
		fetch(BASE_URL+API_CUSTOMER+CUSTOMER_CHANGEGMAIL,{
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
			.then(data => {
				if(data.status == 1){
					Toast.fire({
						icon: 'success',
						title: "Đã cập nhật gmail thành công",
						background: 'rgba(35, 147, 67, 0.9)',
						color: '#ffffff',
						timer: 1200,
						didClose: ()=>{
							window.location.reload();
						}
					});
				}else Toast.fire({
					icon: 'error',
					title: data.msg,
					background: 'rgba(220, 52, 73, 0.9)',
					color: '#ffffff',
					timer: 2500
				})
			})
			.catch(handlerError);
	}
});
$("#btn_submit_change_mail").click(function(){
	$("#form-change-email").submit();
});
$('#input-phone').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
$("#btn-send-code").click(function(){
	const phone = $("#input-phone").val();
	if(phone){
		fetch(BASE_URL+API_CUSTOMER+CUSTOMER_GETVERIFYCODE+phone,{
			method: 'GET', 
			credentials: 'include',
			headers:{
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		})
			.then(statusRes)
			.then(json)
			.then((res)=>{
				if(res.status==1){
					Toast.fire({
						icon: 'success',
						title: res.msg,
						background: 'rgba(35, 147, 67, 0.9)',
						color: '#ffffff',
						timer: 2000,
					});
				}else{
					Toast.fire({
						icon: 'error',
						title: data.msg,
						background: 'rgba(220, 52, 73, 0.9)',
						color: '#ffffff',
						timer: 2000
					});
				}
			})
			.catch(handlerError);
	}
});
$("#btn_submit_change_phone").click(function(){
	let data = {
		phone: $("#input-phone").val(),
		verifyCode: $("#verifyCode").val()
	};
	fetch(BASE_URL+API_CUSTOMER+CUSTOMER_CHANGEPHONE,{
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
		.then(data => {
			if(data.status == 1){
				Toast.fire({
					icon: 'success',
					title: "Đã cập nhật gmail thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1200,
					didClose: ()=>{
						window.location.reload();
					}
				});
			}else Toast.fire({
				icon: 'error',
				title: data.msg,
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			})
		})
		.catch(handlerError);
});
$('#input_avatar').change(function (event) {
    $('#profile-avatar').attr("src",URL.createObjectURL(event.target.files[0]));
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image();      
        img.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}); 

$("#btn_submit_change_info").click(function(){
	let formData = new FormData();
	formData.append('fullName', $("#profile-fullName").val());
	formData.append('gender', $("input[name='gender']:checked").val());
	formData.append('dateOfBirth', $("#profile-birth").val());
	formData.append('avatar', $("#input_avatar")[0].files[0]);
	$(".loading").toggleClass("loading_hide");
	fetch(BASE_URL+API_CUSTOMER+CUSTOMER_CHANGEINFO,{
		method: 'POST', 
		credentials: 'include',
		body: formData, 
		headers:{
			// 'Content-Type': 'application/x-www-form-urlencoded',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	})
		.then(statusRes)
		.then(json)
		.then(data => {
			if(data.status == 1){
				$(".loading").toggleClass("loading_hide");
				Toast.fire({
					icon: 'success',
					title: "Đã cập nhật thông tin thành công",
					background: 'rgba(35, 147, 67, 0.9)',
					color: '#ffffff',
					timer: 1200,
					didClose: ()=>{
						window.location.reload();
					}
				});
			}else {
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
});
$("#btn-open-modal-addres").click(function(){
	$("#select_province").val(currentAddres.province.id);
	$('.selectpicker').selectpicker('refresh');
	$('.selectpicker').selectpicker('refresh');

	fetch(API_GETDISTRICT+`?province_id=${currentAddres.province.id}`, {
		method: 'GET',
		headers:{
			'Content-Type': 'application/json',
			'Token': TOKEN
		}
	})
		.then(statusRes)
		.then(json)
		.then((res)=>{
			if(res.code==200){
				$("#select_district").html(`
					<option value="-1">Chọn quận huyện</option>
				`);
				$('.selectpicker').selectpicker('refresh');
				$('.selectpicker').selectpicker('refresh');
				for(let item of res.data){
					$("#select_district").removeAttr("disabled");
					$("#select_district").append(`
						<option value="${item.DistrictID}" id="${item.DistrictID}">
						${item.DistrictName}
						</option>
					`);
				}
				$("#select_district").val(currentAddres.district.id);
				$('.selectpicker').selectpicker('refresh');
				$('.selectpicker').selectpicker('refresh');
			}else console.log(res.message);
		})
		.catch(handlerError);
	fetch(API_GETWARD+`?district_id=${currentAddres.district.id}`, {
		method: 'GET',
		headers:{
			'Content-Type': 'application/json',
			'Token': TOKEN
		}
	})
		.then(statusRes)
		.then(json)
		.then((res)=>{
			if(res.code==200){
				$("#select_ward").html(`
					<option value="-1">Chọn phường xã</option>
				`);
				$('.selectpicker').selectpicker('refresh');
				$('.selectpicker').selectpicker('refresh');
				for(let item of res.data){
					$("#select_ward").removeAttr("disabled");
					$("#select_ward").append(`
						<option value="${item.WardCode}" id="${item.WardCode}">
							${item.WardName}
						</option>
					`);
				}
				$("#select_ward").val(currentAddres.ward.id);
				$('.selectpicker').selectpicker('refresh');
				$('.selectpicker').selectpicker('refresh');
			}else console.log(res.message);
		})
		.catch(handlerError);
	setTimeout(() => {
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}, 700);
})
fetch(API_GETPROVINCE, {
	method: 'GET',
	headers:{
		'Content-Type': 'application/json',
		'Token': TOKEN
	}
})
	.then(statusRes)
	.then(json)
	.then((res)=>{
		if(res.code==200){
			for(let item of res.data){
				$("#select_province").append(`
					<option value="${item.ProvinceID}" id="${item.ProvinceID}">
						${item.ProvinceName}
					</option>
				`);
			}
			$('.selectpicker').selectpicker('refresh');
		}else console.log(res.message);
	})
	.catch(handlerError);

$('#select_province').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		fetch(API_GETDISTRICT+`?province_id=${selectedValue}`, {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json',
				'Token': TOKEN
			}
		})
			.then(statusRes)
			.then(json)
			.then((res)=>{
				if(res.code==200){
					$("#select_district").html(`
						<option value="-1">Chọn quận huyện</option>
					`);
					$("#select_ward").html(`
						<option value="-1">Chọn phường xã</option>
					`);
					$('.selectpicker').selectpicker('refresh');
					for(let item of res.data){
						$("#select_district").removeAttr("disabled");
						$("#select_district").append(`
							<option value="${item.DistrictID}" id="${item.DistrictID}">
							${item.DistrictName}
							</option>
						`);
					}
					$('.selectpicker').selectpicker('refresh');
				}else console.log(res.message);
			})
			.catch(handlerError);
	}else{
		$("#select_district").html(`
			<option value="-1">Chọn quận huyện</option>
		`);
		$("#select_ward").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$('#select_district').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		fetch(API_GETWARD+`?district_id=${selectedValue}`, {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json',
				'Token': TOKEN
			}
		})
			.then(statusRes)
			.then(json)
			.then((res)=>{
				if(res.code==200){
					$("#select_ward").html(`
						<option value="-1">Chọn phường xã</option>
					`);
					$('.selectpicker').selectpicker('refresh');
					for(let item of res.data){
						$("#select_ward").removeAttr("disabled");
						$("#select_ward").append(`
							<option value="${item.WardCode}" id="${item.WardCode}">
								${item.WardName}
							</option>
						`);
					}
					$('.selectpicker').selectpicker('refresh');
				}else console.log(res.message);
			})
			.catch(handlerError);
	}else{
		$("#select_ward").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$("#btn_select_address").click(function(){
	const address = $("#input-address").val();
	if(!address){
		Toast.fire({
			icon: 'error',
			title: "Bạn chưa nhập địa chỉ",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2000
		});
		return;
	}
	const provinceID = $("#select_province").val();
	const districtID = $("#select_district").val();
	const wardID = $("#select_ward").val();
	if(provinceID!=-1 && districtID!=-1 && wardID!=-1){
		const provinceName = $("#select_province").children(`#${provinceID}`).html().trim();
		const districtName = $("#select_district").children(`#${districtID}`).html().trim();
		const wardName = $("#select_ward").children(`#${wardID}`).html().trim();
		let data = {
			address,
			customer: customerID,
			province: {
				id: provinceID,
				name: provinceName
			},
			district: {
				id: districtID,
				name: districtName
			},
			ward: {
				id: wardID,
				name: wardName
			}
		}
		fetch(BASE_URL+API_ADDRESS+ADDRESS_UPDATEBYCUSTOMER,{
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
			.then((res)=>{
				if(res.status==1){
					Toast.fire({
						icon: 'success',
						title: "Đã cập nhật địa chỉ thành công",
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
						timer: 2000
					});
				}
			})
			.catch(handlerError);
	}else{
		Toast.fire({
			icon: 'error',
			title: "Chưa chọn đầy đủ thông tin",
			background: 'rgba(220, 52, 73, 0.9)',
			color: '#ffffff',
			timer: 2000
		});
	}
})