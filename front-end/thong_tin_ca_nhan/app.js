checkLogin((data)=>{
	if(data){
		fetch(BASE_URL+API_CUSTOMER+CUSTOMER_GETBYACCOUNT+data.user,{
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
					console.log(res.data);
				}else console.log(res.msg);
			})
			.catch(handlerError);
	}else{
		window.location.href = BASE_URL_CLIENT;
	}
});