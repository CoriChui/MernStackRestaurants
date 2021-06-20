import express from 'express'
import { apiGetRestaurantById, apiGetRestaurants, apiGetRestaurantCuisines } from '../controllers/restaurants.controller.js'
import { apiPostReview, apiUpdateReview, apiDeleteReview } from '../controllers/reviews.controller.js'

const router = express.Router()

router.route("/").get(apiGetRestaurants)
router.route("/id/:id").get(apiGetRestaurantById)
router.route("/cuisines").get(apiGetRestaurantCuisines)

router
    .route("/review")
    .post(apiPostReview)
    .put(apiUpdateReview)
    .delete(apiDeleteReview)

export default router