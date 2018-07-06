const model = require("../../../models/user/backend/logout");

//Handler to handle the logut route
let logout = function (req, res) {
  return res.status(200).json({
    response: true,
    auth: false,
    token: null,
    message: "User logged out successfully"
  });
};

module.exports = {
  logout,
};
