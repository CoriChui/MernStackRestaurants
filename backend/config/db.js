import mongodb from 'mongodb'
import RestaurantsDao from '../dao/restaurantsDAO.js'
import ReviewsDao from '../dao/reviewsDAO.js'
import UsersDao from '../dao/usersDao.js'
const MongoClient = mongodb.MongoClient

export const connectToDb = async () => {
    await MongoClient.connect(
        process.env.RESTREVIEWS_DB_URI,
        {
            poolSize: 50,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000,
            poolSize: 10,
            writeConcern: {
                j: true
            }
        }
    )
        .catch(err => {
            console.error(err.stack)
            process.exit(1)
        })
        .then(async client => {
            await RestaurantsDao.injectDB(client)
            await ReviewsDao.injectDB(client)
            await UsersDao.injectDB(client)
            console.log("Mongodb connected")
        })
}
