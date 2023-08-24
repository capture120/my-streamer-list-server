import * as reviewsDao from './reviews-dao.js';


const ReviewsController = (app) => {

    app.post("/api/reviews", createReview);

    app.get('/api/channels/:twitch_id/reviews', findAllReviewsForChannel);

    app.get('/api/channels/:twitch_id/reviews/:current_user_id', findReviewByUserIdAndTwitchId)

    app.get('/api/review/:id', findReviewById);

    app.get('/api/reviews/recent/:limit', findRecentReviews);

    app.get('/api/reviews/user/:user_id', findAllReviewsForUser);

    app.get('/api/reviews/user/:user_id/most-recent', findUserMostRecentReview);

    app.put("/api/review/:id", updateReview);

    /*
    app.get('/api/reviews', findReviews)

    app.delete('/api/reviews/:id', deleteReview);

    app.put("/api/reviews/:id", updateReview);
    */
}

// given a twitch_id, find all reviews
const findAllReviewsForChannel = async (req, res) => {
    const twitch_id = req.params.twitch_id;
    const reviews = await reviewsDao.findAllReviewsForTwitchId(twitch_id);
    res.json(reviews);
}

// given a user_id, find all reviews
const findAllReviewsForUser = async (req, res) => {
    const user_id = req.params.user_id;
    const reviews = await reviewsDao.findAllReviewsForUser(user_id);
    res.json(reviews);
}

// given a user_id, find the most recent review
const findUserMostRecentReview = async (req, res) => {
    const user_id = req.params.user_id;
    const review = await reviewsDao.findUserMostRecentReview(user_id);
    res.json(review);
}

// find all reviews, sorted by most recent date
const findRecentReviews = async (req, res) => {
    const limit = req.params.limit;
    const reviews = await reviewsDao.findRecentReviews(limit);
    res.json(reviews);
}

// given a review object, review is created with currentUser as creator
const createReview = async (req, res) => {
    let review = req.body;
    // Ensures user is logged in
    const currentUser = req.session["currentUser"];
    if (currentUser === undefined) {
        res.sendStatus(401);
        return;
    }

    // Ensures currentUser has not already created a review for this channel (interface also prevents this)
    // !!! performance impact shouldn't be significant (simple find call on two parameters whose combination is unique) !!!
    const review_in_db = await reviewsDao.findReviewByUserIdAndTwitchId(currentUser._id, review.twitch_id);
    if (review_in_db) {
        res.sendStatus(409);
        return;
    }

    review.creator = currentUser._id;
    // review.creator_name = currentUser.username;
    const newReview = await reviewsDao.createReview(review);
    res.json(newReview);
}

/* !!! ALTERNATIVE: 
    Function is open but needs more work at front end (passing currentUser)
    consider changing to "findCurrentUserReviewForChannel" if not used beyond 
    "find review for currentUser"
  !!! */
// given a twitch_id and a user_id, find the review created by that user for that channel
const findReviewByUserIdAndTwitchId = async (req, res) => {
    const user_id = req.params.current_user_id;
    const twitch_id = req.params.twitch_id;
    const review = await reviewsDao.findReviewByUserIdAndTwitchId(user_id, twitch_id);
    res.json(review);
}

// given a review id, find the review
const findReviewById = async (req, res) => {
    const id = req.params.id;
    const user = await reviewsDao.findReviewById(id);
    res.json(user);
}

// given a review id and a review object, update the review
const updateReview = async (req, res) => {
    const id = req.params.id;
    const review_in_db = await reviewsDao.findReviewById(id);
    const updated_review = req.body;

    if (review_in_db) {
        await reviewsDao.updateReview(id, updated_review);
        res.json(updated_review);
        return;
    }
    res.sendStatus(404);
};










/* NOT CURRENTLY IN USE */


const deleteReview = async (req, res) => {
    const id = req.params.id;
    const status = await reviewsDao.deleteReview(twitch_id);
    res.json(status);
}


export default ReviewsController;