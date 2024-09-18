import { useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [erMessage, setErMessage] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: !isSignIn && name === "",
      email: email === "",
      password: password === "" || password.length < 4 || password.length > 60,
    };
    setErrors(newErrors);

    const message = checkValidData(email, password);
    setErMessage(message);

    if (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.password &&
      !message
    ) {
      if (!isSignIn) {
        // Sign Up
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name, photoURL: "https://avatars.githubusercontent.com/u/100723131?v=4"
            }).then(() => {
              // Profile updated!
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            }).catch((error) => {
              // An error occurred
              // ...
            });
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErMessage(errorCode + "-" + errorMessage);
          });
      } else {
        // sign In
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/browse");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErMessage(errorCode + "-" + errorMessage);
          });
      }
    }
  };

  const handleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        className="brightness-50 w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/85ff76db-39e5-423a-afbc-97d3e74db71b/null/IN-en-20240909-TRIFECTA-perspective_b22117e0-4610-4d57-a695-20f77d241a4a_large.jpg"
        alt="background"
      />

      {/* Header */}
      <Header />

      {/* Login Form */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className={`p-3 rounded w-full my-2 bg-black bg-opacity-70 text-white border ${
                errors.name ? "border-red-700" : "border-gray-600"
              }`}
              aria-label="Full name"
            />
          )}
          {!isSignIn && errors.name && (
            <p className="text-red-700">❌ Please enter a Full name.</p>
          )}

          {/* Email Input */}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or mobile number"
            className={`p-3 rounded w-full my-2 bg-black bg-opacity-70 text-white border ${
              errors.email ? "border-red-700" : "border-gray-600"
            }`}
            aria-label="Email or mobile number"
          />
          {errors.email && (
            <p className="text-red-700">
              ❌ Please enter a valid email address or phone number.
            </p>
          )}

          {/* Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`p-3 rounded w-full my-2 bg-black bg-opacity-70 text-white border ${
              errors.password ? "border-red-700" : "border-gray-600"
            }`}
            aria-label="Password"
          />
          {errors.password && (
            <p className="text-red-700">
              ❌ Your password must contain between 4 and 60 characters.
            </p>
          )}
          <p className="text-red-700">{erMessage}</p>

          {/* Sign In/Sign Up Button */}
          <button className="cursor-pointer bg-red-600 hover:bg-red-700 p-2 rounded w-full font-semibold my-4">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {isSignIn && <h1 className="text-center mb-4">OR</h1>}
        {isSignIn && (
          <>
            <button className="w-full bg-gray-600 p-2 rounded mb-4 hover:bg-gray-700">
              Use a sign-in code
            </button>
            <button className="w-full text-gray-300 hover:underline mb-4">
              Forgot password?
            </button>
            <div className="flex items-center mb-4">
              <input className="mr-2" type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
          </>
        )}

        <h1 className="mb-4">
          {isSignIn ? "New to Netflix?" : "Already Registered?"}{" "}
          <button
            className="font-bold text-white hover:underline"
            onClick={handleSignIn}
          >
            {isSignIn ? "Sign up now" : "Sign In now"}
          </button>
        </h1>

        <p className="text-xs">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <button className="font-bold text-blue-600 hover:underline">
            Learn more.
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
