import mongoose from "mongoose";
import ObjectId from "mongodb";
// const ObjectId = require('mongodb').ObjectID;


const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    favoriteChannel: [{type: mongoose.Schema.Types.ObjectId, ref: "Channels"}],
    isAdmin: Boolean,
}, { collection: "users"});

export default usersSchema;