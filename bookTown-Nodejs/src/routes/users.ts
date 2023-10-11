import express from 'express';
const controller = require('../controller/usersController');
const router = express.Router();

var endPoint = '/users';

export function getRouter() {
    return router;
}

router.post("/login", async (req, res) => {
    controller.loginUser(req, res);
})


router.post("/signup", async (req, res) => {
    controller.signUpUser(req, res);
})
