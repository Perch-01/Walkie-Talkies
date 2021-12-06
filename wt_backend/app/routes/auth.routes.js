const express = require('express');
const { authMiddleware } = require("../middleware")
const { authController } = require("../controller");

const router = express.Router();

router.post("/signUp", [authMiddleware.checkDuplicateUsernameOrEmail], authController.signUp);
router.post("/signIn", authController.signIn);
router.get("/checkIfTokenIsValid", authController.checkIfTokenIsValid);

module.exports = router;