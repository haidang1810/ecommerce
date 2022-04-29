const usersRouter = require('./users');
const authRouter = require('./authentication');
function route(app){
    app.use('/user', usersRouter);
    app.use('/auth', authRouter);
}
module.exports = route;
