import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'

const Login = () => {

  const history = useHistory()
  const { login } = useAuth()
  const initialUserState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [error, setError] = useState(null);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault()
    await axios.post("/api/v1/auth/login", user)
      .then(res => {
        login(res.data)
        history.push('/')
      })
      .catch(err => {
        setError(err.response.data.error)
      })
  }

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <form className="row col-8 col-lg-6 mx-auto text-center justify-content-center" onSubmit={loginHandler}>
        <div className="w-100 mb-4">
          <label htmlFor="Email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="Email"
            required
            onChange={handleInputChange}
            value={user.email} />
        </div>
        <div className="w-100">
          <label htmlFor="Password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="Password"
            required
            onChange={handleInputChange}
            value={user.password}
            autoComplete="off" />
        </div>
        <button type="submit" className="btn btn-primary text-light mt-5">Login</button>
        <span className="w-100 mt-4">Do not have an account? <Link to="/register">Register</Link></span>
        {error && <p className="text-danger w-100 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Login;