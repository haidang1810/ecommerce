const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');
const autoJoinGroup = require('../services/autoJoinGroup');
const Group = function (group) {
    this.MaLoai = group.MaLoai;
    this.TenLoai = group.TenLoai;
}

Group.getAll = (req, res) => {
    const getAllGroup = `select tb_nhom_khach_hang.*, COUNT(MaKH) as SoKH
	from tb_nhom_khach_hang
	LEFT JOIN tb_kh_nhom_kh
	ON tb_nhom_khach_hang.MaNhom = tb_kh_nhom_kh.MaNhom
	GROUP BY tb_nhom_khach_hang.MaNhom`;
    pool.query(getAllGroup, async (err, result)=>{
        if(err){
			res({
				status: 0,
				msg: err.sqlMessage
			});
			return;
		}
		let groups = result;
		const getCondition = `select ThuocTinh, DieuKien, GiaTri 
			from tb_dieu_kien_nhom where MaNhom=?`;
		for(let i=0; i<groups.length; i++){
			try {
				let [conditions, fields] = await poolAwait.query(getCondition,groups[i].MaNhom);
				groups[i].DieuKien = [];
				for(let j=0; j<conditions.length; j++){
					groups[i].DieuKien.push(`${conditions[j].ThuocTinh} ${conditions[j].DieuKien} ${conditions[j].GiaTri}`);
				}
			} catch (error) {
				res({
					status: 0,
					msg: error
				});
				return;
			}
		}
		res({
			status: 1,
			msg: 'success!',
			data: groups
		});
		return;
    });
}
Group.delete = async (req, res) => {
	let groupID = req.params.id;
	const deleteConditions = 'delete from tb_dieu_kien_nhom where MaNhom=?';
	const removeCustomer = `delete from tb_kh_nhom_kh where MaNhom=?`;
	const deleteGroup = `delete from tb_nhom_khach_hang where MaNhom=?`;

	try {
		await poolAwait.query(deleteConditions,groupID);
		await poolAwait.query(removeCustomer,groupID);
		await poolAwait.query(deleteGroup,groupID);
		res({
			status: 1,
			msg: 'success!'
		});
		return;
	} catch (error) {
		res({
			status: 0,
			msg: error
		});
		return;
	}
}
Group.add = async (req, res) => {
	let id = req.body.MaNhom;
	let name = req.body.TenNhom;
	let description = req.body.MoTa;
	let conditions = req.body.DieuKien;
	const addGroup = `insert into tb_nhom_khach_hang 
		values(?,?,?,DATE(NOW()))`;
	const addConditions = `insert into tb_dieu_kien_nhom(MaNhom,ThuocTinh,DieuKien,GiaTri)
		values(?,?,?,?)`;
	try {
		await poolAwait.query(addGroup, [id,name,description]);
		for(let i=0; i<conditions.length; i++){
			await poolAwait.query(addConditions, [
				id,
				conditions[i].ThuocTinh,
				conditions[i].DieuKien,
				conditions[i].GiaTri
			]);
		}
		res({
			status: 1,
			msg: 'success!'
		});
		autoJoinGroup();
		return;
	} catch (error) {
		console.log(error);
		const deleteConditions = 'delete from tb_dieu_kien_nhom where MaNhom=?';
		const deleteGroup = `delete from tb_nhom_khach_hang where MaNhom=?`;
		await poolAwait.query(deleteConditions,id);
		await poolAwait.query(deleteGroup,id);
		res({
			status: 0,
			msg: error
		});
		return;
	}
}
module.exports = Group;