const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() => {
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = Schema({
    username: String,
    email: String
});

const postSchema = Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

const addData = async () => {
    // const user1 = new User({
    //     username:"kami",
    //     email: "kami@gmail.com"
    // });
    // const res = await user1.save();
    // console.log(res);
    const getUser = await User.findOne({ username: "hamid" });
    const post1 = new Post({
        content: "oky hi now babe :)",
        likes: 15,
        user: getUser
    });

    const res = await post1.save();
    console.log(res);
    
};

// addData();


const showData = async () => {
    const data = await Post.find().populate('user',"username");
    console.log(data);
};

showData()