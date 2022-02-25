import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  FacebookAuthProvider,
} from "firebase/auth";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import firebaseConfig from "../firebase.config";

initializeApp(firebaseConfig);

function Login({Component, auth,...rest}) {
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
  const googleProvider = new GoogleAuthProvider();
  const FbProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          image: photoURL,
        };
        setUser(signedInUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setUser(errorMessage);
      });
  };
  // google login end
  // google logout start
  const handleGoogleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        const userSignOut = {
          isSignedIn: false,
          name: "",
          email: "",
          image: "",
        };
        setUser(userSignOut);
      })
      .catch((error) => {
        setUser(error.message);
      });
  };
  // google logout end
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
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    // email signed in start
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate('/shipment');
          console.log("sign in info", userCredential.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };
  const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("User name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFacebookSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, FbProvider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(user);
        setUser(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorMessage);
        // ...
      });
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
        <div style={{margin:"10px"}}>
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
        <Button onClick={handleGoogleSignIn} variant="success">
          Google Sign In
        </Button>
      )}{" "}
      <br /> <br />
      <Button onClick={handleFacebookSignIn} variant="success">
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
