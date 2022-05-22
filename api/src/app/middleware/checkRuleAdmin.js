const pool = require('../config/connectDB');


const checkRuleAdmin = (req, res, next) => {
    let user = req.username;
	pool.query("Select LoaiND from tb_nguoi_dung where TaiKhoan=?",user,
	(err, result)=>{
		if(err){
			res.json({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result[0].LoaiND!=2){
			res.json({
				status: 0,
				msg: "Bạn không có quyền này"
			});
			return;
		}else next();
	})
}
module.exports = checkRuleAdmin;