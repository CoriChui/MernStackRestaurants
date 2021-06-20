import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let restaurants
export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db().collection("dataset")
            restaurants.createIndex({ name: "text" })
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`,
            )
        }
    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }
        const cursor = await restaurants.find(query)
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
        const restaurantsList = await displayCursor.toArray()
        const totalNumRestaurants = await restaurants.countDocuments(query)
        return { restaurantsList, totalNumRestaurants }
    }

    static async getRestaurantByID(id) {
        const pipeline = [
            { $match: { _id: new ObjectId(id) } },
            {
                $lookup: {
                    from: "reviews",
                    let: { id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$restaurant_id", "$$id"]
                                }
                            }
                        },
                        {
                            $sort: {
                                date: -1,
                            },
                        },
                    ],
                    as: "reviews",
                },
            },
            {
                $addFields: {
                    reviews: "$reviews",
                },
            },
        ]
        return await restaurants.aggregate(pipeline).next()
    }

    static async getCuisines() {
        const cuisines = await restaurants.distinct("cuisine")
        return cuisines
    }
}