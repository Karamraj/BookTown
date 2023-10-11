const catModel = require('../models/categoriesModel');

export async function categoriesList(pageSize, offset) {
    
    return await catModel.find().skip(offset).limit(pageSize);

}

export async function addCategory(name) {
    try {
        const create = await catModel.create({ categoryName: name })
        console.log(create);
        return create;

    }
    catch(err) {
        console.log(err);
        return err;
    }

}