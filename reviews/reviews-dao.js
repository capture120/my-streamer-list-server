import mongoose from "mongoose";
import reviewsModel from './reviews-model.js';



// find reviews filtering by given twitch_id and creator id
export const findReviewByUserIdAndTwitchId = (creator, twitch_id) => reviewsModel.findOne({creator: new mongoose.Types.ObjectId(creator), twitch_id: twitch_id});

// Find all reviews for a given TwitchID, sorted by most recent date
export const findAllReviewsForTwitchId = (twitch_id) => reviewsModel.find({twitch_id: twitch_id}).sort({date_created: -1});

// Create a new review
export const createReview = (review) => reviewsModel.create(review);

export const findReviewByInternalId = (id) => reviewsModel.findById(id);












/*
export const findReviewByTwitchId = (twitch_id) => reviewsModel.findOne({twitch_id: twitch_id});
export const findAllReviews = () => reviewsModel.find();
export const updateReview = (id, review) => reviewsModel.updateOne({_id: id}, {$set: review});
export const deleteReview = (id) => reviewsModel.deleteOne({_id: id});
*/