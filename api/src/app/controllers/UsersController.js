
class UsersController {
    index(req,res){
        res.send('user api');
    }
}
module.exports = new UsersController();
