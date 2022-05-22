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
			if(data.rule==2)
				isLogin(data); 
			else if(data.rule==1){
				window.location.href=BASE_URL_CLIENT;
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
			}else{
				window.location.href=BASE_URL_CLIENT;
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
				$("#fullname-user").html(data.fullName);
				if(data.avatar){
					$(".img-profile").attr('src',data.avatar);
				}else{
					$(".img-profile").attr('src','https://res.cloudinary.com/jwb/image/upload/v1652092431/images_default/user_default_dpsjgs.png');
				}
			}else{
				window.location.href=BASE_URL_CLIENT;
			}
		});
	})