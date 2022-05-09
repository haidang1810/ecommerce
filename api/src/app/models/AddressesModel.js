const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const Address = new Schema({
    address: {type: String},
	customer: {type: String},
    province: {
		id: {type: Number},
		name: {type: String}
	},
    district: {
		id: {type: Number},
		name: {type: String}
	},
    ward: {
		id: {type: Number},
		name: {type: String}
	}
});

module.exports = mongoose.model('Address', Address);