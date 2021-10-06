import express from 'express';

const bodyParser = require('body-parser');

import orderRouter from "./controllers/OrderController";


// const app = express();
// const port = 3000;
//
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(myLoggerMiddleware);
//
// app.use("/order", orderRouter);
//
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });
//
//
// MERN - Mongodb Express React Node
import mongoose from "mongoose";
// const { Schema } = mongoose;

(async () => {
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

    const User = mongoose.model('User', { name: String, age: Number, is_admin: Boolean });
    let allUsers;

    allUsers = await User.find();
    console.log(allUsers);

    const admin = new User({name: "Admin", age: 55, is_admin: true});
    await admin.save();

    allUsers = await User.find({name: "Admin"});
    console.log(allUsers);

    await User.deleteMany({name: 'Admin'})

    allUsers = await User.find();
    console.log(allUsers);
})()
