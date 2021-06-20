import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';

const Review = ({ restaurant, id, userId, deleteReview, loading }) => {


  return (
    <div className="container-fluid">
      <div className="row justify-content-center text-center">
        <div className="col-8 col-lg-4 shadow my-5 p-3 rounded">
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br />
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={"/restaurants/" + id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
        </div>
      </div>
      <h3 className="row justify-content-center text-center"> Reviews </h3>
      <div className="row">
        {restaurant.reviews.length > 0 ? (
          restaurant.reviews.map((review, index) => {
            return (
              <div className="col-sm-6 col-lg-4 my-2" key={index}>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      {review.text}<br />
                      <strong>User: </strong>{review.name}<br />
                      <strong>Date: </strong>{review.date}
                    </p>
                    {userId && userId === review.user_id &&
                      <div className="row justify-content-center">
                        <button onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-sm-5 mx-1 mb-1">Delete</button>
                        <Link to={{
                          pathname: "/restaurants/" + id + "/review",
                          state: {
                            currentReview: review
                          }
                        }} className="btn btn-primary col-sm-5 mx-1 mb-1">Edit</Link>
                      </div>
                    }
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-100 mt-5 text-center">
            {loading ? <Spinner className="text-dark" animation="border" /> : <h5>No reviews yet.</h5>}
          </div>
        )}

      </div>

    </div>
  )
}

export default Review