import ReviewsDAO from '../dao/reviewsDAO.js'

export const apiPostReview = async (req, res, next) => {
    try {
        const restaurantId = req.body.restaurant_id
        const review = req.body.text
        const userInfo = {
            name: req.body.name,
            _id: req.body.user_id
        }
        const date = new Date()

        const ReviewResponse = await ReviewsDAO.addReview(
            restaurantId,
            userInfo,
            review,
            date
        )
        res.send(ReviewResponse)
    } catch (e) {
        next(e)
    }
}

export const apiUpdateReview = async (req, res, next) => {
    try {
        const reviewId = req.body.review_id
        const text = req.body.text
        const date = new Date()
        const ReviewResponse = await ReviewsDAO.updateReview(
            reviewId,
            req.body.user_id,
            text,
            date
        )
        if (ReviewResponse.modifiedCount === 0) {
            throw new Error("unable to update review - user may not be original poster")
        }
        res.send({ status: "success" })
    } catch (error) {
        next(error)
    }
}

export const apiDeleteReview = async (req, res, next) => {
    try {
        const userId = req.body.user_id
        const reviewId = req.query.id
        const reviewResponse = await ReviewsDAO.deleteReview(
            reviewId,
            userId
        )
        res.send({ status: "success" })
    } catch (error) {
        next(error)
    }
}
