const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');
const logger = require('../services/logger');


const createQuery = (property, condition, value) => {
	let query = ``;
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
			query += `SELECT tb_khach_hang.MaKH 
			from tb_khach_hang
			LEFT JOIN tb_don_hang
			ON tb_khach_hang.MaKH = tb_don_hang.MaKH
			GROUP BY tb_khach_hang.MaKH 
			HAVING COUNT(tb_khach_hang.MaKH)`;
			break;
		}
		case 'tổng chi tiêu': {
			query += `SELECT tb_khach_hang.MaKH 
			from tb_khach_hang
			LEFT JOIN tb_don_hang
			ON tb_khach_hang.MaKH = tb_don_hang.MaKH
			GROUP BY tb_khach_hang.MaKH 
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
			break;
		}
		case 'lớn hơn': {
			query += `>`;
			break;
		}
		case 'nhỏ hơn': {
			query += `<`;
			break;
		}
	}
	if(property.toLowerCase()=='tên'){
		query += `'%${value}'`;
	}else if(property.toLowerCase()=='giới tính'){
		if(value.toLowerCase()=='nam')
			query += `1`;
		else if(value.toLowerCase()=='nữ'){
			query += `2`;
		}else{
			query += `3`;
		}
	}else{
		query += `'${value}'`;
	}
	return query;
}
const count_element_in_array = (array, value, amount) => {
    let count = 0;
    for(let i=0;i<array.length;i++){
      if(array[i]==value) //Tìm thấy phần tử giống x trong mảng thì cộng biến đếm
        count ++;
    }
    if(count==amount) return true;
	else return false;
}
const convertObCustomerToArr = (obj) => {
	let arr = [];
	for(let i=0; i<obj.length; i++){
		arr.push(obj[i].MaKH);
	}
	return arr;
}
const join = () => {
	return new Promise(async ()=>{
		const getAll = `select MaNhom from tb_nhom_khach_hang`;
		let [groups, fields] = await poolAwait.query(getAll);
		for(let group of groups){
			const getConditions = `select * from tb_dieu_kien_nhom where MaNhom=?`;
			let [conditions, fields] = await poolAwait.query(getConditions,group.MaNhom);
			let listAllCondition = [];
			for(let condition of conditions){
				let query = createQuery(condition.ThuocTinh,condition.DieuKien,condition.GiaTri);
				try {
					let [customers, fields] = await poolAwait.query(query);
					if(customers.length>0){
						let tempArr = convertObCustomerToArr(customers);
							listAllCondition.push(...tempArr);
					}
				} catch (error) {
					// logger.error(error);
				}
			}
			let listCustomer = [];
			for(let i=0; i<listAllCondition.length;i++){
				if(count_element_in_array(listAllCondition,listAllCondition[i],conditions.length)){
					if(!listCustomer.includes(listAllCondition[i]))
						listCustomer.push(listAllCondition[i]);
				}
			}
			const addCustomer = `insert into tb_kh_nhom_kh(MaKH,MaNhom,NgayGiaNhap)
						values(?,?,DATE(NOW()))`;
			for(let i=0; i<listCustomer.length;i++){
				pool.query('select * from tb_kh_nhom_kh where MaKH=? and MaNhom=?',[
					listCustomer[i],
					group.MaNhom
				], async (err,result)=>{
					if(!err && result.length<=0)
						await poolAwait.query(addCustomer,[listCustomer[i],group.MaNhom]);
				})
				
			}	
		}
	})
}

module.exports = join;
