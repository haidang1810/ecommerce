const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const schedule = require('node-schedule');

var verifyCodeList = [];
const VerifyCode = function(verifyCode){
	this.to = verifyCode.to;
}
const createCode = (length) => {
    let code = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++)
    	code += possible.charAt(Math.floor(Math.random() * possible.length));
	if(verifyCodeList.includes(code))
		createCode(length);
	else return code;
}
function sendVerifyCode(to,code,resolve,reject){
	client.messages
	.create({
		body: `Mã xác nhận của bạn là ${code}. Mã xác nhận có thời gian sử dụng là 3 phút`,
		from: '+19803754486',
		to: to
	})
	.then(message => resolve())
	.catch(()=>reject())
}
VerifyCode.getCode = (phone,handle)=>{
	const code = createCode(6);
	verifyCodeList.push(code);
	let to = "+84"+phone.substr(1,phone.length-1);
	const sendCode = new Promise((resolve,reject)=>{
		sendVerifyCode(to,code,resolve,reject);
	})
	sendCode
		.then(()=>{
			const expires = new Date(Date.now()+3*60*1000);
			schedule.scheduleJob(expires,()=>{
				verifyCodeList.splice(verifyCodeList.indexOf(code), 1);
			})
			handle(true);
		})
		.catch(()=>{
			handle(false);
		})
}
VerifyCode.checkCode = (code)=>{
	if(verifyCodeList.includes(code)){
		return true;
	}else return false
}
VerifyCode.deleteCode = (code)=>{
	verifyCodeList.splice(verifyCodeList.indexOf(code), 1);
}
module.exports = VerifyCode;
