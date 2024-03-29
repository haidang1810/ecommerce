const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');
const Address = require('../models/AddressesModel');
const autoJoinGroup = require('../services/autoJoinGroup');
const Notification = require('../models/NotificationsModel');

const Order = function (order) {
    this.TaiKhoan = order.TaiKhoan;
    this.MaSP = order.MaSP;
    this.ThoiGian = order.ThoiGian;
    this.NoiDung = order.NoiDung;
    this.SoSao = order.SoSao;
    this.PhanHoi = order.PhanHoi;
}

async function getAddressByOrder(customer){
	return await (await Address.findOne({customer}));
}
const createCode = async () => {
    let code = "";
    let possible = "abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 20; i++)
    	code += possible.charAt(Math.floor(Math.random() * possible.length));
	try {
		let [customer,fields] = await poolAwait.query("select MaKh from tb_khach_hang where MaKH=?",code);
		if(customer.length>0){
			createCode();
		}else  return code;
	} catch (error) {
		createCode();
	}
}
Order.getAll = async (req, res) => {
    const getAllOrder = `select tb_don_hang.MaDon, tb_don_hang.MaKH, HoTen, DiaChiNhanHang,
		TrangThai, PhiVanChuyen, TongTienHang, PhuongThucThanhToan, NgayLap
			from tb_don_hang, tb_khach_hang
			where tb_don_hang.MaKH=tb_khach_hang.MaKH
			order by NgayLap desc`;
    try{
		let [order,fields] = await poolAwait.query(getAllOrder);
		for(let i=0; i<order.length; i++){
			const getProduct = `select tb_chi_tiet_don.MaSP, TenSP, 
				tb_chi_tiet_don.SoLuong, tb_chi_tiet_don.Gia, AnhBia
				from tb_chi_tiet_don, tb_san_pham
				where tb_chi_tiet_don.MaSP=tb_san_pham.MaSP and
					MaDon=?`;
			try {
				let [orderDetail, fields] = await poolAwait.query(getProduct,order[i].MaDon);
				if(orderDetail){
					const getOption = `select MaLC, TenLC, TenPL
					from tb_ct_don_lua_chon, tb_lua_chon, tb_phan_loai
					where tb_ct_don_lua_chon.MaLC=tb_lua_chon.Id and
						tb_phan_loai.MaPL=tb_lua_chon.MaPL and
						tb_ct_don_lua_chon.MaDon=? and
						tb_ct_don_lua_chon.MaSP=? and
						tb_phan_loai.TrangThai=1`;
					for(let j=0; j<orderDetail.length; j++){
						let [options, fields] = await poolAwait.query(getOption,[
							order[i].MaDon,
							orderDetail[j].MaSP
						]);
						if(options.length>0){
							orderDetail[j].LuaChon = options;
						}
					}
					order[i].SanPham = orderDetail;
				}
			} catch (error) {
				
			}
			let address = await getAddressByOrder(order[i].MaKH);
			if(address){
				order[i].DiaChi = `${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`
			}
		}
		res({
			status: 1,
			msg: 'success',
			data: order
		});
		return;
	}catch (error){
		res({
			status: 0,
			msg: error,
		});
		return;
	}
}
Order.getById = async (req, res) => {
	const orderID = req.params.id;
    const getOrder = `select tb_don_hang.MaDon, tb_don_hang.MaKH, HoTen, DiaChiNhanHang,
			TrangThai, PhiVanChuyen, TongTienHang, SDT, Gmail, PhuongThucThanhToan, 
			TienDuocGiam, NgayLap
		from tb_don_hang, tb_khach_hang
		where tb_don_hang.MaKH=tb_khach_hang.MaKH and
			tb_don_hang.MaDon=?`;
    try{
		let [order,fields] = await poolAwait.query(getOrder,orderID);
		const getProduct = `select tb_chi_tiet_don.MaSP, TenSP, 
			tb_chi_tiet_don.SoLuong, tb_chi_tiet_don.Gia, AnhBia
			from tb_chi_tiet_don, tb_san_pham
			where tb_chi_tiet_don.MaSP=tb_san_pham.MaSP and
			tb_chi_tiet_don.MaDon=?`;
		try {
			let [orderDetail, fields] = await poolAwait.query(getProduct,orderID);
			if(orderDetail){
				const getOption = `select MaLC, TenLC, TenPL
					from tb_ct_don_lua_chon, tb_lua_chon, tb_phan_loai
					where tb_ct_don_lua_chon.MaLC=tb_lua_chon.Id and
						tb_phan_loai.MaPL=tb_lua_chon.MaPL and
						tb_ct_don_lua_chon.MaDon=? and
						tb_ct_don_lua_chon.MaSP=? and 
						tb_phan_loai.TrangThai=1`;
				for(let j=0; j<orderDetail.length; j++){
					let [options, fields] = await poolAwait.query(getOption,[
						orderID,
						orderDetail[j].MaSP
					]);
					if(options.length>0){
						orderDetail[j].LuaChon = options;
					}
				}
				order[0].SanPham = orderDetail;
			}
		} catch (error) {
			
		}
		let address = await getAddressByOrder(order[0].MaKH);
		if(address){
			order[0].DiaChi = `${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`
		}
		res({
			status: 1,
			msg: 'success',
			data: order[0]
		});
		return;
	}catch (error){
		res({
			status: 0,
			msg: error,
		});
		return;
	}
}

