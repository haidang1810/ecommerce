function statusRes(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response)
	} else {
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
function renderStarRating(totalStart){
	let html = ``;
	for(let i=1; i<=5; i++){
		if(totalStart>=1){
			html += `<i class="fa fa-star checked"></i>`;
		}else{
			if(totalStart > 0.2 && totalStart < 0.8){
				html += `<i class="fa-solid fa-star-half"></i>`;
			}else if(totalStart >= 0.8){
				html += `<i class="fa fa-star checked"></i>`;
			}else {
				html += `<i class="fa fa-star"></i>`;				
			}
		}
		totalStart--;
	}
	return html;
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
				$("#header__item--register").addClass("hide");
				$("#header__item--login").addClass("hide");
				$("#header__item--user").removeClass("hide");
				$("#header-full-name").html(data.fullName);
				$('#modal-auth').modal('hide'); 
				if(data.avatar){
					$(".navbar__user--avatar").attr('src',data.avatar);
				}
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
					$("#header__item--register").addClass("hide");
					$("#header__item--login").addClass("hide");
					$("#header__item--user").removeClass("hide");
					$("#header-full-name").html(data.fullName);
					$('#modal-auth').modal('hide'); 
					if(data.avatar){
						$(".navbar__user--avatar").attr('src',data.avatar);
					}
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

function checkLogin(){
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
				$("#header__item--register").addClass("hide");
				$("#header__item--login").addClass("hide");
				$("#header__item--user").removeClass("hide");
				$("#header-full-name").html(data.fullName);
				$('#modal-auth').modal('hide'); 
				if(data.avatar){
					$(".navbar__user--avatar").attr('src',data.avatar);
				}
			}else{
				console.log(data.msg);
			}
		})
		.catch(handlerError);
}
function getAccessToken(resolve, reject){
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
					getAccessToken(resolve, reject);
				}, 50000);
				resolve();
			}else reject();
		})
		.catch(handlerError);
}

var promiseAccessToken = new Promise((resolve, reject)=>{
	getAccessToken(resolve, reject);
})
promiseAccessToken.then(()=>{
	checkLogin();
});