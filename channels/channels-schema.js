import mongoose from "mongoose";

const channelsSchema = new mongoose.Schema({
    twitch_id: { type: String, required: true, unique: true },
}, { collection: "channels"});

export default channelsSchema;