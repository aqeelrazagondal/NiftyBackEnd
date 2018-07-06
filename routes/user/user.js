// Frontend routes
const frontUserRouter = require('./frontend/user');
const loginRouter = require('./frontend/login');
const registerRouter = require('./frontend/register');
const registerAdminRouter = require('./frontend/registerAdmin');
const passportRouter = require('./frontend/passport');
const backPurchasesRoute = require('./backend/purchases');

//Backend routes
const backUserRouter = require('./backend/user');
const userImageRouter = require('./backend/userImage');
const userShippingAddress = require('./backend/userShippingAddress');
const logoutRouter = require('./backend/logout');


module.exports = {
    backUserRouter,
    userImageRouter,
    userShippingAddress,
    frontUserRouter,
    loginRouter,
    registerRouter,
    logoutRouter,
    registerAdminRouter,
    passportRouter,
    backPurchasesRoute
}