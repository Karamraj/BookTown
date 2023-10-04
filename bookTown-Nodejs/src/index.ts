require('dotenv').config()
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
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
 
app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});

app.get('/', (req, res) => {
    res.status(200).send({"Message":"Welcome to BookTown, your server is setup successfully."});
})