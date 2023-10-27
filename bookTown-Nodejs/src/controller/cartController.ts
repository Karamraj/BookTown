import * as bookRepo from '../database/booksRepo';
import * as cartRepo from '../database/cartRepo';
import * as userRepo from '../database/usersRepo';

export async function getCart(req, res) {
    try {
        const token = req.headers.authorization;
        const getUser : any = await userRepo.userProfile(token.replace("Bearer ",""));

        if(getUser._id) {
            const cart = await cartRepo.getCart(getUser._id);
            if(cart!=null) {
                const items = []
                for(var i=0; i<cart.items.length; i++) {
                    var singleItem = {};
                    singleItem['quantity'] = cart.items[i].quantity;
                    singleItem['bookId'] = cart.items[i].bookId;
                    const bookItem = await bookRepo.booksById(cart.items[i].bookId);
                    if(bookItem._id) { 
                        singleItem['price'] = bookItem.price;
                    }

                    items.push(singleItem);
                }
                res.status(200).send({"flag":true, "message": "Cart found", "result": items});
            }
            else {
                res.status(404).send({"flag":false, "message": "No cart found"});
            }
        }
        else {
            res.status(401).send(getUser);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}

export async function removeFromCart(req, res) {
    try {
        const token = req.headers.authorization;
        const bookId : any = req.body.bookId;
        const getUser : any = await userRepo.userProfile(token.replace("Bearer ",""));

        if(getUser._id) {

            const bookItem = await bookRepo.booksById(bookId);
            if(bookItem._id) { 

            const cart = await cartRepo.getCart(getUser._id);
            if(cart != null) {
                const items = cart.items;
                for(var i = 0 ; i < items.length; i++) {

                    if(items[i].bookId === bookId) {

                        if(items[i].quantity > 1) {
                        await cartRepo.addExistingProductToCart(getUser._id, bookItem, i, -1);
                        res.status(200).send({"flag" :true, "message":"Product removed successfully"}); 
                        break;
                    }
                    else {
                        await cartRepo.removeExistingProductFromCart(getUser._id, bookItem);
                        const reCart = await cartRepo.getCart(getUser._id);

                        if(reCart.items.length < 1) { 
                            await cartRepo.clearCart(getUser._id);
                        }
                        res.status(200).send({"flag" :true, "message":"Product removed successfully"}); 
                        break;
                    }
                }
                else {
                    res.status(404).send({"flag" :true, "message":"Product doesn't exist in cart"}); 
                }
                }
            }
            else {
             
                res.status(404).send({"flag" :true, "message":"Cart doesn't exist"}); 
            }
        }
        else {
            res.status(404).send({"flag":false, "message":"This book doesn't exist, check the book Id"});
        }
        }
        else {
            res.status(401).send(getUser);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}

export async function addToCart(req, res) {
    try {
        const token = req.headers.authorization;
        const bookId : any = req.body.bookId;
        const getUser : any = await userRepo.userProfile(token.replace("Bearer ",""));

        if(getUser._id) {

            const bookItem = await bookRepo.booksById(bookId);
            if(bookItem._id) { 

            const cart = await cartRepo.getCart(getUser._id);
            if(cart != null) {

                const items = cart.items;
                var itemExists = false;

                for(var i = 0 ; i < items.length; i++) {

                    if(items[i].bookId === bookId) {
                         await cartRepo.addExistingProductToCart(getUser._id, bookItem, i, 1);
                        itemExists = true;
                        res.status(200).send({"flag" :true, "message":"Product added successfully"}); 
                        break;
                    }
                    else {
                        itemExists = false;
                    }
                }

                if(!itemExists) {
                    await cartRepo.addNewProductToCart(getUser._id, bookItem);
                    res.status(200).send({"flag" :true, "message":"Product added successfully"}); 
                }
            }
            else {
                const addProduct = await cartRepo.createCart(getUser._id,bookItem);
                if(addProduct._id) {
                    res.status(200).send({"flag" :true, "message":"Product added successfully"}); 
                }
            }
        }
        else {
            res.status(404).send({"flag":false, "message":"This book doesn't exist, check the book Id"});
        }
        }
        else {
            res.status(401).send(getUser);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}

export async function clearCart(req, res) {
    try {
        const token = req.headers.authorization;
        const getUser : any = await userRepo.userProfile(token.replace("Bearer ",""));

        if(getUser._id) {
            const deleteCart = await cartRepo.clearCart(getUser._id);

            if(deleteCart.deletedCount > 0) {
                res.status(200).send({"flag": true, "message": "Cart cleared successfully"});
            }
            else {
                res.status(404).send({"flag": true, "message": "Cart is already empty"});
            }
        }
        
        else {
            res.status(401).send(getUser);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}
