const poolAwait = require('../config/connectDBAwait');
const logger = require('../services/logger');


const createQuery = (property, condition, value) => {
	const query = ``;
	switch(property.toLowerCase()){
		case 'ngày sinh': {
			query += `select MaKH
			from tb_khach_hang
			where DAY(NgaySinh)`;
			break;
		}
		case 'tháng sinh': {
			query += `select MaKH
			from tb_khach_hang
			where MONTH(NgaySinh)`;
			break;
		}
		case 'năm sinh': {
			query += `select MaKH
			from tb_khach_hang
			where YEAR(NgaySinh)`;
			break;
		}
		case 'tuổi': {
			query += `select MaKH
			from tb_khach_hang
			where Year(NOW())-Year(NgaySinh)`;
			break;
		}
		case 'giới tính': {
			query += `select MaKH
			from tb_khach_hang
			where GioiTinh`;
			break;
		}
		case 'tên': {
			query += `select MaKH
			from tb_khach_hang
			where HoTen`;
			break;
		}
		case 'số đơn hàng': {
			query += `SELECT MaKH 
			from tb_don_hang 
			GROUP BY MaKH 
			HAVING COUNT(MaKH)`;
			break;
		}
		case 'tổng chi tiêu': {
			query += `SELECT MaKH 
			from tb_don_hang 
			GROUP BY MaKH 
			HAVING SUM(TongTienHang)`;
			break;
		}
		case 'đơn hàng cao nhất': {
			query += `SELECT MaKH 
			from tb_don_hang 
			WHERE TongTienHang`;
			break;
		}
	}
	switch(condition.toLowerCase()){
		case 'bằng': {
			if(property.toLowerCase()=='tên'){
				query += `LIKE`;
			}else query += `=`;
		}
		case 'lớn hơn': {
			query += `>`;
		}
		case 'nhỏ hơn': {
			query += `<`;
		}
	}
	if(property.toLowerCase()=='tên'){
		query += `'%${value}'`;
	}else{
		query += `'${value}'`;
	}
	return query;
}
const convertSingleObjArrayToArray = (obj,key) => {
	let arr = [];
	for(let i=0; i<obj.length; i++){
		arr.push(obj[i].key);
	}
	return arr;
}
const join = async () => {
	try {
		const getAll = `select MaNhom from tb_nhom_khach_hang`;
		let [groups, fields] = await poolAwait.query(getAll);
		for(let group of groups){
			const getConditions = `select * from tb_dieu_kien_nhom where MaNhom=?`;
			let [conditions, fields] = await poolAwait.query(getConditions,group.MaNhom);
			let query = ``;
			let isSuccess = true;
			for(let condition of conditions){
				let tmpQuery = createQuery(condition.ThuocTinh,condition.DieuKien,condition.GiaTri);
				let [customers, fields] = await poolAwait.query(tmpQuery);
				if(customers.length>0){
					if(query!=''){
						query += ` UNION `+tmpQuery;
					}else query += tmpQuery;
				}else{
					isSuccess = false
				}
			}
			// const addCustomer = `insert into tb_kh_nhom_kh(MaKH,MaNhom,NgayGiaNhap)
			// 			values(?,?,DATE(NOW()))`;
			// 		for(let customer of customers){
			// 			await poolAwait.query(addCustomer,[customer.MaKH,group.MaNhom]);
			// 		}
		}
	} catch (error) {
		logger.createLog.error(error);
	}
}

module.exports = join;
