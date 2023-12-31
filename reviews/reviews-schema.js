import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "usersModel", required: true},
    twitch_id: {type: String, required: true},
    review_content: {type: String, required: true},
    isRecommended: {type: Boolean, required: true},
    date_created: {type: Date, default: Date.now}
}, { collection: "reviews"});

export default reviewsSchema;