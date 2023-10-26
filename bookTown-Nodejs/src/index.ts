require('dotenv').config()
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import * as banners from './routes/banners';
import * as books from './routes/books';
import * as carts from './routes/carts';
import * as users from './routes/users';
const dbClient = require('./database/dbHelper');
const PORT = process.env.PORT || 3000;
const app= express();

app.use(cors({
    credentials:true,
}));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use('/v1',books.getRouter());
app.use('/v1',users.getRouter());
app.use('/v1',banners.getRouter());
app.use('/v1',carts.getRouter());

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
    dbClient.initDatabase();
});


app.get('/v1/', (req, res) => {
    res.status(200).send({"message":"Welcome to BookTown, your server is setup successfully."});
})