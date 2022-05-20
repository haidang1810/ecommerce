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

async function uploadImageProduct(image, productID){
	return await (await cloudinary.uploader.upload(image.tempFilePath, {
		resource_type: "auto",
		folder: "images"
	}, (err, result)=>{
		if(!err){
			const addImg = `insert into tb_hinh_anh(MaSP,DuongDan)
				values(?,?)`;
			pool.query(addImg,[result.url, productID],(err)=>{
				if(err){
					cloudinary.uploader.destroy(result.public_id);
					return false;
				}else{
					return true;
				}
			});
		}else return false;
	}))
}

var type = ['image/jpeg','image/png','image/jpg'];
Image.add = async (req, res) => {
	const images = req.files.Anh;
	const productID = req.body.MaSP;
	let countUploadSuccess = 0;
	let listImgError = [];
	for(let image of images){
		if(!type.includes(image.mimetype) || image.size > 4 * 1024 * 1024){
			listImgError.push(image.name);
		}else{
			let isSuccess = await uploadImageProduct(image, productID);
			if(isSuccess)
				countUploadSuccess++;
			else
				listImgError.push(image.name);
		}
	}
	res({
		status: 1,
		msg: 'success',
		countUploadSuccess: data.countUploadSuccess,
		listImgError: data.listImgError
	});
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