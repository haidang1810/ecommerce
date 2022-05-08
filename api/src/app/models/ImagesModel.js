const pool = require('../config/connectDB');

const Image = function (image) {
    this.id = image.id;
    this.MaSP = image.MaSP;
    this.DuongDan = image.DuongDan;
    this.KichThuoc = image.KichThuoc;
}

Image.getByProduct = (req, res) => {
	const productID = req.params.id;
	const getImageByProduct = `select *
		from tb_hinh_anh
		where MaSP=?`;
	pool.query(getImageByProduct, productID, (err, result)=>{
        if(err){
			res({
				status: 0,
				msg: err
			});
			return;
		}
		res({
			status: 1,
			msg: 'success!',
			data: result
		});
		return;
    });
}
module.exports = Image;