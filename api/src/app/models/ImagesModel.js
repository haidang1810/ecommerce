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

function uploadProducts(images, productID){
	return new Promise((resolve)=>{
		let countUploadSuccess = 0;
		let listImgError = [];
		images.forEach(async (image) => {
			if(!type.includes(image.mimetype) || image.size > 4 * 1024 * 1024){
				listImgError.push(image.name);
			}else{
				await cloudinary.uploader.upload(image.tempFilePath, {
					resource_type: "auto",
					folder: "images"
				}, (err, result)=>{
					if(!err){
						const addImg = `insert into tb_hinh_anh(MaSP,DuongDan)
							values(?,?)`;
						pool.query(addImg,[result.url, productID],(err)=>{
							if(err){
								listImgError.push(image.name);
							}else{
								countUploadSuccess++;
							}
						});
					}else listImgError.push(image.name);
				});
			}
		});
		resolve({
			countUploadSuccess,
			listImgError
		});
	})
}

var type = ['image/jpeg','image/png','image/jpg'];
Image.add = (req, res) => {
	const images = req.files.Anh;
	const productID = req.body.MaSP;
	uploadProducts(images,productID)
		.then((data)=>{
			res({
				status: 1,
				msg: 'success',
				countUploadSuccess: data.countUploadSuccess,
				listImgError: data.listImgError
			});
		})
}
Image.delete = (req, res) => {
	const id = req.params.id;
	pool.query('select * from tb_hinh_anh where Id=?',id, (err,result)=>{
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
				msg: 'Hình ảnh không tồn tại'
			});
			return;
		}
		const deleteById = `delete from tb_hinh_anh where Id=?`;
		pool.query(deleteById, id, (err)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage
				});
				return;
			}
			let oldImgLink = user[0].DuongDan;
			let arrLink = oldImgLink.split('/');
			let cloundPublicId = "images/"+arrLink[arrLink.length-1].split('.')[0];
			cloudinary.uploader.destroy(cloundPublicId);
			res({
				status: 1,
				msg: 'success'
			});
			return;
		})
	})
}
module.exports = Image;