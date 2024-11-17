const {deleteUserDetails,modifyUserDetails}=require("../controller/user")

module.exports = (router) => {
    router.post('/modifyUser',modifyUserDetails );
    router.delete("/deleteUser",deleteUserDetails)
  };