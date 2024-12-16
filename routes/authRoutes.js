const express = require("express");
const { signIn, register } = require("../controllers/authController");
const router = express.Router();

router.post("/SignIn", signIn);
router.post("/Register", register);

module.exports = router;
