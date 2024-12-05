const mongoose = require('mongoose');

main().then(() => {
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const customerSchema = mongoose.Schema({
    username: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

const orderSchema = mongoose.Schema([
    {
        name: String,
        price: Number
    }
]);

// mongoose middlewares
// pre execute before 
// post execute after

customerSchema.pre("findOneAndDelete", async () => {
    console.log("pre middleware");
});

customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length) {
        const del = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log("post middleware : ", del);

    }
});

const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model("Order", orderSchema);


// functions
const addCustomer = async () => {
    const cus1 = new Customer({
        username: "shahid"
    });

    const odr1 = new Order({
        name: "burger pizza",
        price: 213
    });

    cus1.orders.push(odr1);

    await odr1.save();
    await cus1.save();
};
// addCustomer();

const delCustomer = async () => {
    const del = await Customer.findByIdAndDelete('675030952c072f99093040dc');
    console.log(del);
};
delCustomer();

