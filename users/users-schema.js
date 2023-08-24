import mongoose from "mongoose";


const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {type: String, default: ""},
    favoriteChannel: String,
    isAdmin: {type:Boolean, required:true, default:false},
}, { collection: "users"});

export default usersSchema;