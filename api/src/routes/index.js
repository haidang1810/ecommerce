const usersRouter = require('./users');
const authRouter = require('./authentication');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const ratingsRouter = require('./ratings');
function route(app){
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
    app.use('/products', productsRouter);
    app.use('/categories', categoriesRouter);
    app.use('/ratings', ratingsRouter);
}
module.exports = route;
