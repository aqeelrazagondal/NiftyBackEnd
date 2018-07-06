let acl = require("acl");
let recordPermissions = require("../acl/addPermissions");

//Using the memory backend
acl = new acl(new acl.memoryBackend());

//function to assign a role to the user
let assignRole = function(user, role) {
  acl.addUserRoles(user, role);
};

//function to add permissions
let addPermissions = function(role, resource, action) {
  acl.allow(role, resource, action);
};

//Function to get ACL in other modules
let getACL = function() {
  return acl;
};

module.exports = {
  assignRole,
  addPermissions,
  getACL
};