const createOrderID = async (length) => {
    let code = "";
    let possible = "abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++)
    	code += possible.charAt(Math.floor(Math.random() * possible.length));
	let [orders, fields] = await poolAwait.query('select * from tb_don_hang where MaDon=?',code);
	if(orders.length>0){
		createOrderID(length);
	}else
		return code;
    
}
let isThreadCreateOrder = false;
async function addOrder(req, res){
	if(!isThreadCreateOrder){
		isThreadCreateOrder = true;
		let customerID = '';
		if(req.body.MaKH){
			customerID = req.body.MaKH;
			let [user, fields] = await poolAwait.query("select TaiKhoan from tb_khach_hang where MaKH=?",customerID);
			req.username = user[0].TaiKhoan;
		}else{
			let getCustomer = 'select MaKH from tb_khach_hang where SDT=?';
			try {
				let [customer, fields] = await poolAwait.query(getCustomer,req.body.SDT);
				if(customer.length>0){
					customerID = customer[0].MaKH;
				}else{
					let addCustomer = `insert into tb_khach_hang(MaKH,HoTen,SDT)
						values(?,?,?)`;
					customerID = await createCode();
					await poolAwait.query(addCustomer,[customerID,req.body.HoTen,req.body.SDT]);
				}
			} catch (error) {
				isThreadCreateOrder = false;
				res({
					status: 0,
					msg: `Lỗi thêm đơn hàng ${error}`,
				});
				return;
			}
		}
		const tempAddress = req.body.DiaChiNhanHang;
		const transportCost = req.body.PhiVanChuyen;
		let status = 0;
		if(req.body.TrangThai)
			status = req.body.TrangThai;
		const totalPrice = req.body.TongTienHang;
		const payment = req.body.PhuongThucThanhToan;
		const products = req.body.SanPham;
		const discountCode = req.body.MaGiamGia;
		let discount = 0;
		if(req.body.TienGiam){
			discount = req.body.TienGiam;
		}
		const orderID = await createOrderID(30);
		const insertOrder = `insert into tb_don_hang values(?,?,?,?,?,?,?,?,NOW())`;
		const params = [orderID,customerID,tempAddress,status,totalPrice,transportCost,discount,payment];
		pool.query(insertOrder, params, async (err)=>{
			if(err){
				isThreadCreateOrder = false;
				res({
					status: 0,
					msg: `Lỗi thêm đơn hàng ${err.sqlMessage}`,
				});
				return;
			}
			const checkAmount = `select SoLuong, TenSP from tb_san_pham where MaSP=?`;
			for(let product of products){
				let [amount, fields] = await poolAwait.query(checkAmount,product.MaSP);
				if(amount[0].SoLuong >= product.SoLuong){
					const insertOrderDetail = `insert into tb_chi_tiet_don
						values(?,?,?,?)`;
					const updateAmout = `update tb_san_pham set SoLuong=SoLuong-? where
						MaSP=?`; 
					const insertDiscountCode = `insert into tb_don_hang_ma_giam(MaDon,MaGiamGia)
						values(?,?)`;
					try {
						const check = 'select * from tb_phan_loai where MaSP=? and TrangThai=1';
						let [checkVariation, fields] = await poolAwait.query(check,product.MaSP);
						if(checkVariation.length > product.LuaChon.length){
							await poolAwait.query(`delete from tb_chi_tiet_don where MaDon=?`,orderID);
							await poolAwait.query(`delete from tb_don_hang where MaDon=?`,orderID);
							isThreadCreateOrder = false;
							res({
								status: 0,
								msg: `Chưa chọn phân loại hàng`,
							});
							return;
						}
						let [order] = await poolAwait.query(insertOrderDetail,
							[orderID,product.MaSP,product.SoLuong,product.Gia]);
						let [isUpdate] = await poolAwait.query(updateAmout,
							[product.SoLuong, product.MaSP]);
						if(discountCode)
							for(let item of discountCode){
								let [discount] = await poolAwait.query(insertDiscountCode,[orderID,item]);
							}
						const insertOption = `insert into tb_ct_don_lua_chon(MaDon,MaSP,MaLC)
							values(?,?,?)`;
						for(let option of product.LuaChon){
							await poolAwait.query(insertOption,[orderID,product.MaSP,option.MaLC]);
						}
					} catch (error) {
						await poolAwait.query(`delete from tb_chi_tiet_don where MaDon=?`,orderID);
						await poolAwait.query(`delete from tb_don_hang where MaDon=?`,orderID);
						isThreadCreateOrder = false;
						res({
							status: 0,
							msg: `Có lỗi vui lòng thử lại ${error}`,
						});
						return;
					}
				}else{
					isThreadCreateOrder = false;
					await poolAwait.query(`delete from tb_don_hang where MaDon=?`,orderID);
					await poolAwait.query(`delete from tb_chi_tiet_don where MaDon=?`,orderID);
					res({
						status: 0,
						msg: `Sản phẩm ${amount[0].TenSP} đã hết hàng`
					});
					return;
				}
			}
			isThreadCreateOrder = false;
			res({
				status: 1,
				msg: `success`
			});
			const deleteCart = `delete from tb_gio_hang where TaiKhoan=? and MaSP=?`;
			const deleteOption = `delete from tb_gio_hang_lua_chon where MaGH=?`;
			const getCart = `select id from tb_gio_hang where TaiKhoan=? and MaSP=?`;
			for(let item of products){
				let [cart,fields] = await poolAwait.query(getCart,[req.username,item.MaSP]);
				if(cart.length>0){
					await poolAwait.query(deleteOption,cart[0].id);
					await poolAwait.query(deleteCart,[req.username,item.MaSP]);
				}
			}
			const updateDiscountCode = `update tb_ma_giam_gia set TrangThai=0 where MaGiamGia=?`;
			for(let item of discountCode){
				await poolAwait.query(updateDiscountCode,item);
			}
			return;
		})
	}else{
		setTimeout(() => {
			addOrder(req, res);
		}, 0);
	}
	
}
Order.createOrder = (req, res) => {
	addOrder(req, res);
}
Order.changeStatus = (req, res) =>{
	const orderID = req.body.MaDon;
	const statusOrder = req.body.TrangThai;
	if(statusOrder<0 || statusOrder>5){
		res({
			status: 0,
			msg: 'Trạng thái không chính xác',
		});
		return;
	}
	const findOrder = `select * from tb_don_hang where MaDon=?`;
	pool.query(findOrder, orderID, (err,result)=>{
		if(err){
			res({
				status: 0,
				msg: err.sqlMessage,
			});
			return;
		}
		if(result.length<=0){
			res({
				status: 0,
				msg: 'Đơn hàng không tồn tại',
			});
			return;
		}
		if(result[0].TrangThai>statusOrder){
			res({
				status: 0,
				msg: 'Trạng thái không chính xác',
			});
			return;
		}
		const updateStatus = `update tb_don_hang set TrangThai=? where MaDon=?`;
		pool.query(updateStatus, [statusOrder,orderID], async (err)=>{
			if(err){
				res({
					status: 0,
					msg: err.sqlMessage,
				});
				return;
			}
			let user = await poolAwait.query('select * from tb_khach_hang where MaKH=?',result[0].MaKH);
			if(statusOrder==1){
				if(user[0].length>0){
					const notification = new Notification({
						user: user[0][0].TaiKhoan,
						name: "Xác nhận đơn hàng",
						image: "https://res.cloudinary.com/jwb/image/upload/v1654437468/img_notification/ghn_gieswu.png",
						description: "Đơn hàng của bạn đã được xác nhận thành công",
					});
					notification.save()
				}
			}else if(statusOrder==2){
				if(user[0].length>0){
					const notification = new Notification({
						user: user[0][0].TaiKhoan,
						name: "Xác nhận đơn hàng",
						image: "https://res.cloudinary.com/jwb/image/upload/v1654437468/img_notification/ghn_gieswu.png",
						description: "Đơn hàng của bạn đang được vận chuyển",
					});
					notification.save()
				}
			}else if(statusOrder==3){
				if(user[0].length>0){
					const notification = new Notification({
						user: user[0][0].TaiKhoan,
						name: "Xác nhận đơn hàng",
						image: "https://res.cloudinary.com/jwb/image/upload/v1654437468/img_notification/ghn_gieswu.png",
						description: "Đơn hàng đã được giao thành công bạn có thể đánh giá đơn hàng",
					});
					notification.save()
				}
				autoJoinGroup();
			}else if(statusOrder==4){
				if(user[0].length>0){
					const notification = new Notification({
						user: user[0][0].TaiKhoan,
						name: "Đơn hàng đã huỷ",
						image: "https://res.cloudinary.com/jwb/image/upload/v1654437468/img_notification/ghn_gieswu.png",
						description: "Đơn vị giao hàng khong thể liên lạc với bạn",
					});
					notification.save()
				}
			}else if(statusOrder==5){
				if(user[0].length>0){
					const notification = new Notification({
						user: user[0][0].TaiKhoan,
						name: "Đơn hàng đã huỷ",
						image: "https://res.cloudinary.com/jwb/image/upload/v1654437468/img_notification/ghn_gieswu.png",
						description: "Bạn đã huỷ đơn hàng",
					});
					notification.save()
				}
			}
			res({
				status: 1,
				msg: 'success',
			});
			return;
		})
	})
}
Order.getByCustomer = async (req, res) => {
	let user = req.username;
	let [customer, fields] = await poolAwait.query("select MaKH from tb_khach_hang where TaiKhoan=?",user);
	const customerID = customer[0].MaKH;
	const getOrder = `select tb_don_hang.MaDon, tb_don_hang.MaKH, HoTen, DiaChiNhanHang,
		TrangThai, PhiVanChuyen, TongTienHang, TienDuocGiam
			from tb_don_hang, tb_khach_hang
			where tb_don_hang.MaKH=tb_khach_hang.MaKH
			and tb_don_hang.MaKH=?`;
	try{
		let [order,fields] = await poolAwait.query(getOrder,customerID);
		for(let i=0; i<order.length; i++){
			const getProduct = `select tb_chi_tiet_don.MaSP, TenSP, 
				tb_chi_tiet_don.SoLuong, tb_chi_tiet_don.Gia, AnhBia
				from tb_chi_tiet_don, tb_san_pham
				where tb_chi_tiet_don.MaSP=tb_san_pham.MaSP and
					MaDon=?`;
			try {
				let [orderDetail, fields] = await poolAwait.query(getProduct,order[i].MaDon);
				if(orderDetail){
					const getOption = `select MaLC, TenLC, TenPL
					from tb_ct_don_lua_chon, tb_lua_chon, tb_phan_loai
					where tb_ct_don_lua_chon.MaLC=tb_lua_chon.Id and
						tb_phan_loai.MaPL=tb_lua_chon.MaPL and
						tb_ct_don_lua_chon.MaDon=? and
						tb_ct_don_lua_chon.MaSP=? and
						tb_phan_loai.TrangThai=1`;
					for(let j=0; j<orderDetail.length; j++){
						let [options, fields] = await poolAwait.query(getOption,[
							order[i].MaDon,
							orderDetail[j].MaSP
						]);
						if(options.length>0){
							orderDetail[j].LuaChon = options;
						}
					}
					order[i].SanPham = orderDetail;
				}
			} catch (error) {
				
			}
			let address = await getAddressByOrder(order[i].MaKH);
			if(address){
				order[i].DiaChi = `${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`
			}
		}
		res({
			status: 1,
			msg: 'success',
			data: order
		});
		return;
	}catch (error){
		res({
			status: 0,
			msg: error,
		});
		return;
	}
}
module.exports = Order;