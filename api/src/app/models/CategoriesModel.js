const pool = require('../config/connectDB');

const Category = function (category) {
    this.MaLoai = category.MaLoai;
    this.TenLoai = category.TenLoai;
}

Category.getAll = (req, res) => {
    const getAllCateCategories = `select * from tb_loai_san_pham`;
    pool.query(getAllCateCategories, (err, result)=>{
        if(err){
			res({
				status: 0,
				msg: err.sqlMessage
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
Category.add = (req, res) => {
	const categoryID = req.body.MaLoai;
	const name = req.body.TenLoai;
	pool.query("select * from tb_loai_san_pham where MaLoai=?",categoryID,(err,result)=>{
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
				msg: "Danh mục đã tồn tại"
			});
			return;
		}
		const addCategory = `insert into tb_loai_san_pham values(?,?)`;
		pool.query(addCategory, [categoryID,name], (err)=>{
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
		});
	});
}
Category.edit = (req, res) => {
	const categoryID = req.body.MaLoai;
	const name = req.body.TenLoai;
	pool.query("select * from tb_loai_san_pham where MaLoai=?",categoryID,(err,result)=>{
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
				msg: "Danh mục không tồn tại"
			});
			return;
		}
		const addCategory = `update tb_loai_san_pham set TenLoai=? where MaLoai=?`;
		pool.query(addCategory, [name, categoryID], (err)=>{
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
		});
	});
}
Category.delete = (req, res) => {
	const categoryID = req.params.id;
	pool.query("select * from tb_loai_san_pham where MaLoai=?",categoryID,(err,result)=>{
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
				msg: "Danh mục không tồn tại"
			});
			return;
		}
		pool.query('select * from tb_san_pham where LoaiSP=?',categoryID,(err, products)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage
				});
				return;
			}
			if(products.length>0){
				res({
					status: 0,
					msg: 'Danh mục đã có sản phẩm không thể xoá'
				});
				return;
			}
			pool('delete from tb_loai_san_pham where MaLoai=?',categoryID,(err)=>{
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
			})
		})
		
	});
}
module.exports = Category;