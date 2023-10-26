const cartModel = require('../models/cartModel');


export async function getCart(userId: String) {
    
    return await cartModel.findOne({userId : userId});

}

export async function createCart(userId: String, bookItem: any) {
    try {
        const book = {
            bookId: bookItem._id,
            quantity:1
        }
        const create = await cartModel.create({userId : userId, totalPrice: bookItem.price, items : [book] });

        if(create._id) {
            return create;
        }
        else {
            return "Error creating cart"
        }
    }
    catch(err) {
        console.log(err);
        return err;
    }


}

export async function addExistingProductToCart(userId: String, bookItem, position, quantity) {
    try {
        const create = await cartModel.updateOne({userId : userId, 'items.bookId' : bookItem._id } 
        , { $inc : { 'items.$.quantity' : quantity} });

         return create;
    }
    catch(err) {
        console.log(err);
        return err;
    }


}

export async function addNewProductToCart(userId: String, bookItem) {

    try {
            
        const book = {
                bookId: bookItem._id,
                quantity:1
            }

        const create = await cartModel.updateOne({userId : userId } , { $push : { 'items' : book }} );
    }
    catch(err) {
        console.log(err);
        return err;
    }


}

export async function removeExistingProductFromCart(userId: String, bookItem) {

    try {
        const delete_ = await cartModel.updateOne({userId : userId } , { $pull : {   
            'items': { bookId: bookItem._id}}} );
        console.log(delete_);
        return delete_;
    }
    catch(err) {
        console.log(err);
        return err;
    }


}

export async function clearCart(userId: String) {
    
    return await cartModel.deleteMany({userId : userId});

}