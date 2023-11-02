const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/api/register", authController.register);
router.post("/api/login", authController.login);
router.post("/api/logout");

module.exports = router;
