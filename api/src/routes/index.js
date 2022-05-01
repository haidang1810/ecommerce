const usersRouter = require('./users');
const authRouter = require('./authentication');
const productsRouter = require('./products');
const categoriesRouter = require('./Categories');
function route(app){
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
    app.use('/products', productsRouter);
    app.use('/categories', categoriesRouter);
}
module.exports = route;
