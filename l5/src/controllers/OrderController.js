import asyncHandler from 'express-async-handler'

import OrderService from "../services/OrderService";

const express = require('express');
const orderRouter = express.Router();

const service = new OrderService();

function myLoggerMiddleware (req, res, next) {
    console.log(req.route.path);
    next();
};

orderRouter.get('/get', myLoggerMiddleware, asyncHandler(async function (request, response) {
    response.send(await (service.getById(request.query.id)) || { error: "object not found" });
}));

orderRouter.get('/getAll', asyncHandler(async (req, res) => {
    const result = await service.getAll();

    res.json(result)
}));

orderRouter.post('/create', myLoggerMiddleware, function (req, res) {
    service.addObject(req.body);
    res.send("ok");
});

orderRouter.delete('/delete', myLoggerMiddleware, asyncHandler(async function (req, res) {
    await service.deleteById(req.query.id);

    res.send("ok");
}));

export default orderRouter;
