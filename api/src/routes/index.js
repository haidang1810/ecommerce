const usersRouter = require('./users');
const authRouter = require('./authentication');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const ratingsRouter = require('./ratings');
const imagesRouter = require('./images');
const addressesRouter = require('./addresses');
const cartsRouter = require('./carts');
const notificationsRouter = require('./notifications');
const customersRouter = require('./customers');
const ordersRouter = require('./orders');
const groupsRouter = require('./groups');
function route(app){
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
    app.use('/products', productsRouter);
    app.use('/categories', categoriesRouter);
    app.use('/ratings', ratingsRouter);
    app.use('/images', imagesRouter);
    app.use('/addresses', addressesRouter);
    app.use('/carts', cartsRouter);
    app.use('/notifications', notificationsRouter);
    app.use('/customers', customersRouter);
    app.use('/orders', ordersRouter);
    app.use('/groups', groupsRouter);
}
module.exports = route;
