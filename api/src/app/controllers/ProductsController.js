
class ProductsController {
    index(req,res){
        res.send('user products');
    }
}
module.exports = new ProductsController();
