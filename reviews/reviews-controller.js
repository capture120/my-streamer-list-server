import * as reviewsDao from './reviews-dao.js';


const ReviewsController = (app) => {
    app.get('/api/reviews', findReviews)
    app.get('/api/reviews/internal/:id', findReviewsById);

    app.post("/api/reviews", createReview);

    app.delete('/api/reviews/:id', deleteReview);

    app.put("/api/reviews/:id", updateReview);
}

const findReviews = async (req, res) => {
    const twitch_name = req.body.twitch_name;
    if (twitch_name) {
        const channel = await reviewsDao.findChannelByTwitchName(twitch_name);
        if (channel) {
            res.json(channel);
        } else {
            res.sendStatus(404);
        }
    }
    else {
        const channels = await reviewsDao.findAllReviews();
        res.json(channels);
    }
}

const findReviewsById = async (req, res) => {
    const id = req.params.id;
    const user = await reviewsDao.findChannelByInternalId(id);
    res.json(user);
}


const createReview = async (req, res) => {
    let review = req.body;
    const currentUser = req.session["currentUser"];
    if (currentUser === undefined) {
        res.sendStatus(401);
        return;
    }

    const review_in_db = await reviewsDao.findReviewByTwitchId(review.twitch_id);
    // if (review_in_db) {
    //     res.sendStatus(409);
    //     return;
    // }

    review.creator = currentUser._id;
    review.review_in_db = review_in_db;
    // const newReview = await reviewsDao.createChannel(review);
    res.json(review);
}

const deleteReview = async (req, res) => {
    const id = req.params.id;
    const status = await reviewsDao.deleteChannel(twitch_id);
    res.json(status);
}

const updateReview = async (req, res) => {
    const id = req.params.id;
    const review_in_db = await reviewsDao.findReviewById(twitch_id);
    const updated_review = req.body;

    if (review_in_db) {
        await channelsDao.updateChannel(id, updated_review);
        res.json(updated_review);
        return;
    }
    res.sendStatus(404);
};

export default ReviewsController;