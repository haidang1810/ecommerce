const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;


const Notification = new Schema({
    user: {type: String},
	name: {type: String},
	image: {type: String},
	description: {type: String},
	time: {type: String},
});

module.exports = mongoose.model('Notification', Notification);