import express from 'express';
import asyncHandler from 'express-async-handler'

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')

import { v4 as uuidv4 } from 'uuid';

import orderRouter from "./controllers/OrderController";
import UserEntity from "./dal/UserEntity";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: ['user_token']
}));

app.use("/order", orderRouter);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response) => {
    if (!request.session.user_token) {
        response.redirect('/login');
        return;
    }

    UserEntity.findOne({_id: request.session.user_token}).then(user => {
        const usersMocks = [
            { id: 1, name: "bob",  daysAgoOnline: 2 },
            { id: 2, name: "john", daysAgoOnline: 5  },
            { id: 3, name: "jake", daysAgoOnline: 12  },
        ];

        response.render('index', {
            users: usersMocks,
            subject: 'EJS template engine',
            name: user.email,
            is_admin: true,
            total: 120,
            link: 'https://google.com',
            errorMessage: request.query.errorMessage
        });
    });
});

app.get("/cart", (req, res) => {
    const user = { cart_items: [{ a: 12}] };

    if (user.cart_items.length < 1) {
        res.redirect('/index?errorMessage=Your%20cart%20is%20empty');
        return;
    }


    res.render("cart", {});
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.redirect('/error?errorMessage=Your%20data%20is%20empty');
        return;
    }

    UserEntity.findOne({email: email}).then(user => {
        if (!user) {
            res.redirect('/error?errorMessage=User%20not%20found');
            return;
        }

        if (user.password !== `${password}`) {
            res.redirect('/error?errorMessage=Password%20is%20incorrect');
            return;
        }

        req.session.user_token = user.id;
        res.redirect("/");
    })
});

app.get('/login', (req, res) => {
    if (req.session.user_token) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

app.get('/registration', (req, res) => {
    if (req.session.user_token) {
        res.redirect('/');
        return;
    }
    res.render('registration');
});

app.post('/registration', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.redirect('/error?errorMessage=Your%20data%20is%20empty');
        return;
    }

    const user = new UserEntity({
        email, password // TODO: USE HASH FUNCTION
    })
    await user.save();

    res.redirect("/login");
}));

app.get('/logout', (req, res) => {
    req.session.user_token = null;
    res.redirect('/');
})

app.get('/error', (req, res) => {
    res.render('error', {
        errorMessage: req.query.errorMessage
    })
})

app.get('/gallery', (req, res) => {
    OrderEntity.find().then(result => {
        res.render('gallery', {
            products: result
        })
    })
});

app.post('/create-product', (req, res) => {
    const { currency, amount, product_name } = req.body;

    const order = new OrderEntity({
        amount, currency, name: product_name
    });
    order.save().then((r) => {
        res.redirect('/gallery');
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

import mongoose from "mongoose";
import OrderEntity from "./dal/OrderEntity";
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


