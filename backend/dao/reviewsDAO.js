import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectID

let reviews
export default class ReviewsDao {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db().collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in reviewsDao: ${e}`)
        }
    }

    static async addReview(restaurantId, user, review, date) {
        const reviewDoc = {
            name: user.name,
            user_id: user._id,
            date: date,
            text: review,
            restaurant_id: ObjectId(restaurantId)
        }
        const result = await reviews.insertOne(reviewDoc)
        return JSON.parse(result).ops[0]
    }

    static async updateReview(reviewId, userId, text, date) {
        const updateResponse = await reviews.updateOne(
            {
                user_id: userId,
                _id: ObjectId(reviewId)
            },
            { $set: { text: text, date: date } }
        )
        return updateResponse
    }


    static async deleteReview(reviewId, userId) {
        const deleteResponse = await reviews.deleteOne({
            _id: ObjectId(reviewId),
            user_id: userId
        })
        return deleteResponse
    }
}