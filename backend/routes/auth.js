const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/register");
router.post("/login");
router.post("/logout");

module.exports = router;
