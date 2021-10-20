import express from 'express';

const bodyParser = require('body-parser');

import orderRouter from "./controllers/OrderController";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/order", orderRouter);


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

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


(async () => {
    const Order = mongoose.model('OrderAggregateExample', {
        item: String,
        price: Number,
        quantity: String
    });

    const Inventory = mongoose.model('InventoryAggregateExample', {
        sku : String,
        description: String,
        instock  : Number
    });

    // await Order.insertMany([
    //     { "item" : "almonds", "price" : 12, "quantity" : 2 },
    //     { "item" : "pecans", "price" : 20, "quantity" : 1 },
    //     { "item" : "any", "price" : 30, "quantity" : 1  }
    // ]);
    //
    // await Inventory.insertMany([
    //     {  "sku" : "almonds", "description": "product 1", "instock" : 120 },
    //     {  "sku" : "bread", "description": "product 2", "instock" : 80 },
    //     {  "sku" : "cashews", "description": "product 3", "instock" : 60 },
    //     {  "sku" : "pecans", "description": "product 4", "instock" : 70 },
    //     {  "sku": null, "description": "Incomplete" },
    // ]);



    const res = await Order.aggregate(
        [
            {
                "$lookup":
                    {
                        from: Inventory.collection.name,
                        localField: "item",
                        foreignField: "sku",
                        as: "inventory_docs"
                    }
            }
        ]
    );
    console.log(JSON.stringify(res));
})()
