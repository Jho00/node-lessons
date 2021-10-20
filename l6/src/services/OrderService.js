import OrderEntity from "../dal/OrderEntity";

class OrderService {
    getById(id) {
        return OrderEntity.findById(id)
    }

    async addObject(object) {
        const order = new OrderEntity(object);
        await order.save();

        return order;
    }

    async getAll() {
       return OrderEntity.find();
    }

    async deleteById(id) {
        return OrderEntity.findByIdAndDelete(id);
    }
}

export default OrderService;
