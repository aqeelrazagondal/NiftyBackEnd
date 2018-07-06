var acl = require("acl");
var mongodb = require("../config/mongodb.config");
var exportACL;

mongodb(function(err, db) {
  if (err) return console.log("not able to connect the database" + err);
  acl = new acl(new acl.mongodbBackend(db, "acl_"));
  exportACL = acl;
});

//function to assign a role to the user
let assignRole = function(user, role) {
  exportACL.addUserRoles(user, role);
};

//Function to add permissions
let addPermissions = function(role, resource, action) {
  exportACL.allow(role, resource, action);
}

//Function to get ACL instance in other modules
let getACL = function() {
  return exportACL
}

module.exports = {
  assignRole,
  addPermissions,
  getACL
};
