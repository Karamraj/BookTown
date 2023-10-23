const banners = require('../models/bannersModel');

export async function getBanners(pageSize, offset) {
    
    return await banners.find().skip(offset).limit(pageSize);

}


export async function addBanner(title, desc, image) {
    try {
        const create = await banners.create({bannerImage: image, bannerHeading: title, bannerDescription: desc})
        console.log(create);
        return create;

    }
    catch(err) {
        console.log(err);
        return err;
    }

}