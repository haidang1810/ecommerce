const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})
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
	let result = await cloudinary.uploader.upload(image.tempFilePath, {
		resource_type: "auto",
		folder: "images"
	});
	const addImg = `insert into tb_hinh_anh(MaSP,DuongDan)
		values(?,?)`;
	try{
		let [rows, fields] = await poolAwait.query(addImg,[productID,result.url]);
		return true;
	}catch(error){
		console.log("error",error);
		cloudinary.uploader.destroy(result.public_id);
		return false;
	}
}

var type = ['image/jpeg','image/png','image/jpg'];
Image.add = async (req, res) => {
	const images = [];
	images.push(req.files.Anh);
	const productID = req.body.MaSP;
	let countUploadSuccess = 0;
	let listImgError = [];
	for(let i=0; i<images.length;i++){
		if(!type.includes(images[i].mimetype) || images[i].size > 4 * 1024 * 1024){
			listImgError.push(images[i].name);
		}else{
			let isSuccess = await uploadImageProduct(images[i], productID);
			if(isSuccess)
				countUploadSuccess++;
			else
				listImgError.push(images[i].name);
		}
	}
	res({
		status: 1,
		msg: 'success',
		countUploadSuccess: countUploadSuccess,
		listImgError: listImgError
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
			let oldImgLink = result[0].DuongDan;
			let arrLink = oldImgLink.split('/');
			let cloundPublicId = "images/"+arrLink[arrLink.length-1].split('.')[0];
			cloudinary.uploader.destroy(cloundPublicId);
			res({
				status: 1,
				msg: 'success'
			});
			return;
		})
	});
}
module.exports = Image;