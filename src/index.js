import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

const RutaPrivada = () => {
  return (<PrivateRoute exact path="/home" component={Home} />)
}


ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render={props => (<Login {...props} />)} ></Route>
         <Route>{RutaPrivada}</Route> 
        </Switch>
      </Router>
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
