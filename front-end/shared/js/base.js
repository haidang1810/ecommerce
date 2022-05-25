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

function getProvince(handle){
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
				handle(res.data);
			}else console.log(res.message);
		})
		.catch(handlerError);
}
function getDistrict(provinceID, handle){
	fetch(API_GETDISTRICT+`?province_id=${provinceID}`, {
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
				handle(res.data);
			}else console.log(res.message);
		})
		.catch(handlerError);
}
function getWard(districtIĐ,handle){
	fetch(API_GETWARD+`?district_id=${districtIĐ}`, {
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
				handle(res.data);
			}else console.log(res.message);
		})
		.catch(handlerError);
}