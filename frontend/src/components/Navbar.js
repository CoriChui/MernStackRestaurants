import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'

const Navbar = () => {

  const { logout, token } = useAuth()
  const history = useHistory()

  const logoutHandler = (e) => {
    e.preventDefault()
    logout()
    history.push("/")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
        <div className="container">
          <a href="/restaurants" className="navbar-brand">
            Restaurants App
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/restaurants"} className="nav-link">
                  Restaurants
                </Link>
              </li>
              <li className="nav-item" >
                {token ? (
                  <label onClick={logoutHandler} className="nav-link" style={{ cursor: 'pointer' }}>
                    Logout
                  </label>
                ) : (
                  <div className="row ml-1">
                    <Link to={"/register"} className="nav-link">
                      Register
                    </Link>
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar