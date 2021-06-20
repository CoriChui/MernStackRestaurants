import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthProvider'
import axios from 'axios';
import Review from './Review'

const Reviews = props => {

  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };

  const { userId } = useAuth()
  const [restaurant, setRestaurant] = useState(initialRestaurantState);
  const [loading, setLoading] = useState(true)

  const getRestaurant = async (id) => {
    await axios.get(`/api/v1/restaurants/id/${id}`)
      .then(res => {
        setLoading(false)
        setRestaurant(res.data);
      })
      .catch(() => {
        setRestaurant(initialRestaurantState)
      });
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = async (reviewId) => {
    await axios.delete(`/api/v1/restaurants/review?id=${reviewId}`, { data: { user_id: userId } })
      .then(() => {
        setRestaurant((prevState) => {
          prevState.reviews = prevState.reviews.filter(review => review._id !== reviewId)
          return ({
            ...prevState
          })
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      {restaurant ?
        <Review
          restaurant={restaurant}
          id={props.match.params.id}
          userId={userId}
          loading={loading}
          deleteReview={deleteReview} /> :
        (<div>
          <br />
          <p>No restaurant selected.</p>
        </div>)
      }
    </div>
  );
};


export default Reviews;