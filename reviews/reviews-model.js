import mongoose from "mongoose";
import reviewsSchema from "./reviews-schema.js";

const reviewsModel = mongoose.model("Reviews", reviewsSchema);

export default reviewsModel;