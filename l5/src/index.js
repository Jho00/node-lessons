import express from 'express';

const bodyParser = require('body-parser');

import orderRouter from "./controllers/OrderController";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/order", orderRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27030/pretest', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});

