const pool = require('../config/connectDB');
const poolAwait = require('../config/connectDBAwait');

const Variation = function (variation) {
    this.MaPL = variation.MaPL;
    this.TenPL = variation.TenPL;
}

Variation.getByProduct = async (req, res) => {
	let id = req.params.id;
	const getModify = `select MaPL, TenPL from tb_phan_loai
		where MaSP=?`;
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


module.exports = Variation;