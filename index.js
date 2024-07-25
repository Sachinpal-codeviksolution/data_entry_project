import express from 'express';
const app = express();
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import routers from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/SuperAdmin')
    .then(() => { console.log("DB connected") })
    .catch((err) => { console.log(err) })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // static path for views
app.use(express.static(path.join(__dirname, 'public'))); // static path for public
app.use(methodOverride('_method')); // method override
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

app.use(routers);


app.listen(8080, () => {
    console.log('server is running on port 8080');
});