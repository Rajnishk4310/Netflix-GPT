import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute top-0 left-0 right-0 text-white flex justify-between items-center px-8 py-4 bg-gradient-to-b from-transparent via-black/60 to-transparent z-50">
      {/* Logo on the left */}
      <img className="w-48 brightness-120" src="/logo.png" alt="logo " />

      {/* Avatar image on the right */}
      {user && (
        <div className="flex items-center">
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover bg-red-500"
          />
          <button onClick={handleSignOut} className=" text-xl font-bold m-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
