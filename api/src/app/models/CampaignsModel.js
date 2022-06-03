const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const schedule = require('node-schedule');
const nodemailer = require("nodemailer");

const Campaign = function (campaign) {
    this.Id = campaign.Id;
}
const createCode = async (length) => {
    let code = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++)
    	code += possible.charAt(Math.floor(Math.random() * possible.length));
	const getCode = `select * from tb_ma_giam_gia where MaGiamGia=?`;
	let [discount,fields] = await poolAwait.query(getCode,code);
	if(discount.length>0) createCode(length);
	else return code
}
Campaign.add = async (req, res) => {
	let name = req.body.TenCD;
	let code = req.body.MaCD;
	let group = req.body.NhomKH;
	let type = req.body.LoaiCD;
	let content = req.body.NoiDung;
	let discount = req.body.GiamGia;
	let timeActive = req.body.ThoiGian;
	const checkCamp = 'select * from tb_chien_dich where MaCD=?';
	let [camp, fields] = await poolAwait.query(checkCamp,code);
	if(camp.length>0){
		res({
			status: 0,
			msg: 'Mã chiến dịch đã tồn tại'
		});
		return;
	}
	if(timeActive){
		let addCampaign = `insert into tb_chien_dich values(?,?,?,?,?,?)`;
		await poolAwait.query(addCampaign,[
			code,
			name,
			group,
			type,
			content,
			timeActive
		])
		if(group){
			let getCustomer = `select tb_khach_hang.MaKH,SDT,Gmail 
			from tb_kh_nhom_kh, tb_khach_hang 
			where tb_khach_hang.MaKH=tb_kh_nhom_kh.MaKH and
				MaNhom=?`;
			let [customers, fields] = await poolAwait.query(getCustomer,group);
			if(customers.length>0){
				for(let customer of customers){
					let status = 0;
					if(type==1){
						const expires = new Date(timeActive);
						schedule.scheduleJob(expires, async ()=>{
							try {
								let to = "+84"+customer.SDT.substr(1,customer.SDT.length-1);
								await sendSMS(content, to);
								status = 1;
							} catch (error) {
								status = 2;
							}
							let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
							await poolAwait.query(detailCamp,[status,code,customer.MaKH]);							
						})
					}else{
						const expires = new Date(timeActive);
						schedule.scheduleJob(expires, async ()=>{
							sendMail(customer.Gmail,name,content)
									.then(async ()=>{
										status = 1;
										let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
										await poolAwait.query(detailCamp,[status,code,customer.MaKH]);							
									})
									.catch(async ()=>{
										status = 2;
										let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
										await poolAwait.query(detailCamp,[status,code,customer.MaKH]);
									})		
						})
					}
					addDtail(code,customer.MaKH,status,discount);					
				}
			}
		}else{
			let getCustomer = `select MaKH,SDT,Gmail from tb_khach_hang`;
			let [customers, fields] = await poolAwait.query(getCustomer);
			if(customers.length>0){
				for(let customer of customers){
					let status = 0;
					if(type==1){
						try {
							let to = "+84"+customer.SDT.substr(1,customer.SDT.length-1);
							await sendSMS(content, to);
							status = 1;
						} catch (error) {
							status = 2;
						}
						let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
						await poolAwait.query(detailCamp,[status,code,customer.MaKH]);
					}else{
						sendMail(customer.Gmail,name,content)
							.then(async ()=>{
								status = 1;
								let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
								await poolAwait.query(detailCamp,[status,code,customer.MaKH]);							
							})
							.catch(async ()=>{
								status = 2;
								let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
								await poolAwait.query(detailCamp,[status,code,customer.MaKH]);
							})
					}
					addDtail(code,customer.MaKH,status,discount);	
				}
			}
		}
		res({
			status: 1,
			msg: 'success'
		});
		return;
	}else {
		let addCampaign = `insert into tb_chien_dich values(?,?,?,?,?,NOW())`;
		await poolAwait.query(addCampaign,[
			code,
			name,
			group,
			type,
			content
		]);
		if(group){
			let getCustomer = `select tb_khach_hang.MaKH,SDT,Gmail 
			from tb_kh_nhom_kh, tb_khach_hang 
			where tb_khach_hang.MaKH=tb_kh_nhom_kh.MaKH and
				MaNhom=?`;
			let [customers, fields] = await poolAwait.query(getCustomer,group);
			if(customers.length>0){
				for(let customer of customers){
					let status = 0;
					if(type==1){
						try {
							let to = "+84"+customer.SDT.substr(1,customer.SDT.length-1);
							await sendSMS(content, to);
							status = 1;
						} catch (error) {
							console.log(error);
							status = 2;
						}
					}else{
						sendMail(customer.Gmail,name,content)
							.then(async ()=>{
								status = 1;
								let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
								await poolAwait.query(detailCamp,[status,code,customer.MaKH]);							
							})
							.catch(async ()=>{
								status = 2;
								let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
								await poolAwait.query(detailCamp,[status,code,customer.MaKH]);
							})
					}
					addDtail(code,customer.MaKH,status,discount);
				}
			}
		}else{
			let getCustomer = `select MaKH,SDT,Gmail from tb_khach_hang`;
			let [customers, fields] = await poolAwait.query(getCustomer);
			if(customers.length>0){
				for(let customer of customers){
					let status = 0;
					if(type==1){
						try {
							let to = "+84"+customer.SDT.substr(1,customer.SDT.length-1);
							await sendSMS(content, to);
							status = 1;
						} catch (error) {
							status = 2;
						}
					}else{
						sendMail(customer.Gmail,name,content)
							.then(async ()=>{
								status = 1;
								let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
								await poolAwait.query(detailCamp,[status,code,customer.MaKH]);							
							})
							.catch(async ()=>{
								status = 2;
								let detailCamp = `update tb_chi_tiet_chien_dich set TrangThai=? where MaCD=? and MaKH=?`;
								await poolAwait.query(detailCamp,[status,code,customer.MaKH]);
							})
					}
					addDtail(code,customer.MaKH,status,discount);
				}
			}
		}
		res({
			status: 1,
			msg: 'success'
		});
		return;
	}
}
async function addDtail(code,customerID,status,discount){
	let detailCamp = `insert into tb_chi_tiet_chien_dich values(?,?,?)`;
	await poolAwait.query(detailCamp,[code,customerID,status]);
	if(discount){
		let discountID = await createCode(15);
		let addDiscount = `insert into tb_ma_giam_gia values(?,?,?,?,?,1)`;
		await poolAwait.query(addDiscount, [
			discountID,
			customerID,
			discount.MoTa,
			discount.TienGiam,
			discount.HanSuDung
		]);
	}
}

