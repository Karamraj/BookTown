require('dotenv').config();
const booksModel = require('../models/booksModel');


export async function exploreBooks(pageSize, offset) {
    
    return await booksModel.find().skip(offset).limit(pageSize);

}

export async function booksByCategory(pageSize, offset, category) {
    
    return await booksModel.find({categories : category}).skip(offset).limit(pageSize);

}

export async function addBook(title, desc, image, rating, price,category) {
    try {
        const create = await booksModel.create({title: title, description: desc, 
            coverImage: image, rating: rating, price: price, categories: category})
        console.log(create);
        return create;

    }
    catch(err) {
        console.log(err);
        return err;
    }

}