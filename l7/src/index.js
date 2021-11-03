import express from 'express';

const bodyParser = require('body-parser');

import orderRouter from "./controllers/OrderController";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/order", orderRouter);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/index', (request, response) => {
    const users = [
        { id: 1, name: "bob",  daysAgoOnline: 2 },
        { id: 2, name: "john", daysAgoOnline: 5  },
        { id: 3, name: "jake", daysAgoOnline: 12  },
    ];

    response.render('index', {
        users,
        subject: 'EJS template engine',
        name: 'Anton',
        is_admin: false,
        total: 120,
        link: 'https://google.com',
        errorMessage: request.query.errorMessage
    });
});

app.get("/cart", (req, res) => {
    const user = { cart_items: [] };

    if (user.cart_items.length < 1) {
        res.redirect('/index?errorMessage=Your%20cart%20is%20empty');
        return;
    }

    res.render("cart", {});
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// import mongoose from "mongoose";
//
// mongoose.connect('mongodb://localhost:27030/pretest', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// });
// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB');
// });
// mongoose.connection.on('error', (error) => {
//     console.log(error);
// });
