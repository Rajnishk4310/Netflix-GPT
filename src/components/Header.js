import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/languageConstant";
import { SUPPORTED_LANG } from "../utils/constant";

const Header = () => {
  const user = useSelector((store) => store.user);
  const gptToggleSearchState = useSelector((store) => store.gpt.gptToggleState);
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

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
  };

  const handleConfig = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

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
    <div className="absolute top-0 left-0 right-0 text-white flex justify-between items-center px-8 py-4 bg-gradient-to-b from-black via-black/90 to-transparent z-50">
      {/* Logo on the left */}
      <img className="w-48 brightness-120" src="/logo.png" alt="logo " />

      {/* Avatar image on the right */}
      {user && (
        <div className="flex items-center">
          {gptToggleSearchState && (
            <select
              className="bg-gray-500 bg-opacity-70 p-2 text-white rounded"
              onChange={handleConfig}
            >
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier} className="bg-gray-700">{lang.name}</option>
              ))}
            </select>
          )}
          <button
            className="text-xl font-bold p-2 px-4 m-2 bg-gray-500 hover:bg-gray-700 bg-opacity-40 rounded "
            onClick={handleGptSearch}
          >
            {gptToggleSearchState ? "Home" : "GPT Search"}
          </button>
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-12 h-12   bg-red-500"
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
