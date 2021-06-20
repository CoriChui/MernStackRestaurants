import React from 'react';
import { Link } from 'react-router-dom';

const Restaurants = React.memo(({ restaurants }) => {

  return (
    <>
      {restaurants.map((restaurant, index) => {
        const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`
        return (
          <div className="col-sm-6 col-lg-4 pb-1" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{restaurant.name}</h5>
                <p className="card-text">
                  <strong>Cuisine: </strong>{restaurant.cuisine}<br />
                  <strong>Address: </strong>{address}
                </p>
                <div className="row justify-content-center">
                  <Link to={"/restaurants/" + restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  <a target="noopener noreferrer" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                </div>
              </div>
            </div>
          </div>
        )
      })
      }
    </>
  )
})

export default Restaurants