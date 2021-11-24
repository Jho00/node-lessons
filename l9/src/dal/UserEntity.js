import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});

const UserEntity = mongoose.model('User', userSchema);

export default UserEntity;

// const OrderEntity = mongoose.model('User', { name: String, age: Number, is_admin: Boolean });
