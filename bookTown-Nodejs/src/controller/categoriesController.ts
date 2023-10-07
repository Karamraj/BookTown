const helper = require('../database/categoriesHelper');

export async function categoriesList(req, res) {
    try {
    const pageSize = req.query.pageSize ? req.query.pageSize : 20;
    const page = req.query.page ? req.query.page : 1;
    const offSet = pageSize * page - pageSize;

    const categories = await helper.categoriesList(pageSize, offSet);

    if(categories.length > 0) {
        res.status(200).send({"flag": true, "message":"All categories", "result" : categories})
    }
    else {
        res.status(404).send({"flag": false, "message":"No categories"})
    }
    }
    catch(err) {
        res.status(403).send({"flag":false, "message":err.message});
    }
}

export async function addCategory(req, res) {
    try {
    const name = req.body.categoryName;

    const cat = await helper.addCategory(name);

    if(cat._id) {
        res.status(200).json({"flag": true, "message":"Category added", "result" : cat})
    }
    else {
        res.status(404).json({"flag": false, "message":"Failed to add category, check that you're sending right and all body paramteres"})
    }
    }
    catch(err) {
        res.status(403).json({"flag":false, "message":err.message});
    }
}