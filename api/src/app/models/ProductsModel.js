const pool = require('../config/connectDB');

const Product = function (product) {
    this.MaSP = product.MaSP;
    this.LoaiSP = product.LoaiSP;
    this.TenSP = product.TenSP;
    this.MoTa = product.MoTa;
    this.Gia = product.Gia;
    this.SoLuong = product.SoLuong;
    this.AnhBia = product.AnhBia;
}

Product.getAll = (req, res) => {
    const getAllProduct = `select tb_san_pham.MaSP, tb_loai_san_pham.TenLoai, TenSP, tb_san_pham.Gia, tb_san_pham.SoLuong, 
	AnhBia, AVG(SoSao) as DanhGia, tb_dot_khuyen_mai.ChietKhau, 
	tb_san_pham.NgayDang, tb_chi_tiet_don.SoLuong as DaBan
		from tb_san_pham
		LEFT JOIN tb_danh_gia
		ON tb_san_pham.MaSP = tb_danh_gia.MaSP
		INNER JOIN tb_loai_san_pham 
		ON tb_san_pham.LoaiSP=tb_loai_san_pham.MaLoai
		LEFT JOIN tb_san_pham_khuyen_mai 
		ON tb_san_pham.MaSP=tb_san_pham_khuyen_mai.MaSP
		LEFT JOIN tb_chi_tiet_don 
		ON tb_san_pham.MaSP=tb_chi_tiet_don.MaSP
		LEFT JOIN tb_dot_khuyen_mai 
		ON tb_san_pham_khuyen_mai.MaDotKM=(SELECT Id 
									FROM tb_dot_khuyen_mai
									WHERE tb_dot_khuyen_mai.ThoiGianBD<=NOW()
									AND tb_dot_khuyen_mai.ThoiGianKT>=NOW())
		GROUP BY tb_san_pham.MaSP;`;
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
Product.getByKeyword = (req, res) => {
	const keyword = '%'+req.query.keyword+'%';
	const getAllProduct = `select tb_san_pham.MaSP, tb_loai_san_pham.TenLoai, TenSP, tb_san_pham.Gia, tb_san_pham.SoLuong, 
	AnhBia, AVG(SoSao) as DanhGia, tb_dot_khuyen_mai.ChietKhau, 
	tb_san_pham.NgayDang, tb_chi_tiet_don.SoLuong as DaBan
		from tb_san_pham
		LEFT JOIN tb_danh_gia
		ON tb_san_pham.MaSP = tb_danh_gia.MaSP
		INNER JOIN tb_loai_san_pham 
		ON tb_san_pham.LoaiSP=tb_loai_san_pham.MaLoai
		LEFT JOIN tb_san_pham_khuyen_mai 
		ON tb_san_pham.MaSP=tb_san_pham_khuyen_mai.MaSP
		LEFT JOIN tb_chi_tiet_don 
		ON tb_san_pham.MaSP=tb_chi_tiet_don.MaSP
		LEFT JOIN tb_dot_khuyen_mai 
		ON tb_san_pham_khuyen_mai.MaDotKM=(SELECT Id 
									FROM tb_dot_khuyen_mai
									WHERE tb_dot_khuyen_mai.ThoiGianBD<=NOW()
									AND tb_dot_khuyen_mai.ThoiGianKT>=NOW())
		WHERE TenSP LIKE ?
		GROUP BY tb_san_pham.MaSP;`;
		pool.query(getAllProduct, keyword,(err, result)=>{
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
Product.getDetail = (req, res) => {
	const productID = req.params.id;
	const getDetailProduct = `select tb_san_pham.MaSP, tb_loai_san_pham.TenLoai, TenSP, 
	tb_san_pham.Gia, tb_san_pham.SoLuong, tb_san_pham.MoTa,
	AnhBia, AVG(SoSao) as DanhGia, tb_dot_khuyen_mai.ChietKhau, 
	tb_san_pham.NgayDang, tb_chi_tiet_don.SoLuong as DaBan, COUNT(tb_danh_gia.TaiKhoan) as LuotDanhGia
		from tb_san_pham
		LEFT JOIN tb_danh_gia
		ON tb_san_pham.MaSP = tb_danh_gia.MaSP
		INNER JOIN tb_loai_san_pham 
		ON tb_san_pham.LoaiSP=tb_loai_san_pham.MaLoai
		LEFT JOIN tb_san_pham_khuyen_mai 
		ON tb_san_pham.MaSP=tb_san_pham_khuyen_mai.MaSP
		LEFT JOIN tb_chi_tiet_don 
		ON tb_san_pham.MaSP=tb_chi_tiet_don.MaSP
		LEFT JOIN tb_dot_khuyen_mai 
		ON tb_san_pham_khuyen_mai.MaDotKM=(SELECT Id 
									FROM tb_dot_khuyen_mai
									WHERE tb_dot_khuyen_mai.ThoiGianBD<=NOW()
									AND tb_dot_khuyen_mai.ThoiGianKT>=NOW())
		WHERE tb_san_pham.MaSP=?
		GROUP BY tb_san_pham.MaSP;`
	pool.query(getDetailProduct, productID,(err, result)=>{
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
			data: result[0]
		});
		return;
	});
}
module.exports = Product;