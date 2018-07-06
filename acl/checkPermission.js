//Function to check the permissions on a paritcular resource
//Function will be used to check on a paritcular resource or could also be used for a simple function
const model = require("../models/acl/checkPermission");
const acl = require("./aclInMongoDB");
const decode = require('jwt-decode')

let checkPermission = function (resource, action) {
  return function (req, res, next) {
    //Token from request
    let token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    let userId;
    let decoded;
    let aclObject = acl.getACL();
    if (!token) {
      return res.status(422).json({
        response: false,
        message: "token not provided"
      });
    }

    decoded = decode(token);
    userId = decoded.userId

    // Just for development purpose, will be removed after development
    aclObject.hasRole(userId, 'customer', function (err, hasRole) {
      if (hasRole) {
        console.log('User have customer role');
      } else {
        //Check and log if user is a vendor
        aclObject.hasRole(userId, 'vendor', function (err, hasRole) {
          if (hasRole) {
            console.log('User have vendor role');
          } else {
            //Check and log if user is an admin
            aclObject.hasRole(userId, 'admin', function (err, hasRole) {
              if (hasRole) {
                console.log('User have admin role');
              } else {
                console.log('User have no role');
              }
            });
          }
        });
      }
    });

    aclObject.allowedPermissions(userId, resource, function (err, obj) {
      console.log(userId + ' have following perimissions on the resource');
      console.log(obj);
    });

    console.log(userId, resource, action);

    aclObject.isAllowed(userId, resource, action, function (
      err,
      permission
    ) {
      if (err) {
        return res.status(403).json({
          response: false,
          message: "Error occured at proccessing permissions check" + err
        });
      }
      if (permission) {
        console.log(`User with Id: ${userId} has permission on the resrouce: ${resource} to do a ${action} request.`);
        next();
      } else {
        return res.status(403).json({
          response: false,
          message: "access denied"
        });
      }
    });

  };
};

module.exports = {
  checkPermission
};
