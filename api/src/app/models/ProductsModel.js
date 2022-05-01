const pool = require('../config/connectDB');

const Product = function (product) {
    this.MaSP = product.MaSP;
    this.LoaiSP = product.LoaiSP;
    this.TenSP = product.TenSP;
    this.Gia = product.Gia;
    this.SoLuong = product.SoLuong;
    this.AnhBia = product.AnhBia;
}

Product.getAll = (req, res) => {
    const getAllProduct = `select MaSP, tb_loai_san_pham.TenLoai, TenSP, Gia, SoLuong, AnhBia
        from tb_san_pham, tb_loai_san_pham`;
    pool.query(getAllProduct, (err, result)=>{
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