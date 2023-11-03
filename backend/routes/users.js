const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const multer = require("multer");

router.get(
  "/api/usersbyid/:userId",
  usersController.checkUserIdMiddleware,
  usersController.getUserById
);
// UPLOAD USER IMG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/uploaduserprofileimg",
  upload.single("file"),
  usersController.uploadUserImg
);

router.put("/updateuserprofileimg", usersController.upDateUserImg);

router.delete("/deleteuser", usersController.deleteUserById);

module.exports = router;
