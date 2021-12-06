const express = require('express');
const { authJWTMiddleware } = require("../middleware")
const { chatController } = require("../controller");

const router = express.Router();

router.post("/sendChat", [authJWTMiddleware.verifyToken], chatController.sendChat);
router.get("/getChat", [authJWTMiddleware.verifyToken], chatController.getChat);
router.post("/setChatNumberToZero", [authJWTMiddleware.verifyToken], chatController.setChatNumberToZero);

module.exports = router;