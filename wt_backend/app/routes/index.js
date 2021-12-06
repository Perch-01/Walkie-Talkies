const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const friendsRoute = require('./friends.routes');
const chatRoute = require('./chat.routes');

const router = express.Router();
const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/user',
        route: userRoute,
    },
    {
        path: '/friends',
        route: friendsRoute,
    },
    {
        path: '/chat',
        route: chatRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;