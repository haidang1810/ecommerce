$("#btn-search").click(function(){
	const keyword = $(".header__input").val();
	$(".header__input").val("");
	window.location.href = BASE_URL_CLIENT+`tim_kiem/?keyword=${keyword}`;
});
$("#btn-show-pass-login").click(function(){
    if($("#input-password-login").attr("type") == "password"){
        $("#btn-show-pass-login").html(`<i class="fa-solid fa-eye-slash"></i>`);
        $("#input-password-login").attr("type","text");
    }else {
        $("#btn-show-pass-login").html(`<i class="fa-solid fa-eye"></i>`);
        $("#input-password-login").attr("type","password");
    }
})
$("#btn-show-pass-register").click(function(){
    if($("#input-password-register").attr("type") == "password"){
        $("#btn-show-pass-register").html(`<i class="fa-solid fa-eye-slash"></i>`);
        $("#input-password-register").attr("type","text");
    }else {
        $("#btn-show-pass-register").html(`<i class="fa-solid fa-eye"></i>`);
        $("#input-password-register").attr("type","password");
    }
})

$("#btn-login").click(function(){
	const username = $("#input-username-login").val();
	const password = $("#input-password-login").val();
	const data = {
		username,
		password
	}
	fetch(BASE_URL+API_AUTH+AUTH_LOGIN,
		{
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
				window.location.reload();
			}else Toast.fire({
				icon: 'error',
				title: data.msg,
				background: 'rgba(220, 52, 73, 0.9)',
				color: '#ffffff',
				timer: 2500
			})
		})
		.catch(handlerError);
})

validator('.auth-form__register',{
	formGroup: '.auth-form__group',
    formMessage: '.message-err',
	onSubmit: function(formValues){
		fetch(BASE_URL+API_USER+USER_ADD, {
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
					window.location.reload();
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
$("#btn-send-verify-code").click(function(){
	const phone = $("#input-register-phone").val();
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
function checkLogin(isLogin){
	fetch(BASE_URL+API_AUTH+AUTH_CHECKLOGIN,{
		method: 'GET', 
		credentials: 'include',
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	})
		.then(statusRes)
		.then(json)
		.then(data => {
			if(data.status == 1){
				return data;
			}else{
				return false
			}
		})
		.then((data)=> {
			if(data.rule==1)
				isLogin(data); 
			else if(data.rule==2){
				window.location.href=BASE_URL_CLIENT+'admin/trang_chu/';
			}
		})
		.catch(handlerError);
}
function getAccessToken(resolve){
	fetch(BASE_URL+API_AUTH+AUTH_REFRESHTOKEN,{
		method: 'GET', 
		credentials: 'include',
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	})
		.then(statusRes)
		.then(json)
		.then(data => {
			if(data.status == 1){
				setTimeout(() => {
					getAccessToken(resolve);
				}, 50000);
				resolve();
			}
		})
		.catch(handlerError);
}

var promiseAccessToken = new Promise((resolve)=>{
	getAccessToken(resolve);
});
promiseAccessToken
	.then(()=>{
		checkLogin((data)=>{
			if(data){
				$("#header__item--register").addClass("hide");
				$("#header__item--login").addClass("hide");
				$("#header__item--user").removeClass("hide");
				$("#header-full-name").html(data.fullName);
				$('#modal-auth').modal('hide'); 
				if(data.avatar){
					$(".navbar__user--avatar").attr('src',data.avatar);
				}else{
					$(".navbar__user--avatar").attr('src','https://res.cloudinary.com/jwb/image/upload/v1652092431/images_default/user_default_dpsjgs.png');
				}
			}
		});
	})
function getCart(){
	fetch(BASE_URL+API_CART+CART_GETBYUSER,{
		method: 'GET', 
		credentials: 'include',
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	})
		.then(statusRes)
		.then(json)
		.then(data => {
			if(data.status == 1){
				if(data.data.length>0){
					$(".header__cart-list").removeClass("header__cart-list--null");
					$(".cart__badge").removeClass("hide");
					if(data.data.length>99)
						$(".cart__badge").html("99+");
					else $(".cart__badge").html(data.data.length);
					$(".header__cart-list-item").html("");
					for(let item of data.data){
						let html = ``;
						html += `
							<li class="header__cart-item d-flex align-items-center">
								<a href="${BASE_URL_CLIENT}gio_hang/" 
								class="header__cart-item-warper row align-items-center">
									<img src="${item.AnhBia}" alt="loading" 
									class="header__cart-item--img col-xl-2">
									<div class="col-7">
										<p class="header__cart-item--name">
											${item.TenSP} 
										</p>
									</div>`;
						if(item.ChietKhau){
							let price = item.Gia;
							let discount = item.ChietKhau;
							let newPrice = price - (price * discount / 100);
							html += `
								<p class="header__cart-item--price col-3">
									${numberWithCommas(newPrice)}đ
								</p>
							`;
						}else{
							html += `
								<p class="header__cart-item--price col-3">
									${numberWithCommas(item.Gia)}đ
								</p>
							`;
						}
						html += `
								</a>
							</li>
						`;

						$(".header__cart-list-item").append(html);
					}
				}else{
					$(".cart__badge").addClass("hide");
					$(".cart__badge").html("");
					$(".header__cart-list").addClass("header__cart-list--null");
				}
			}
		})
		.catch(handlerError);
}
function getNotification(userName){
	fetch(BASE_URL+API_NOTIFICATION+NOTI_GETBYUSER,{
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
			for(let item of res.data){
				$(".header__notify-list").append(`
					<li class="header__notify--item">
						<a href="#" class="header__notify--item-link">
							<img src="${item.image}" alt="loading..." 
							class="header__notify--img">
							<div class="header__notify-info">
								<div class="header__notify--name">
									<p>
										${item.name}
									</p>
								</div>
								<div class="header__notify--desc">
									<p>
										${item.description}
									</p>
								</div>
							</div>
						</a>
					</li>
				`);
			}
		}
	})
	.catch(handlerError);
}
checkLogin((res)=>{
	if(res){
		getCart();
		getNotification();
	}
})

$("#btn_logout").click(function(){
	fetch(BASE_URL+API_AUTH+AUTH_LOGOUT,{
		method: 'GET', 
		credentials: 'include',
		headers:{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	})
		.then(()=>{
			window.location.reload();
		})	
})
$(".cart__button").click(function(){
	window.location.href = BASE_URL_CLIENT+'gio_hang/';
});
$(".header__cart-footer").click(function(){
	window.location.href = BASE_URL_CLIENT+'gio_hang/';
});
