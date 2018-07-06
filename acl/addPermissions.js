let acl = require("./aclInMongoDB");
//function to add permissions
let permissionsList = [
  //////////////////ADMIN ROUTES Permissions
  {
    role: ["admin"],
    resource: [
      "/admin/addcommission",
      "/admin/updatecommission/:commissionId",
      "/product/addproductcategory"
    ],
    action: "*"
  },
  ////////////////////Single Vendor Routes Permissions///////////////////
  ///////Cutomer Related Routes Permissions
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/logout",
    action: "POST"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/update/:userId",
    action: "PUT"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/updateuserstatus/:userId",
    action: "PATCH"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/updatepassword/:userId",
    action: "PATCH"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/updatepassword/:userId",
    action: "PATCH"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/uploaduseriamge/:userId",
    action: "POST"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/addshippingaddress/:userId",
    action: "POST"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/shippingaddresses/:userId",
    action: "GET"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/updateshippingaddress/:addressId",
    action: "PUT"
  },
  {
    role: ["customer", "admin"],
    resource: "/singlecustomer/removeshippingaddress/:addressId",
    action: "DELETE"
  },
  //////////////Vendor Related Routes Permissions///////////
  {
    role: ["vendor", "admin"],
    resource: "/signlevendor/logout",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/:userId",
    action: "PUT"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/update/:userId",
    action: "PUT"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/updateuserstatus/:userId",
    action: "PATCH"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/updatepassword/:userId",
    action: "PATCH"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/uploaduseriamge/:userId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/addshippingaddress/:userId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/shippingaddresses/:userId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/updateshippingaddress/:addressId",
    action: "PUT"
  },
  {
    role: ["vendor", "admin"],
    resource: "/singlevendor/removeshippingaddress/:addressId",
    action: "DELETE"
  },
  ////////////////////MULTI VENDOR AND SINGLE VENDOR Routes Permissions///////////////////////
  ////////////Vendor Related Routes/////////////////////
  /////Shop Module's permissions
  {
    role: ["customer", "admin"],
    resource: "/shop/favourite",
    action: ["POST"]
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/veiws/:shopId",
    action: ["GET"]
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/shopavailable",
    action: ["GET"]
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/shippingdetails/:shopId",
    action: ["PATCH"]
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/additionalcost/:shopId",
    action: ["POST"]
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/updateshoppreference/:shopId",
    action: ["PUT"]
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/shoppreference/:userId",
    action: ["POST"]
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/shopdetails/:shopId",
    action: "PUT"
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/update/shopstatus/:shopId",
    action: "PATCH"
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/paymentmethod/:shopId",
    action: ["POST", "GET"]
  },
  {
    role: ["vendor", "admin"],
    resource: "/shop/paymentmethod/:paymentMethodId",
    action: ["DELETE"]
  },
  ////Invoice permissions
  {
    role: ["vendor", "admin"],
    resource: "/invoice/single/:invoiceNumber",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/invoice/all/:shopId",
    action: "GET"
  },
  ////Dashboard Permissions
  {
    role: ["vendor", "admin"],
    resource: "/dashboard/vendor/orderdetails/:shopId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/dashboard/vendor/sales/:shopId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/dashboard/vendor/ordercount/:shopId",
    action: "GET"
  },
  ////Product module's permissions
  {
    role: ["admin"],
    resource: "/product/variationoption/:variationId",
    action: "POST"
  },
  {
    role: ["admin"],
    resource: "/product/newvariations",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/view",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/popular/:shopId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/popular",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/all/:shopId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/variations/:productId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/updateproduct/:productId",
    action: "PUT"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/add",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/uploadImage/:productId",
    action: "POST"
  },
  {
    role: ["customer", "admin"],
    resource: "/product/favourite",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/product/updateproductstatus/:productId",
    action: "PATCH"
  },
  ////User module's permissions
  {
    role: ["customer", "admin", "vendor"],
    resource: ["/users/add/profile/:userId"],
    action: "PUT"
  },
  {
    role: ["customer", "admin"],
    resource: ["/users/purchase/:orderId"],
    action: "GET"
  },
  {
    role: ["customer", "admin"],
    resource: ["/users/purchases/:userId"],
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: ["/users/:userId"],
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/updateemail/:userId",
    action: "PATCH"
  },
  {
    role: ["customer", "admin"],
    resource: "/users/addshippingaddress/:userId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/updatepassword/:userId",
    action: "PATCH"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/updateshippingaddress/:addressId",
    action: "PUT"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/shippingaddresses/:userId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/removeshippingaddress/:addressId",
    action: "DELETE"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/resetpassword/:userId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/updateuserstatus/:userId",
    action: "PATCH"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/:userId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/login",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/uploaduseriamge/:userId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/forgotpassword",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/resendverificationemail",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/register",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/update/:userId",
    action: "PUT"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/logout",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/users/logout",
    action: "POST"
  },
  /////////Order module's related routes
  {
    role: ["vendor", "admin"],
    resource: "/order/single/:orderId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/order/all/:shopId",
    action: "GET"
  },
  {
    role: ["vendor", "admin"],
    resource: "/order/add/:userId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/order/addorderdetails/:orderId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/order/updatedeliverystatus/:orderId",
    action: "PATCH"
  },
  ////Commission Module's related permissions
  {
    role: ["vendor", "admin"],
    resource: "/vendor/addcommissionrecord/:vendorId",
    action: "POST"
  },
  {
    role: ["vendor", "admin"],
    resource: "/vendor/commissionrecords/:vendorId",
    action: "GET"
  },
  ///////Review module's related permissions//////////
  {
    role: ["customer", "admin"],
    resource: "/review/updatestatus/:reviewId",
    action: "PATCH"
  },
  {
    role: ["customer", "admin"],
    resource: "/review/:productId",
    action: "POST"
  },
  {
    role: ["customer"],
    resource: "/review/:reviewId",
    action: "GET"
  },
  {
    role: ["customer", "admin"],
    resource: "/review/all/:productId",
    action: "GET"
  },
  {
    role: ["customer", "admin"],
    resource: "/review/update/:reviewId",
    action: "PUT"
  },

];

let addPermissions = function () {
  permissionsList.forEach(element => {
    acl.addPermissions(element.role, element.resource, element.action);
  });
};

module.exports = {
  addPermissions
};
