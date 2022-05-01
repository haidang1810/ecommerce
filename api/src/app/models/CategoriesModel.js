const pool = require('../config/connectDB');

const Product = function (product) {
    this.MaLoai = product.MaLoai;
    this.TenLoai = product.TenLoai;
}

Product.getAll = (req, res) => {
    const getAllCateCategories = `select * from tb_loai_san_pham`;
    pool.query(getAllCateCategories, (err, result)=>{
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

module.exports = Product;