function sendSMS(content, to){
	return client.messages
		.create({
			body: content,
			from: '+19803754486',
			to: to
		})
}
async function sendMail(to,subject,content) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: '"JWB Shop" <jwbshopso1vn@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: content
    });
}
Campaign.getAll = (req, res) => {
	const getAll = `select tb_chien_dich.*, TenNhom
		from tb_chien_dich
		LEFT JOIN tb_nhom_khach_hang
		ON tb_chien_dich.NhomKH = tb_nhom_khach_hang.MaNhom;`;
	pool.query(getAll,(err, result)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		res({
			status: 1,
			msg: 'success',
			data: result
		});
		return;
	})
}
Campaign.getById = (req, res) => {
	let id = req.params.id;
	const get = `select * from tb_chien_dich where MaCD=?`;
	pool.query(get,id, (err,result) => {
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		let campaigns = result[0];
		const getCustomer = `select tb_chi_tiet_chien_dich.MaKH, HoTen, SDT, Gmail, TrangThai
			from tb_chi_tiet_chien_dich, tb_khach_hang
			where tb_chi_tiet_chien_dich.MaKH=tb_khach_hang.MaKH and
			MaCD=?`;
		pool.query(getCustomer,id, (err,customers)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage
				});
				return;
			}
			campaigns.KhachHang = customers;
			res({
				status: 1,
				msg: 'success',
				data: campaigns
			});
			return;
		})

	})
}
module.exports = Campaign;