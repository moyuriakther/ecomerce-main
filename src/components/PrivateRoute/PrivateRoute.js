import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../App";

const PrivateRoute = ({children, redirectTo }) => {
  const [loggedInUser] = useContext(userContext);
  return (
      loggedInUser.email  ? children : <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
