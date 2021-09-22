import OrderService from "./services/OrderService";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const service = new OrderService();

app.get('/order/get', function (request, response) {
    response.send(service.getById(request.query.id) || {error: "object not found"});
});

app.get('/order/getAll', function (req, res) {
    res.send(service.orders);
});

app.post('/order/create', function (req, res) {
    service.addObject(req.body);
    res.send("ok")
});

app.post('/order/update', function (req, res) {
 //
});

app.delete('/order/delete', function (req, res) {
    service.deleteById(req.query.id);

    res.send(service.orders);
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
