const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");
const passport = require('passport');
const { addPermissions } = require("./acl/addPermissions");

global.rootPath = __dirname;
global.upload = multer({
  dest: "./public/images/",
  //Filter the file type, make server accept images only
  //Image dimensions to be discuessed and added here.
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
      return cb({ message: "Only image type allowed" });
    }
    cb(null, true);
  }
});

//EMAIL VERIFICATION
//Nodemail configurations
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "1995mibrahim@gmail.com",
    pass: "muhammad.ibrahim"
  }
});

global.smtpTransport = smtpTransport;

//All express routes requiring:
var index = require("./routes/index");
var user = require("./routes/user/user");
var product = require("./routes/product/product");
var shop = require("./routes/shop/shop");
var order = require("./routes/order/order");
var commission = require("./routes/commission/commission");
var review = require("./routes/review/review");
var dashboard = require('./routes/dashboard/dashboard');
var invoices = require('./routes/invoices/invoices');
var generalRoutes = require('./routes/general/general');
var paymentRoute = require('./routes/payment/backend/payment');

var app = express();

app.use(function (req, res, next) {
  const requestingOrigin = req.headers.origin;
  const requestingSourceOrigin = req.query.__amp_source_origin;
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Expose-Headers",
    "AMP-Access-Control-Allow-Source-Origin"
  );
  res.setHeader(
    "AMP-Access-Control-Allow-Source-Origin",
    "http://localhost:3000"
  );
  // Pass to next layer of middleware
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require('./handlers/user/frontend/strategies')(passport);

app.use(passport.initialize());
console.log('log: starting express server');
console.log('log: adding permissions');
//Adding permissions in the application
setTimeout(() => {
  addPermissions();
  console.log('log: permissions added successfully');
  console.log('log: Server is now Up and Running');
}, 10000);

app.use("/users", user.registerRouter);
app.use("/users", user.loginRouter);
app.use("/users", user.frontUserRouter);

app.use("/users", user.userImageRouter);
app.use("/users", user.passportRouter);

//Base route
app.use("/", index);
/*Frontend routes are routes that don't need any authentication, 
hence they are put above the ones that need authentication (Backend routes)*/

//////////////Every Frontend Route////////////////

/*Single vendor case routes are those routes to be used if the the server
needs to work only for a single vendor and doesnot need to be multi vendored*/

/////Single Vendor Case Routes//////////////
//////Customer Routes////////////


app.use("/shop", shop.frontShopRouter);

//Payment Routes
app.use("/payment", paymentRoute);

/*Multi Vendor routes are those routes that will be used in case the web server is a for
multi vendor shops*/

//////////////ADMIN ROUTES///////////
app.use('/admin', user.registerAdminRouter);

/**Backend Routes are routes that need authentications*/
//////////////Every Backend Route////////////////

/////Multivendor and Single Vendor Case Routes [Every Other Route]//////////////
//User module's routes
app.use("/users", user.backUserRouter);
app.use("/users", user.userShippingAddress);
app.use("/users", user.logoutRouter);
app.use("/users", user.backPurchasesRoute);

///////////////////General Routes for Single And Multi Vendors////////////////
//Product module's routes
//Frontend routes
app.use("/product", product.frontProduct);
app.use("/product", product.frontendProductCategory);

//Backend routes
app.use("/product", product.backProduct);
app.use("/product", product.backProductCateogory);
app.use("/product", product.backProductImage);

//Shop module's routes
app.use("/shop", shop.backShopRouter);

//Order module's routes
app.use("/order", order.backOrderRouter);

//Commission module's routes
app.use('/admin', commission.backCommissionRouter);
app.use('/vendor', commission.backCommissionRecordRouter);
//Review module's routes
app.use('/review', review.backReviewRouter);

//Dashboard Routes
app.use('/dashboard', dashboard.backendVendorDashboardRoutes);

//Invoice routes
app.use('/invoice', invoices.backInvoiceRoutes);

//General pages routes
app.use('/general', generalRoutes.frontGeneralRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});


// error handler
app.use(function (err, req, res, next) {
  //Making error handler to return a json error response
  if (err.json) {
    return res.json({
      response: err.response,
      message: err.message
    });
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
