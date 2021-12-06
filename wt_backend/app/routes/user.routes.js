const express = require('express');
const { authJWTMiddleware } = require("../middleware")
const { userController } = require("../controller");

const router = express.Router();

router.get("/user", [authJWTMiddleware.verifyToken], userController.userBoard);

module.exports = router;