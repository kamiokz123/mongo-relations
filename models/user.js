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
])

const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model("Order", orderSchema);

const addOrder = async () => {
    const order1 = new Order({
        name: "samosa",
        price: 20
    });

    const order2 = new Order({
        name: "chips",
        price: 15
    });

    const res = await Order.insertMany([order1,order2]);
    console.log(res);

};
// addOrder();


const addCustomer = async ()=>{
    // const customer1 = new Customer({
    //     username : "shokla",
    // });

    // const order1 = await Order.findOne({name:"samosa"});
    // const order2 = await Order.findOne({name:"chips"});

    // customer1.orders.push(order1,order2);

    // const res = await customer1.save();
    // console.log(res);
    const res = await Customer.find();
    const or = await Order.findOne({_id : res[0].orders[0]})
    console.log(or);
    
};
addCustomer();

// const addUser = async ()=>{
//    const  user1 = new User({
//         username : "kamran",
//         address : [
//             {
//                 location : "street 202 near bridge",
//                 city : "london"
//             },
//             {
//                 location : "house 300 near border",
//                 city : "california"
//             }
//         ]
//     });
//     const result = await user1.save();
//     console.log(result);
// };
// addUser();
