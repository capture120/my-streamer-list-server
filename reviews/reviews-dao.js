import reviewsModel from './reviews-model.js';

export const createReview = (review) => reviewsModel.create(review);

export const findAllReviews = () => reviewsModel.find();

export const findReviewById = (id) => reviewsModel.findById(id);

export const findReviewByUserId = (user_id) => reviewsModel.findOne(user_id);

export const findReviewByTwitchId = (twitch_id) => reviewsModel.findOne({twitch_id: twitch_id});

export const updateReview = (id, review) => reviewsModel.updateOne({_id: id}, {$set: review});

export const deleteReview = (id) => reviewsModel.deleteOne({_id: id});