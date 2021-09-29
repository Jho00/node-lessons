import express from 'express';

const bodyParser = require('body-parser');

import orderRouter from "./controllers/OrderController";
import {compile} from "@babel/cli/lib/babel/util";

function myLoggerMiddleware (req, res, next) {
    console.log(req.url);
    next();
};

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(myLoggerMiddleware);
//
// app.use("/order", orderRouter);

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

// EVENT LOOP

// OBJECT
const object = {
    name: "name",
    age: 22,
    city: {
        name: "city name"
    }
};

// FUNCTIONS
function myFunction(arg) {
    console.log(arg)
}

const mySecondFunction = function (arg) {
    console.log(arg);
}

const arrowFunction = (arg) => 42; /*is equal*/ function returner (arg) {
    return 42;
}

// FUNCTIONS IN ACTION

function createUser(userData, callback) {
    console.log(userData);
    callback();
}

// createUser(object, () => console.log("from callback"));


// PROMISE
(async () => {
    const userDataFromDb = async () => Promise.resolve(object);

    // userDataFromDb()
    //     .then(function (data) {
    //         console.log(data)
    //         throw new Error("1111")
    //     })
    //     .catch(function (err) {
    //         console.error(err);
    //     });
    //
    // const data = await userDataFromDb();
    // console.log(data)
})();

// destruction
function getData() {
    return object;
}

const { name, city } = getData(); /*is equal*/  const data = getData(); data.name
console.log(name);


