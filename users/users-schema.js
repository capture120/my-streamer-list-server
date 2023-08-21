import mongoose from "mongoose";


const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    favoriteChannel: String,
    isAdmin: Boolean,
}, { collection: "users"});

export default usersSchema;