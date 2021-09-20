import CalculatorService from "./services/CalculatorService";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const service = new CalculatorService();

app.get('/', function (req, res) {
    res.send(service.getHelloText());
});

app.get('/multiple', function (req, res) {
    const param1 = req.query.param1;
    const param2 = req.query.param2;

    res.send(service.mult(param1, param2));
});

app.get('/sum', function (req, res) {
    const param1 = req.query.param1;
    const param2 = req.query.param2;

    res.send(service.sum(param1, param2));
});
app.get('/sub', function (req, res) {
    const param1 = req.query.param1;
    const param2 = req.query.param2;

    res.send(service.sub(param1, param2));
});

app.get('/div', function (req, res) {
    const param1 = req.query.param1;
    const param2 = req.query.param2;

    res.send(service.div(param1, param2));
});

app.post('/user', function (req, res) {
    console.log(req.body.age)
    res.send("ok");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
