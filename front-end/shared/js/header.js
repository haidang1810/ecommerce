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
function getCart(userName){
	fetch(BASE_URL+API_CART+CART_GETBYUSER+userName,{
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
					for(let item of data.data){
						let html = ``;
						html += `
							<li class="header__cart-item d-flex align-items-center">
								<a href="${BASE_URL_CLIENT}gio_hang/" 
								class="header__cart-item-warper row align-items-center">
									<img src="${item.AnhBia}" alt="loading" 
									class="header__cart-item--img col-xl-2">
									<p class="header__cart-item--name col-7">
										${item.TenSP} 
									</p>`;
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
	fetch(BASE_URL+API_NOTIFICATION+NOTI_GETBYUSER+userName,{
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
		const userName = res.user;
		getCart(userName);
		getNotification(userName);
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

