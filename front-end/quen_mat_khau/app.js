$("#logo-link").click(function(){
	window.location.href = BASE_URL_CLIENT;
});
$('#input-phone').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
$(".btn-show-pass").click(function(){
	if($(this).prev(".form-reset__input").attr("type") == "password"){
        $(this).html(`<i class="fa-solid fa-eye-slash"></i>`);
        $(this).prev(".form-reset__input").attr("type","text");
    }else {
        $(this).html(`<i class="fa-solid fa-eye"></i>`);
        $(this).prev(".form-reset__input").attr("type","password");
    }
});
$("#btn-send-verifyCode").click(function(){
	const phone = $("#input-phone").val();
	fetch(BASE_URL+API_USER+USER_VERIFYCODE+phone,{
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
})
validator('.form-reset',{
	formGroup: '.form-group',
    formMessage: '.message-err',
	onSubmit: function(formValues){
		if(formValues.password != formValues.confirmPass){
			Toast.fire({
				icon: 'error',
				title: 'Nhập lại mật khẩu không chính xác',
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			});
			return;
		}
		console.log(formValues);
		fetch(BASE_URL+API_USER+USER_FORGOT, {
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
						title: "Mật khẩu của bạn đã được cập nhật",
						background: 'rgba(35, 147, 67, 0.9)',
						color: '#ffffff',
						timer: 1200,
						didClose: ()=>{
							window.location.href = BASE_URL_CLIENT;
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
})