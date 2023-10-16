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


router.post("/profile", async (req, res) => {
    controller.userProfile(req, res);
})


router.post("/update-phone", async (req, res) => {
    controller.updatePhone(req, res);
})


router.post("/update-address", async (req, res) => {
    controller.updateAddress(req, res);
})

router.post("/forgot-password", async (req, res) => {
    controller.forgotPassword(req, res);
})

router.post("/verify-otp", async (req, res) => {
    controller.verifyOTP(req, res);
})

router.post("/reset-password", async (req, res) => {
    controller.resetPassword(req, res);
})