const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Product = function (product) {
    this.MaSP = product.MaSP;
    this.LoaiSP = product.LoaiSP;
    this.TenSP = product.TenSP;
    this.MoTa = product.MoTa;
    this.KhoiLuong = product.KhoiLuong;
    this.Gia = product.Gia;
    this.SoLuong = product.SoLuong;
    this.AnhBia = product.AnhBia;
}

Product.getAll = (req, res) => {
    const getAllProduct = `select tb_san_pham.MaSP, tb_loai_san_pham.TenLoai, TenSP, tb_san_pham.Gia, tb_san_pham.SoLuong, 
	AnhBia, AVG(SoSao) as DanhGia, tb_dot_khuyen_mai.ChietKhau, 
	tb_san_pham.NgayDang, tb_chi_tiet_don.SoLuong as DaBan, KhoiLuong
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
		ON tb_san_pham_khuyen_mai.MaDotKM=tb_dot_khuyen_mai.Id
		WHERE tb_san_pham.TrangThai=1 and
		tb_dot_khuyen_mai.Id=(SELECT Id 
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
	tb_san_pham.NgayDang, tb_chi_tiet_don.SoLuong as DaBan, KhoiLuong
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
		WHERE TenSP LIKE ? and
		tb_san_pham.TrangThai=1
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
	tb_san_pham.Gia, tb_san_pham.SoLuong, tb_san_pham.MoTa, tb_san_pham.KhoiLuong,
	AnhBia, AVG(SoSao) as DanhGia, tb_dot_khuyen_mai.ChietKhau, LoaiSP,
	tb_san_pham.NgayDang, tb_chi_tiet_don.SoLuong as DaBan, COUNT(tb_danh_gia.TaiKhoan) as LuotDanhGia,
	tb_san_pham.TrangThai
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
		ON tb_san_pham_khuyen_mai.MaDotKM=tb_dot_khuyen_mai.Id
		WHERE tb_san_pham.MaSP=? AND
        tb_dot_khuyen_mai.Id=(SELECT Id 
									FROM tb_dot_khuyen_mai
									WHERE tb_dot_khuyen_mai.ThoiGianBD<=NOW()
									AND tb_dot_khuyen_mai.ThoiGianKT>=NOW())
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
var type = ['image/jpeg','image/png','image/jpg'];
Product.add = (req, res) => {
	if(!req.files){
		res({
			status: 0,
			msg: 'Chưa chọn ảnh bìa'
		});
		return;
	}
	let MaSP = req.body.MaSP;
	let LoaiSP = req.body.LoaiSP;
	let TenSP = req.body.TenSP;
	let MoTa = req.body.MoTa;
	let KhoiLuong = req.body.KhoiLuong;
	let Gia = req.body.Gia;
	let SoLuong = req.body.SoLuong;
	let AnhBia = req.files.AnhBia;
	let PhanLoai = JSON.parse(req.body.PhanLoai);
	const checkProduct = 'select MaSP from tb_san_pham where MaSP=?';
	pool.query(checkProduct, MaSP, (err,result) => {
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result.length>0){
			res({
				status: 0,
				msg: 'Mã sản phâm đã tồn tại'
			});
			return;
		}
		cloudinary.uploader.upload(AnhBia.tempFilePath, {
			resource_type: "auto",
			folder: "product_avatar"
		}, (err, avatar)=>{
			if(err){
				res({
					status: 0,
					msg: err
				});
				return;
			}
			const addProduct = `insert into tb_san_pham values(?,?,?,?,?,?,?,?,NOW(),1)`;
			const params = [MaSP,LoaiSP,TenSP,MoTa,KhoiLuong,Gia,SoLuong,avatar.url];
			pool.query(addProduct, params, async (err)=>{
				if(err){
					res({
						status: 0,
						msg: err.sqlMessage
					});
					return;
				}
				const addVariation = `insert into tb_phan_loai(MaSP, TenPL, TrangThai) 
					values(?,?,1)`;
				const addOpt = `insert into tb_lua_chon(MaPL,TenLC, TrangThai)
					values(?,?,1)`;
				for(let variation of PhanLoai){
					let [id, fields] = await poolAwait.query(addVariation,[MaSP,variation.TenPL]);
					for(let option of variation.LuaChon){
						await poolAwait.query(addOpt,[id.insertId,option]);
					}
				}
				res({
					status: 1,
					msg: 'success'
				});
				return;
			});
		});
	});
	
	
}
Product.edit = (req, res) => {
	let MaSP = req.body.MaSP;
	let LoaiSP = req.body.LoaiSP;
	let TenSP = req.body.TenSP;
	let MoTa = req.body.MoTa;
	let KhoiLuong = req.body.KhoiLuong;
	let Gia = req.body.Gia;
	let SoLuong = req.body.SoLuong;
	
	let editProduct = ``;
	let params = [];
	const checkProduct = 'select MaSP,AnhBia from tb_san_pham where MaSP=?';
	pool.query(checkProduct, MaSP, (err,result) => {
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result.length<=0){
			res({
				status: 0,
				msg: 'Mã sản phâm không tồn tại'
			});
			return;
		}
		if(req.files){
			let AnhBia = req.files.AnhBia;
			if(!type.includes(AnhBia.mimetype)){
				res({
					status: 0,
					msg: 'File không hợp lệ'
				});
				return;
			}
			if(AnhBia.size > 4 * 1024 * 1024){
				res({
					status: 0,
					msg: 'File phải nhỏ hơn 4 MB'
				});
				return;
			}
			cloudinary.uploader.upload(AnhBia.tempFilePath, {
				resource_type: "auto",
				folder: "product_avatar"
			}, (err, avatar)=>{
				if(err){
					res({
						status: 0,
						msg: err
					});
					return;
				}
				editProduct = `update tb_san_pham set LoaiSP=?,TenSP=?,
					MoTa=?,KhoiLuong=?,Gia=?,SoLuong=?,AnhBia=? where MaSP=?`;
				params = [LoaiSP,TenSP,MoTa,KhoiLuong,Gia,SoLuong,avatar.url,MaSP];
				pool.query(editProduct, params, (err)=>{
					if(err){
						res({
							status: 0,
							msg: err.sqlMessage
						});
						return;
					}
					let oldImgLink = result[0].AnhBia;
					let arrLink = oldImgLink.split('/');
					let cloundPublicId = "product_avatar/"+arrLink[arrLink.length-1].split('.')[0];
					cloudinary.uploader.destroy(cloundPublicId);
					res({
						status: 1,
						msg: 'success'
					});
					return;
				});
			});
		}else{
			editProduct = `update tb_san_pham set LoaiSP=?,TenSP=?,
				MoTa=?,KhoiLuong=?,Gia=?,SoLuong=? where MaSP=?`;
			params = [LoaiSP,TenSP,MoTa,KhoiLuong,Gia,SoLuong,MaSP];
			pool.query(editProduct, params, (err)=>{
				if(err){
					res({
						status: 0,
						msg: err.sqlMessage
					});
					return;
				}
				let oldImgLink = result[0].AnhBia;
				let arrLink = oldImgLink.split('/');
				let cloundPublicId = "product_avatar/"+arrLink[arrLink.length-1].split('.')[0];
				cloudinary.uploader.destroy(cloundPublicId);
				res({
					status: 1,
					msg: 'success'
				});
				return;
			});
		}
	});
}
Product.delete = (req, res) => {
	let MaSP = req.params.id;
	const checkProduct = 'select MaSP,AnhBia from tb_san_pham where MaSP=?';
	pool.query(checkProduct, MaSP, (err,result) => {
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		if(result.length<=0){
			res({
				status: 0,
				msg: 'Mã sản phâm không tồn tại'
			});
			return;
		}
		const deleteProduct = `update tb_san_pham set TrangThai=0 where MaSP=?`;
		pool.query(deleteProduct, MaSP, (err)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage
				});
				return;
			}
			res({
				status: 1,
				msg: 'success'
			});
			return;
		});
		
	});
}
module.exports = Product;