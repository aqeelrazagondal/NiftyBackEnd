const path = require("path");
const fs = require("fs");

const model = require("../../../models/user/backend/userImage");

//Handler to handle the route for uploading a image
let saveUserImage = function(req, res) {
  let imageName; //File name
  let imagePath; //Image path at server to remove it when image is updated
  //If the file is included in the request
  //Check whether file is provied or not in body
  if (req.file === undefined) {
    return res.status(500).json({
      response: false,
      message: "please provide the image with name 'avatar'"
    });
  }

  model.userExists(req.params.userId, function(err, userExistsResponse) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "not able to process query at userExists in saveuserimage"
      });
    }
    if (userExistsResponse.length) {
        imageName = req.file.filename; //Image name to store in database
        //Find if there is user already has upload the image and want to update it
        model.findImage(req.params.userId, function(err, response) {
          if (err) {
            return res.status(500).json({
              response: false,
              message: "not able to proccess query at findImage"
            });
          }
          if (!response.length) {
            //Directly save the name of the image in the database
            model.saveUserImage(imageName, req.params.userId, function(
              err,
              userImageResponse
            ) {
              if (err) {
                return res.status(500).json({
                  response: false,
                  message: "not able to proccess query at saveUserImage"
                });
              }
              if (userImageResponse.affectedRows) {
                return res.status(200).json({
                  response: true,
                  message: "Imgae uploaded successfully"
                });
              } else {
                return res.status(500).json({
                  response: false,
                  message: "failed to upload user image"
                });
              }
            });
          } else if (response[0].imagename !== "") {
            //Image path on server
            imagePath = path.join(
              rootPath,
              `/public/images/${response[0].imagename}`
            );
            //Remove the file from the server
            fs.unlink(imagePath, function(err, fsResponse) {
              if (err) {
                return res.status(442).json({
                  response: false,
                  message: "Not able to remove already uploaded image from server"
                });
              } else {
                //Update the name of the image in the database
                model.saveUserImage(imageName, req.params.userId, function(
                  err,
                  saveUserImageResponse
                ) {
                  if (err) {
                    return res.status(500).json({
                      response: false,
                      message: "Not able to proccess query at saveUserImage"
                    });
                  }
                  if(saveUserImageResponse.affectedRows) {
                    return res.status(200).json({
                        response: true,
                        message: "User image uploaded successfully"
                      });
                  }
                  return res.status(500).json({
                    response: false,
                    message: "not able to upload user image"
                  });
                });
              }
            });
          }
        });
    } else {
        return res.status(404).json({
            response: false,
            message: "User not found with userId: " + req.params.userId
          });
    }
  });
};

module.exports = {
  saveUserImage
};
