import mongoose from "mongoose";
import reviewsModel from './reviews-model.js';


// find reviews filtering by given twitch_id and creator id
export const findReviewByUserIdAndTwitchId = (creator, twitch_id) => {
    return reviewsModel.findOne({ creator: new mongoose.Types.ObjectId(creator), twitch_id: twitch_id })
};

// Find all reviews for a given TwitchID, sorted by most recent date
/* Notation in MongoDB Compass: 
    {creator: ObjectId('64df795e7b01e419ba91bc18'), twitch_id: "490592527"}
*/
export const findAllReviewsForTwitchId = (twitch_id) => {
    return reviewsModel.find({ twitch_id: twitch_id }).sort({ date_created: -1 }).populate('creator', '-password').exec();
}

// Find all reviews for a given user, sorted by most recent date
export const findAllReviewsForUser = (user_id) => {
    return reviewsModel.find({ creator: user_id }).sort({ date_created: -1 }).populate('creator', '-password').exec();
}

// Find the most recent review for a given user
export const findUserMostRecentReview = (user_id) => {
    return reviewsModel.findOne({ creator: user_id }).sort({ date_created: -1 }).populate('creator', '-password').exec();
}

// Find all reviews, sorted by most recent date
export const findRecentReviews = (limit) => {
    return reviewsModel.find().sort({ date_created: -1 }).limit(limit).populate('creator', '-password').exec();
}


// Create a new review
export const createReview = (review) => reviewsModel.create(review);

// Find a review by its internal ID
export const findReviewById = (id) => reviewsModel.findById(id).populate('creator', '-password').exec();;

// Update a review
export const updateReview = (id, review) => reviewsModel.updateOne({_id: id}, {$set: review});










/*
export const findReviewByTwitchId = (twitch_id) => reviewsModel.findOne({twitch_id: twitch_id});
export const findAllReviews = () => reviewsModel.find();
export const deleteReview = (id) => reviewsModel.deleteOne({_id: id});
*/