const usersRouter = require('./users');
const productsRouter = require('./products');
const authRouter = require('./authentication');
function route(app){
    app.use('/users', usersRouter);
    app.use('/products', productsRouter);
    app.use('/auth', authRouter);
}
module.exports = route;
