import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthProvider from './context/AuthProvider'
import AddReview from './components/review/Add-review'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Reviews from './components/review/Reviews'
import Home from './components/Home'
import ConfirmToken from './components/ConfirmToken'

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path={["/", "/restaurants"]} component={Home} />
            <Route
              path="/restaurants/:id/review"
              render={(props) => (
                <AddReview {...props} />
              )}
            />
            <Route
              path="/restaurants/:id"
              render={(props) => (
                <Reviews {...props} />
              )}
            />
            <Route
              path="/register"
              component={Register}
            />
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/confirmemail/:token"
              render={(props) => (
                <ConfirmToken {...props} />
              )}
            />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
