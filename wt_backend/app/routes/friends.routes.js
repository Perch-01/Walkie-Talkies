const express = require('express');
const { authJWTMiddleware } = require("../middleware")
const { friendsController } = require("../controller");

const router = express.Router();

router.get("/search", [authJWTMiddleware.verifyToken], friendsController.searchFriends);
router.post("/sendFriendRequest", [authJWTMiddleware.verifyToken], friendsController.sendFriendRequest);
router.post("/acceptOrDeclineFriendRequest", [authJWTMiddleware.verifyToken], friendsController.acceptOrDeclineFriendRequest);
router.get("/getFriendRequests", [authJWTMiddleware.verifyToken], friendsController.getFriendRequests);
router.get("/listOfFriends", [authJWTMiddleware.verifyToken], friendsController.listOfFriends);

module.exports = router;