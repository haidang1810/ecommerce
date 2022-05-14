const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
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
module.exports = sendVerifyCode;
