const booksHelper = require('../database/booksRepo');

export async function exploreBooks(req, res) {
    try {
    const pageSize = req.query.pageSize ? req.query.pageSize : 20;
    const page = req.query.page ? req.query.page : 1;
    const offSet = pageSize * page - pageSize;

    const books = await booksHelper.exploreBooks(pageSize, offSet);

    if(books.length > 0) {
        res.status(200).json({"flag": true, "message":"All books", "result" : books})
    }
    else {
        res.status(404).json({"flag": false, "message":"No books"})
    }
    }
    catch(err) {
        res.status(403).json({"flag":false, "message":err.message});
    }
}

export async function booksByCategory(req, res) {
    try {
    const pageSize = req.query.pageSize ? req.query.pageSize : 20;
    const page = req.query.page ? req.query.page : 1;
    const offSet = pageSize * page - pageSize;
    const category = req.query.categoryId;

    const books = await booksHelper.booksByCategory(pageSize, offSet, category);

    if(books.length > 0) {
        res.status(200).json({"flag": true, "message":"All books", "result" : books})
    }
    else {
        res.status(404).json({"flag": false, "message":"No books"})
    }
    }
    catch(err) {
        res.status(403).json({"flag":false, "message":err.message});
    }
}


export async function addBook(req, res) {
    try {
    const title = req.body.title;
    const desc = req.body.description;
    const image = req.body.coverImage;
    const rating = req.body.rating;
    const price = req.body.price;
    const categories = JSON.parse(req.body.categories);

    const books = await booksHelper.addBook(title, desc, image, rating, price,categories)

    if(books._id) {
        res.status(201).json({"flag": true, "message":"Book added", "result" : books})
    }
    else {
        res.status(404).json({"flag": false, "message":"Failed to add book, check that you're sending right and all body paramteres"})
    }
    }
    catch(err) {
        res.status(403).json({"flag":false, "message":err.message});
    }
}

