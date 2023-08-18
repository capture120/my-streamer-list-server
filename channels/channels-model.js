import mongoose from "mongoose";
import channelsSchema from "./channels-schema.js";

const channelsModel = mongoose.model("Channels", channelsSchema);

export default channelsModel;