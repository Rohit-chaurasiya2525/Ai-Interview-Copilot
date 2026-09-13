import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/login",
            user
        );

        if (response.data.message === "Login successful") {
            alert("Login Successful");
            navigate("/home");
        } else {
            alert(response.data.message);
        }

    } catch (error) {
        console.log(error);
        alert("Login Failed");
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center">

      <div className="bg-white shadow-2xl rounded-3xl w-[400px] p-8">

        <div className="text-center">

          <div className="text-6xl mb-3">🎬</div>

          <h1 className="text-3xl font-bold text-gray-800">
            Movie Watchlist
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome Back 👋
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
     
          <div>

            <label className="font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div>

            <label className="font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div className="flex justify-between items-center">

            <label className="flex items-center gap-2 text-sm">

              <input type="checkbox" />

              Remember Me

            </label>

            <a
              href="#"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </a>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition duration-300"
          >
            Login
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">

            Don't have an account?

            <span className="text-blue-600 font-semibold cursor-pointer hover:underline ml-2">

              <a href="http://localhost:5173/register">Register</a>

            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;