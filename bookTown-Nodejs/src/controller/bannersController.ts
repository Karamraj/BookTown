const bannersHelper = require('../database/bannersRepo');


export async function getBanners(req, res) {
    try {
    const pageSize = req.query.pageSize ? req.query.pageSize : 20;
    const page = req.query.page ? req.query.page : 1;
    const offSet = pageSize * page - pageSize;

    const banners = await bannersHelper.getBanners(pageSize, offSet);

    if(banners.length > 0) {
        res.status(200).json({"flag": true, "message":"All banners", "result" : banners})
    }
    else {
        res.status(404).json({"flag": false, "message":"No banners"})
    }
    }
    catch(err) {
        res.status(403).json({"flag":false, "message":err.message});
    }
}



export async function addBanner(req, res) {
    try {
    const title = req.body.title;
    const desc = req.body.description;
    const image = req.body.coverImage;

    const books = await bannersHelper.addBanner(title, desc, image)

    if(books._id) {
        res.status(201).json({"flag": true, "message":"Banner added", "result" : books})
    }
    else {
        res.status(404).json({"flag": false, "message":"Failed to add banner, check that you're sending right and all body paramteres"})
    }
    }
    catch(err) {
        res.status(403).json({"flag":false, "message":err.message});
    }
}