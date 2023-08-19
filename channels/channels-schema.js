import mongoose from "mongoose";

const channelsSchema = new mongoose.Schema({
    twitch_id: { type: Number, required: true, unique: true },
    twitch_name: { type: String, required: true, unique: true },
    display_name: { type: String },
}, { collection: "channels"});

export default channelsSchema;