const pool = require('../config/connectDB');


const checkRuleAdmin = (req, res, next) => {
    let user = req.username;
	pool("Select LoaiND from tb_nguoi_dung where TaiKhoan=?",user,
	(err, result)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result.LoaiND!=2){
			res({
				status: 0,
				msg: "Bạn không có quyền này"
			});
			return;
		}else next();
	})
}
module.exports = checkRuleAdmin;