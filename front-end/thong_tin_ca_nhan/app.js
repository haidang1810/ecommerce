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
	}else{
		window.location.href = BASE_URL_CLIENT;
	}
});