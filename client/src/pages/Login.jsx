import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    });
    dispatch({
      type: "LOGIN",
      payload: response.data.token,
    });

    localStorage.setItem("token", response.data.token);
    navigate("/profile");
    setUsername("");
    setPassword("");
  };
  return (
    <div className="p-10">
      <h1 className="mb-8 font-extrabold text-4xl">Login</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form>
          <div>
            <label className="block font-semibold" htmlFor="username">
              Username
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
              id="username"
              type="text"
              name="username"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
              id="password"
              type="password"
              name="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className=" mt-8">
            <button
              type="submit"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
