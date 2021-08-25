import React from 'react';
import { Redirect, Route } from "react-router";

/* const PrivateRoute = (props) => {
  return (
    <Route exact={props.exact} path={props.path} component={props.component} />
  );
}; */

/* const PrivateRoute = (props) => {
  return <Route {...props} />;
}; */

//Simular Autenticación
let auth = false;
/* auth = null;
auth = true; */
if(typeof (Storage) !== "undefined"){
  auth = "token" in localStorage;
}else{
  auth = null;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}>{auth ? <Component /> : <Redirect to="/" />}</Route>
  );
};

export default PrivateRoute;

    

