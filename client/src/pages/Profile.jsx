import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState();

  axios.defaults.headers.common["Authorization"] = user;
  const getUserProfile = async () => {
    await axios
      .get("http://localhost:3001/profile")
      .then((res) => {
        setUsername(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUserProfile();
  });

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div>
      Welcome {user && username}
      <br></br>;
      <div className=" mt-2 pl-5">
        <button
          type="submit"
          className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
