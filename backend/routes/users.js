const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/api/usersbyid/:userId", usersController.getUserById);

module.exports = router;
