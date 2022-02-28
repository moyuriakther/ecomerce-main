import firebaseConfig from "../firebase.config";
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

export const firebaseInitializeApp = () => {
  initializeApp(firebaseConfig);
};
// fb sign in

export const handleFacebookSignIn = () => {
  const FbProvider = new FacebookAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, FbProvider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
    });
};
// google sign in
export const handleGoogleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      const { displayName, email, photoURL } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        image: photoURL,
        success: true,
      };
      return signedInUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
    });
};
// google login end
// google logout start
export const handleGoogleSignOut = () => {
  const auth = getAuth();
  return signOut(auth)
    .then(() => {
      const userSignOut = {
        isSignedIn: false,
        name: "",
        email: "",
        image: "",
        success: false,
      };
      return userSignOut;
    })
    .catch((error) => {
      return error.message;
    });
};
// google logout end
export const userCreateUserWithEmailAndPassword = (name, email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};
export const userSignInWithEmailAndPassword = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
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
