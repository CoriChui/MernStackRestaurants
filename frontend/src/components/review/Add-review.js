import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../context/AuthProvider'

const AddReview = props => {

  let initialReviewState = ""
  let editing = false;
  const { token, userId, userName } = useAuth()
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = async () => {
    var data = {
      text: review,
      name: userName,
      user_id: userId,
      restaurant_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id
      await axios.put("/api/v1/restaurants/review", data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      })
        .then(() => {
          setSubmitted(true);
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      await axios.post("/api/v1/restaurants/review", data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      })
        .then(() => {
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <div className="container">
      {token ? (
        <div className="submit-form row justify-content-center text-center">
          {submitted ? (
            <div className="text-center mt-5">
              <h3>You submitted successfully!</h3>
              <Link to={"/restaurants/" + props.match.params.id} className="btn btn-primary mt-4">
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div className="col-lg-6 mt-5">
              <div className="form-group">
                <h3 htmlFor="description">{editing ? "Edit" : "Create"} Review</h3>
                <input
                  type="text"
                  className="form-control mt-4 mx-auto"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"

                />
              </div>
              <button onClick={saveReview} className="btn btn-primary mt-4">
                Submit
              </button>
            </div>
          )}
        </div>

      ) : (
        <div className="row justify-content-center mt-5">
          <h3>Please Login</h3>
        </div>
      )}

    </div>
  );
};

export default AddReview;