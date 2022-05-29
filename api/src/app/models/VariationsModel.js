const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');

const Variation = function (variation) {
    this.MaPL = variation.MaPL;
    this.TenPL = variation.TenPL;
}

Variation.getByProduct = async (req, res) => {
	let id = req.params.id;
	const getModify = `select MaPL, TenPL, TrangThai from tb_phan_loai
		where MaSP=? and TrangThai=1`;
	try {
		let [variations, fields] = await poolAwait.query(getModify,id);
		const getOption = `select Id, TenLC, TrangThai from tb_lua_chon
			where MaPL=?`;
		if(variations.length>0){
			for(let i=0; i<variations.length;i++){
				let [options, fields] = await poolAwait.query(getOption,variations[i].MaPL);
				if(options.length>0)
				variations[i].LuaChon = options;
			}
		}else{
			variations[i].LuaChon = [];
		}
		res({
			status: 1,
			msg: 'success!!!',
			data: variations
		});
		return;
	} catch (err) {
		res({
			status: 0,
			msg: err
		});
		return;
	}
}
Variation.add = (req, res) => {
	let productID = req.body.MaSP;
	let name = req.body.TenPL;
	const addVariation = `insert into tb_phan_loai(MaSP, TenPL, TrangThai)
		values(?,?,1)`;
	pool.query(addVariation, [productID,name],(err, result)=>{
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
			id: result.insertId
		});
		return;
	})
}
Variation.delete = async (req, res) => {
	const id = req.body.id;
	const updateVariation = `update tb_phan_loai set TrangThai=0 where MaPL=?`;
	try {
		await poolAwait.query(updateVariation, [id]);
		res({
			status: 1,
			msg: 'success',
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
Variation.addOption = (req, res) => {
	const variationID = req.body.MaPL;
	const name = req.body.TenLC;
	const addOpt = `insert into tb_lua_chon(MaPL, TenLC, TrangThai)
		values(?,?,1)`;
	pool.query(addOpt, [variationID,name],(err, result)=>{
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
			id: result.insertId
		});
		return;
	})
}
Variation.changeStatusOption = async (req, res) => {
	const id = req.body.id;
	const status = req.body.TrangThai;
	const updateOpt = `update tb_lua_chon set TrangThai=? where Id=?`;
	try {
		await poolAwait.query(updateOpt, [status,id]);
		res({
			status: 1,
			msg: 'success',
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
Variation.deleteOption = async (req, res) => {
	const id = req.body.id;
	const updateOpt = `delete from tb_lua_chon where Id=?`;
	try {
		await poolAwait.query(updateOpt, [id]);
		res({
			status: 1,
			msg: 'success',
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
module.exports = Variation;