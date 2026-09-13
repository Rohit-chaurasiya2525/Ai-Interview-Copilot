import { useState } from "react";

import axios from "axios";
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

 const handleRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/register",
            {
                name: user.name,
                email: user.email,
                password: user.password
            }
        );

        console.log(response.data);

        alert("Registration successful");

    } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
    alert(error.response?.data?.detail || "Registration failed");
}
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center">

      <div className="bg-white shadow-2xl rounded-3xl w-[420px] p-8">

        <div className="text-center">

          <div className="text-6xl mb-3">🎬</div>

          <h1 className="text-3xl font-bold text-gray-800">
            Movie Watchlist
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

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
              className="w-full mt-2 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full mt-2 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-xl transition duration-300"
          >
            Create Account
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">

            Already have an account?

            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline ml-2">
              <a href="http://localhost:5173/login">Login</a>
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;