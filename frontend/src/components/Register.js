import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Register = () => {

  const initialUserState = {
    name: "",
    email: "",
    password: "",
    passwordMatch: ""
  };

  const [user, setUser] = useState(initialUserState);
  const [response, setResponse] = useState("");
  const [isError, setIsError] = useState(false)

  const onChangeHandler = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault()
    if (user.password !== user.passwordMatch) {
      setUser({
        ...user,
        password: "",
        passwordMatch: ""
      })
      return setResponse("Passwords don't match")
    }

    await axios.post("/api/v1/auth/register", user, {
      header: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setIsError(false)
      setResponse(res.data)
    }).catch(err => {
      setIsError(true)
      setResponse(err.response.data.error)
    })
  }

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <form className="row col-8 col-lg-6 mx-auto text-center justify-content-center" onSubmit={register}>
        <div className="w-100 mb-4">
          <label htmlFor="Email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="Email"
            required
            onChange={onChangeHandler}
            value={user.email} />
        </div>
        <div className="w-100 mb-4">
          <label htmlFor="Name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="Name"
            required
            onChange={onChangeHandler}
            value={user.name} />
        </div>
        <div className="w-100 mb-4">
          <label htmlFor="Password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="Password"
            required
            onChange={onChangeHandler}
            value={user.password} autoComplete="off" />
        </div>
        <div className="w-100">
          <label htmlFor="passwordMatch" className="form-label">Confirm Password</label>
          <input
            type="password"
            name="passwordMatch"
            className="form-control"
            id="passwordMatch"
            required
            onChange={onChangeHandler}
            value={user.passwordMatch} autoComplete="off" />
        </div>
        <button type="submit" className="btn btn-primary text-light mt-5">Register</button>
        <span className="w-100 mt-4">Already have an account? <Link to="/login">Login</Link></span>
        {response && <p className={isError ? 'text-danger w-100 mt-4' : 'text-success w-100 mt-4'}>{response}</p>}
      </form>
    </div>
  );
}

export default Register