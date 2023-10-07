require('dotenv').config()
import mongoose from "mongoose";

export function initDatabase() {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        const uri : any = process.env.MONGODB_URI
        mongoose.connect(
            uri);
        console.log("Database connection established!")
    }
    catch (error) {
        console.log(error);
    }
}

