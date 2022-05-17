const mongoose = require('mongoose');
async function connect(){
    try {
        //const mongo_uri = 'mongodb+srv://danghuynh:dang1810@cluster0.meq5z.mongodb.net/gamecaro?retryWrites=true&w=majority';
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connect success!!!");
    } catch (error) {
        console.log("connect fail!!! ",error);
    }
}

module.exports = { connect };