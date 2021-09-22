// class Order {
//     id = 1
//
//     amount = 123
//
//     currency = "USD"
//
//     customer_id = 12
//
//     time = ""
// }

class OrderService {
    orders = [];

    getById(id) {
        return this.orders.find(function (order) {
           return order.id == id;
        });
    }

    addObject(object) {
        this.orders.push(object);
    }

    deleteById(id) {
        this.orders = this.orders.filter((order) => order.id != id);
    }
}

// module.exports = HelloService;

export default OrderService;
