
fetch(BASE_URL+API_CUSTOMER+CUSTOMER_GETALL,{
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
			let customers = res.data.map(item => {
				let GioiTinh = '';
				if(item.GioiTinh==1) GioiTinh='Nam';
				else GioiTinh='Nữ';
				return {
					HoTen: item.HoTen,
					GioiTinh,
					NgaySinh: item.NgaySinh,
					NhomKH: item.NhomKH.join(", "),
					SDT: item.SDT,
					Gmail: item.Gmail,
					DiaChi: item.DiaChi,
				};
			});
			$('#table-customer').DataTable({
				"lengthMenu": [10, 15, 20, 25, 30, 40, 50 ],
				data: customers,
				"processing": true,
				columns: [
					{data: 'HoTen'},
					{data: 'GioiTinh'},
					{data: 'NgaySinh'},
					{data: 'NhomKH'},
					{data: 'SDT'},
					{data: 'Gmail'},
					{data: 'DiaChi'}
				]
			});
		}else console.log(res.msg);
	})
	.catch(handlerError);

getProvince((data)=>{
	for(let item of data){
		$("#select-province-customer").append(`
			<option value="${item.ProvinceID}" id="${item.ProvinceID}">
				${item.ProvinceName}
			</option>
		`);
	}
	$('.selectpicker').selectpicker('refresh');
});
$('#select-province-customer').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		getDistrict(selectedValue,(data)=>{
			$("#select-district-customer").html(`
				<option value="-1">Chọn quận huyện</option>
			`);
			$("#select-ward-customer").html(`
				<option value="-1">Chọn phường xã</option>
			`);
			$('.selectpicker').selectpicker('refresh');
			for(let item of data){
				$("#select-district-customer").removeAttr("disabled");
				$("#select-district-customer").append(`
					<option value="${item.DistrictID}" id="${item.DistrictID}">
					${item.DistrictName}
					</option>
				`);
			}
			$('.selectpicker').selectpicker('refresh');
		});
	}else{
		$("#select-district-customer").html(`
			<option value="-1">Chọn quận huyện</option>
		`);
		$("#select-ward-customer").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$('#select-district-customer').on('changed.bs.select', function (e) {
	var selectedValue = $(e.currentTarget).val();
	if(selectedValue!=-1){
		getWard(selectedValue,(data)=>{
			$("#select-ward-customer").html(`
					<option value="-1">Chọn phường xã</option>
				`);
				$('.selectpicker').selectpicker('refresh');
				for(let item of data){
					$("#select-ward-customer").removeAttr("disabled");
					$("#select-ward-customer").append(`
						<option value="${item.WardCode}" id="${item.WardCode}">
							${item.WardName}
						</option>
					`);
				}
				$('.selectpicker').selectpicker('refresh');
		})
	}else{
		$("#select-ward-customer").html(`
			<option value="-1">Chọn phường xã</option>
		`);
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('refresh');
	}
});
$("#btn-add-customer").click(function(){
	$('#form-add-customer').submit();
});
validator('#form-add-customer',{
	formGroup: '.form-group',
	formMessage: '.message-err',
	onSubmit: function(formValues){
		const provinceID = $("#select-province-customer").val();
		const districtID = $("#select-district-customer").val();
		const wardID = $("#select-ward-customer").val();
		if(provinceID!=-1 && districtID!=-1 && wardID!=-1){
			const provinceName = $("#select-province-customer").children(`#${provinceID}`).html().trim();
			const districtName = $("#select-district-customer").children(`#${districtID}`).html().trim();
			const wardName = $("#select-ward-customer").children(`#${wardID}`).html().trim();
			let data = formValues;
			let address = data.DiaChi;
			data.DiaChi = {
				address,
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
			addCustomer(data);
		}else{
			Toast.fire({
				icon: 'error',
				title: "Chưa chọn địa chỉ",
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 1500
			});
		}
	}
});
function addCustomer(data){
	fetch(BASE_URL+API_CUSTOMER+CUSTOMER_ADD,{
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
					title: "Đã thêm khách hàng thành công.",
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
}