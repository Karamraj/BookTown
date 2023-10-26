import express from 'express';
const controller = require('../controller/cartController');
const router = express.Router();

var endPoint = '/cart';

export function getRouter() {
    return router;
}

router.post(endPoint+"/", async (req, res) => {
    controller.getCart(req, res);
})

router.post(endPoint+"/add-product", async (req, res) => {
    controller.addToCart(req, res);
})

router.delete(endPoint+"/clear", async (req, res) => {
    controller.clearCart(req, res);
})

router.delete(endPoint+"/remove-product", async (req, res) => {
    controller.removeFromCart(req, res);
})
