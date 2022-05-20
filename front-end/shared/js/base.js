function statusRes(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response)
	} else {
		console.log(response);
		return Promise.reject(new Error(response.status))
	}
}
function json(response) {
	return response.json()
}
function handlerError(err) {
	console.log(err);
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
$("#logo-link").click(function(){
	window.location.href = BASE_URL_CLIENT;
})
function renderStarRating(totalStar){
	let html = ``;
	for(let i=1; i<=5; i++){
		if(totalStar>=1){
			html += `<i class="fa fa-star checked"></i>`;
		}else{
			if(totalStar > 0.2 && totalStar < 0.8){
				html += `<i class="fa-solid fa-star-half"></i>`;
			}else if(totalStar >= 0.8){
				html += `<i class="fa fa-star checked"></i>`;
			}else {
				html += `<i class="fa fa-star"></i>`;				
			}
		}
		totalStar--;
	}
	return html;
}
function roundingRating(totalStar){
	let rounding = 0;
	for(let i=1; i<=5; i++){
		if(totalStar>=1){
			rounding++;
		}else{
			if(totalStar > 0.2 && totalStar < 0.8){
				rounding += 0.5;
			}else if(totalStar >= 0.8){
				rounding++;
			}
		}
		totalStar--;
	}
	return rounding;
}
function setCookie(cname, cvalue, second=null) {
    if(second!=null){
        const d = new Date();
        d.setTime(d.getTime() + (second*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }else{
        document.cookie = cname + "=" + cvalue;
    }   

}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
});

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
			console.log(data);
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

function getTransportCost(to_district_id, to_ward_code, weight, handleTransportCost){
	let query = `?from_district_id=${1484}&service_type_id=${2}`;
	query += `&to_district_id=${to_district_id}&to_ward_code=${to_ward_code}`;
	query += `&height=${HEIGHT_BOX}&length=${LENGHT_BOX}&weight=${WEIGHT_BOX+weight}`;
	query += `&width=${WIDTH_BOX}&insurance_value=0&coupon=`
	fetch(API_GETCOSTTRANSPORT+query, {
		method: 'GET',
		headers:{
			'Content-Type': 'application/json',
			'Token': TOKEN,
			'ShopId': SHOPID,
			'Content-Type': 'text/plain'
		}
	})
		.then(statusRes)
		.then(json)
		.then((res)=>{
			handleTransportCost(res);
		})
		.catch(handlerError);
}