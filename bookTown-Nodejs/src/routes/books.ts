import express from 'express';
const router = express.Router();
const controller = require('../controller/booksController');
const catController = require('../controller/categoriesController');
var endPoint = '/books';

export function getRouter() {
    return router;
}

router.get(endPoint+"/explore-books", async (req, res) => {
    controller.exploreBooks(req, res)
})

router.get(endPoint+"/books-by-category", async (req, res) => {
    controller.booksByCategory(req, res)
})

router.get(endPoint+"/categories", async (req, res) => {
    catController.categoriesList(req, res)
})

router.post(endPoint+"/add-book", async (req, res) => {
    controller.addBook(req, res)
})

router.post(endPoint+"/add-category", async (req, res) => {
    catController.addCategory(req, res)
})