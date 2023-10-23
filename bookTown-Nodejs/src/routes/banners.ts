import express from 'express';
import * as controller from '../controller/bannersController';
const router = express.Router();

var endPoint = '/banners';

export function getRouter() {
    return router;
}

router.get(endPoint+"/", async (req, res) => {
    controller.getBanners(req, res);
})

router.post(endPoint+"/add", async (req, res) => {
    controller.addBanner(req, res);
})