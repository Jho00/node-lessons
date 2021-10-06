import OrderService from "../services/OrderService";

const express = require('express');
const orderRouter = express.Router();

const service = new OrderService();

function myLoggerMiddleware (req, res, next) {
    console.log(req.route.path);
    next();
};

orderRouter.get('/get', myLoggerMiddleware, function (request, response) {
    response.send(service.getById(request.query.id) || { error: "object not found" });
});

orderRouter.get('/getAll', myLoggerMiddleware, function (req, res) {
    res.send(service.orders);
});

orderRouter.post('/create', myLoggerMiddleware, function (req, res) {
    service.addObject(req.body);
    res.send("ok");
});

orderRouter.delete('/delete', myLoggerMiddleware, function (req, res) {
    service.deleteById(req.query.id);

    res.send(service.orders);
});

export default orderRouter;
