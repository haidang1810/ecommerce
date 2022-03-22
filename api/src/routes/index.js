const usersRouter = require('./users');
const productsRouter = require('./products');
function route(app){
    app.get('/users', usersRouter);
    app.get('/products', productsRouter);
}
module.exports = route;
