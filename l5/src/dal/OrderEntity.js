import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    amount: Number,
    currency: String
});

const OrderEntity = mongoose.model('Order', orderSchema);

export default OrderEntity;


// const OrderEntity = mongoose.model('User', { name: String, age: Number, is_admin: Boolean });
