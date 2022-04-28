
class AuthenticationController {
    index(req,res){
        res.send('user api');
    }
}
module.exports = new AuthenticationController();
