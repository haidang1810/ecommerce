const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');

const Report = function(report) {
    this.id = report.id;
}
Report.baseInfo = async (req, res) => {
	try {
		let customers = await poolAwait.query("select MaKH from tb_khach_hang");
		let orders = await poolAwait.query("select MaDon from tb_don_hang");
		let ratings = await poolAwait.query("SELECT AVG(SoSao) as TongSoSao FROM tb_danh_gia");
		let products = await poolAwait.query("select MaSP from tb_san_pham");

		let data = {
			TongKH: customers[0].length,
			TongDH: orders[0].length,
			DanhGia: ratings[0][0].TongSoSao,
			TongSP: products[0].length
		}
		res({
			status: 1,
			msg: "success",
			data
		})
	} catch (error) {
		res({
			status: 0,
			msg: error
		});
		return;
	}
}

Report.reportSales = async (req, res) => {
	let type = req.body.type;
	let time = req.body.time;
	let y = [];
	let x = [];
	if(type=='month'){
		var lastDay = new Date(time.year, time.month, 0).getDate();
		const getValue = `select SUM(TongTienHang) as TongTien from tb_don_hang where TrangThai=3 and
		NgayLap=?`;
		for(let i=1; i<=lastDay; i++){
			try {
				let date = `${time.year}/${time.month}/${i}`;
				x.push(`${i}/${time.month}/${time.year}`);
				let [orders, fields] = await poolAwait.query(getValue,date);
				if(orders[0].TongTien)
					y.push(Number((orders[0].TongTien/1000000).toFixed(2)))
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}else if(type=='session'){
		const getValue = `select SUM(TongTienHang) as TongTien 
			from tb_don_hang 
			where TrangThai=3 and
				YEAR(NgayLap)=? and 
				MONTH(NgayLap)=?`;
		let start = 0;
		let end = 0;
		if(time.session==1){
			start = 1;
			end = 3;
		}else if(time.session==2){
			start = 4;
			end = 6;
		}else if(time.session==3){
			start = 7;
			end = 9;
		}else{
			start = 10;
			end = 12;
		}
		for(let i=start; i<=end; i++){
			try {
				let date = `${i}/${time.year}`;
				x.push(date);
				let [orders, fields] = await poolAwait.query(getValue,[time.year,i]);
				if(orders[0].TongTien)
					y.push(Number((orders[0].TongTien/1000000).toFixed(2)))
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}else{
		const getValue = `select SUM(TongTienHang) as TongTien 
			from tb_don_hang 
			where TrangThai=3 and
				YEAR(NgayLap)=? and 
				MONTH(NgayLap)=?`;
		for(let i=1; i<=12; i++){
			try {
				let date = `${i}/${time}`;
				x.push(date);
				let [orders, fields] = await poolAwait.query(getValue,[time,i]);
				if(orders[0].TongTien)
					y.push(Number((orders[0].TongTien/1000000).toFixed(2)))
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}
	let data = {
		x,
		y
	};
	res({
		status: 1,
		msg: "success",
		data
	})
}
Report.reportOrder = async (req, res) => {
	let type = req.body.type;
	let time = req.body.time;
	let y = [];
	let x = [];
	if(type=='month'){
		var lastDay = new Date(time.year, time.month, 0).getDate();
		const getValue = `select COUNT(MaDon) as SoLuong from tb_don_hang where TrangThai=3 and
		NgayLap=?`;
		for(let i=1; i<=lastDay; i++){
			try {
				let date = `${time.year}/${time.month}/${i}`;
				x.push(`${i}/${time.month}/${time.year}`);
				let [orders, fields] = await poolAwait.query(getValue,date);
				if(orders[0].SoLuong)
					y.push(orders[0].SoLuong)
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}else if(type=='session'){
		const getValue = `select COUNT(MaDon) as SoLuong 
			from tb_don_hang 
			where TrangThai=3 and
				YEAR(NgayLap)=? and 
				MONTH(NgayLap)=?`;
		let start = 0;
		let end = 0;
		if(time.session==1){
			start = 1;
			end = 3;
		}else if(time.session==2){
			start = 4;
			end = 6;
		}else if(time.session==3){
			start = 7;
			end = 9;
		}else{
			start = 10;
			end = 12;
		}
		for(let i=start; i<=end; i++){
			try {
				let date = `${i}/${time.year}`;
				x.push(date);
				let [orders, fields] = await poolAwait.query(getValue,[time.year,i]);
				if(orders[0].SoLuong)
					y.push(orders[0].SoLuong)
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}else{
		const getValue = `select COUNT(MaDon) as SoLuong 
			from tb_don_hang 
			where TrangThai=3 and
				YEAR(NgayLap)=? and 
				MONTH(NgayLap)=?`;
		for(let i=1; i<=12; i++){
			try {
				let date = `${i}/${time}`;
				x.push(date);
				let [orders, fields] = await poolAwait.query(getValue,[time,i]);
				if(orders[0].SoLuong)
					y.push(orders[0].SoLuong)
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}
	let data = {
		x,
		y
	};
	res({
		status: 1,
		msg: "success",
		data
	});
}
Report.reportProduct = async (req, res) => {
	let type = req.body.type;
	let time = req.body.time;
	let y = [];
	let x = [];
	if(type=='month'){
		var lastDay = new Date(time.year, time.month, 0).getDate();
		const getValue = `select SUM(tb_chi_tiet_don.SoLuong) as SoLuong 
		from tb_don_hang, tb_chi_tiet_don
		where TrangThai=3 and
			NgayLap=? and
			tb_don_hang.MaDon=tb_chi_tiet_don.MaDon`;
		for(let i=1; i<=lastDay; i++){
			try {
				let date = `${time.year}/${time.month}/${i}`;
				x.push(`${i}/${time.month}/${time.year}`);
				let [orders, fields] = await poolAwait.query(getValue,date);
				if(orders[0].SoLuong)
					y.push(orders[0].SoLuong)
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}else if(type=='session'){
		const getValue = `select SUM(tb_chi_tiet_don.SoLuong) as SoLuong  
			from tb_don_hang, tb_chi_tiet_don
			where TrangThai=3 and
				YEAR(NgayLap)=? and 
				MONTH(NgayLap)=? and
				tb_don_hang.MaDon=tb_chi_tiet_don.MaDon`;
		let start = 0;
		let end = 0;
		if(time.session==1){
			start = 1;
			end = 3;
		}else if(time.session==2){
			start = 4;
			end = 6;
		}else if(time.session==3){
			start = 7;
			end = 9;
		}else{
			start = 10;
			end = 12;
		}
		for(let i=start; i<=end; i++){
			try {
				let date = `${i}/${time.year}`;
				x.push(date);
				let [orders, fields] = await poolAwait.query(getValue,[time.year,i]);
				if(orders[0].SoLuong)
					y.push(orders[0].SoLuong)
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}else{
		const getValue = `select SUM(tb_chi_tiet_don.SoLuong) as SoLuong  
			from tb_don_hang, tb_chi_tiet_don
			where TrangThai=3 and
				YEAR(NgayLap)=? and 
				MONTH(NgayLap)=? and
				tb_don_hang.MaDon=tb_chi_tiet_don.MaDon`;
		for(let i=1; i<=12; i++){
			try {
				let date = `${i}/${time}`;
				x.push(date);
				let [orders, fields] = await poolAwait.query(getValue,[time,i]);
				if(orders[0].SoLuong)
					y.push(orders[0].SoLuong)
				else y.push(0)
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}
	let data = {
		x,
		y
	};
	res({
		status: 1,
		msg: "success",
		data
	});
}
Report.reportBestSales = async (req, res) => {
	let type = req.body.type;
	let time = req.body.time;
	let y = [];
	let x = [];
	if(type=='month'){
		const getValue = `select TenSP, SUM(tb_chi_tiet_don.SoLuong) as SoLuong 
		from tb_don_hang, tb_chi_tiet_don, tb_san_pham
		where tb_don_hang.TrangThai=3 and
			YEAR(NgayLap)=? and 
			MONTH(NgayLap)=? and
			tb_don_hang.MaDon=tb_chi_tiet_don.MaDon AND
			tb_chi_tiet_don.MaSP=tb_san_pham.MaSP
		GROUP BY tb_chi_tiet_don.MaSP
		ORDER BY SoLuong desc
		LIMIT 5;`;
		try {
			let [orders, fields] = await poolAwait.query(getValue,[time.year, time.month]);
			for(let order of orders){
				x.push(order.TenSP);
				y.push(Number(order.SoLuong));
			}
		} catch (error) {
			res({
				status: 0,
				msg: error
			});
			return;
		}
	}else if(type=='session'){
		const getValue = `select TenSP, SUM(tb_chi_tiet_don.SoLuong) as SoLuong 
			from tb_don_hang, tb_chi_tiet_don, tb_san_pham
			where tb_don_hang.TrangThai=3 and
				YEAR(NgayLap)=? and 
				(MONTH(NgayLap)=? or MONTH(NgayLap)=? or MONTH(NgayLap)=? ) and
				tb_don_hang.MaDon=tb_chi_tiet_don.MaDon AND
				tb_chi_tiet_don.MaSP=tb_san_pham.MaSP
			GROUP BY tb_chi_tiet_don.MaSP
			ORDER BY SoLuong desc
			LIMIT 5;`;
		if(time.session==1){
			try {
				let [orders, fields] = await poolAwait.query(getValue,[time.year,1,2,3]);
				for(let order of orders){
					x.push(order.TenSP);
					y.push(Number(order.SoLuong));
				}
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}else if(time.session==2){
			try {
				let [orders, fields] = await poolAwait.query(getValue,[time.year,4,5,6]);
				for(let order of orders){
					x.push(order.TenSP);
					y.push(Number(order.SoLuong));
				}
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}else if(time.session==3){
			try {
				let [orders, fields] = await poolAwait.query(getValue,[time.year,7,8,9]);
				for(let order of orders){
					x.push(order.TenSP);
					y.push(Number(order.SoLuong));
				}
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}else{
			try {
				let [orders, fields] = await poolAwait.query(getValue,[time.year,10,11,12]);
				for(let order of orders){
					x.push(order.TenSP);
					y.push(Number(order.SoLuong));
				}
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
	}else{
		const getValue = `select TenSP, SUM(tb_chi_tiet_don.SoLuong) as SoLuong
		from tb_don_hang, tb_chi_tiet_don, tb_san_pham
		where tb_don_hang.TrangThai=3 and
			YEAR(NgayLap)=? and 
			tb_don_hang.MaDon=tb_chi_tiet_don.MaDon AND
			tb_chi_tiet_don.MaSP=tb_san_pham.MaSP
		GROUP BY tb_chi_tiet_don.MaSP
		ORDER BY SoLuong desc
        LIMIT 5;`;
		try {
			let [orders, fields] = await poolAwait.query(getValue,time);
			for(let order of orders){
				x.push(order.TenSP);
				y.push(Number(order.SoLuong));
			}
		} catch (error) {
			console.log(error);
			res({
				status: 0,
				msg: error
			});
			return;
		}
	}
	let data = {
		x,
		y
	};
	res({
		status: 1,
		msg: "success",
		data
	});
}
module.exports = Report;
