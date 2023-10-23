import express from 'express';
const controller = require('../controller/usersController');
const router = express.Router();

var endPoint = '/cart';

export function getRouter() {
    return router;
}

router.post("/", async (req, res) => {
    controller.getCart(req, res);
})