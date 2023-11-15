const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const upload = require("../util/multer");

router.get(
  "/api/usersbyid/:userId",
  usersController.checkUserIdMiddleware,
  usersController.getUserById
);

router.post(
  "/uploaduserprofileimg",
  upload.single("file"),
  usersController.uploadUserImg
);

router.put("/updateuserprofileimg", usersController.upDateUserImg);

router.delete("/deleteuser", usersController.deleteUserById);

module.exports = router;
