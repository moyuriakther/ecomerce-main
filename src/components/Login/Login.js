import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import {
  firebaseInitializeApp,
  handleFacebookSignIn,
  handleGoogleSignIn,
  userCreateUserWithEmailAndPassword,
  userSignInWithEmailAndPassword,
} from "./LoginHelper";

firebaseInitializeApp();

function Login({ Component, auth, ...rest }) {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    image: "",
    error: "",
    success: false,
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate();

  const FacebookSignIn = () => {
    handleFacebookSignIn().then((res) => {
      handleResponses(res, true);
    });
  };
  const GoogleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponses(res, true);
    });
  };
  const handleGoogleSignOut = () => {
    handleGoogleSignOut().then((res) => {
      handleResponses(res, false);
    });
  };
  const handleResponses = (res, isRouteChange) => {
    setUser(res);
    setLoggedInUser(res);
    isRouteChange && navigate("/shipment");
  };

  // email create user start
  const handleBlur = (e) => {
    let isValid;
    if (e.target.name === "name") {
      isValid = e.target.value;
    }
    if (e.target.name === "email") {
      isValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(e.target.value);
    }
    if (isValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  };
  const handleEmailSubmit = (e) => {
    if (newUser && user.email && user.password) {
      userCreateUserWithEmailAndPassword(user.name, user.email, user.password)
      .then((res) => {
        handleResponses(res, true);
      });
    }
    // email signed in start
    if (!newUser && user.email && user.password) {
      userSignInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponses(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div className="login">
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      {user.error && (
        <p style={{ color: "red" }}>
          This email is already used by another account
        </p>
      )}
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "logged In"} successfully
        </p>
      )}
      {user.isSignedIn && (
        <div style={{ margin: "10px" }}>
          <p>
            <strong>User Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <img src={user.image} alt="" />
        </div>
      )}
      {user.isSignedIn ? (
        <Button onClick={handleGoogleSignOut} variant="success">
          Google Sign Out
        </Button>
      ) : (
        <Button onClick={GoogleSignIn} variant="success">
          Google Sign In
        </Button>
      )}{" "}
      <br /> <br />
      <Button onClick={FacebookSignIn} variant="success">
        Facebook Sign In
      </Button>
      <br /> <br />
      <h1>Our own authentication</h1>
      <input
        onClick={() => setNewUser(!newUser)}
        type="checkbox"
        name="newUser"
        id="newUser"
      />
      <label htmlFor="newUser">Create New User</label>
      <form action="" onSubmit={handleEmailSubmit}>
        {newUser && (
          <input
            onBlur={handleBlur}
            id="standard-basic-name"
            placeholder="Enter your name"
            name="name"
            type="text"
            variant="standard"
            className="form-control"
            required
          />
        )}
        <br />
        <input
          onBlur={handleBlur}
          id="standard-basic"
          placeholder="Enter your email"
          name="email"
          type="email"
          variant="standard"
          className="form-control"
          required
        />
        <br />
        <input
          onBlur={handleBlur}
          id="standard-password-input"
          placeholder="Enter your password"
          type="password"
          name="password"
          variant="standard"
          className="form-control"
          required
        />{" "}
        <br />
        {newUser ? (
          <Button type="submit" variant="success">
            Sign Up
          </Button>
        ) : (
          <Button type="submit" variant="success">
            Sign In
          </Button>
        )}
      </form>
    </div>
  );
}

export default Login;
