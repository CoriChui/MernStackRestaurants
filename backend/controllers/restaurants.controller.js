import RestaurantsDAO from "../dao/restaurantsDAO.js"

export const apiGetRestaurants = async (req, res, next) => {
    try {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage,
        })

        const response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.send(response)
    } catch (error) {
        next(error)
    }
}

export const apiGetRestaurantById = async (req, res, next) => {
    try {
        const id = req.params.id || {}
        const restaurant = await RestaurantsDAO.getRestaurantByID(id)
        if (!restaurant) {
            res.status(404).json({ error: "Not found" })
            return
        }
        res.send(restaurant)
    } catch (error) {
        next(error)
    }
}

export const apiGetRestaurantCuisines = async (req, res, next) => {
    try {
        const cuisines = await RestaurantsDAO.getCuisines()
        res.send(cuisines)
    } catch (error) {
        next(error)
    }
}
