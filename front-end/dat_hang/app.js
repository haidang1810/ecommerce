$(".payment__item").click(function(){
	$(".payment__item").each(function(){
		$(this).removeClass("payment__item--active");
	})
	$(this).addClass("payment__item--active");
});

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

let products = JSON.parse(params.url);
if(!products){
	window.location.href = BASE_URL_CLIENT;
}else{
	for(let product of products){
		if(!product.MaSP || !product.SoLuong){
			window.location.href = BASE_URL_CLIENT;
		}
	}
}
function getAddress(customerID, handle){
	fetch(BASE_URL+API_ADDRESS+ADDRESS_GETBYCUSTOMER+customerID,{
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
				// const data = res.data;
				// currentAddres = data;
				// $("#profile-address").html(`
				// 	<span>
				// 		${data.address}<br>
				// 		${data.ward.name}, ${data.district.name}, ${data.province.name}
				// 	</span>
				// `);
				// $("#input-address").val(data.address);
				handle(res.data);
				
			}else console.log(res.msg);
		})
		.catch(handlerError);
}
fetch(BASE_URL+API_CUSTOMER+CUSTOMER_GETMYACCOUNT,{
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
			console.log(res.data);
			$(".header-payment__customer").html(`${res.data.HoTen} ${res.data.SDT}`);
			getAddress(res.data.MaKH, (address)=>{
				$(".header-payment__address").html(`
				${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}
				`)
			})
		}else{
			window.location.href = BASE_URL_CLIENT;
		}
	})
	.catch(handlerError);


$("#btn-open-modal-address").click(function(){
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