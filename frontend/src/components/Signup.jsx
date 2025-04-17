import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/signup", {
        username,
        password,
        MobileNo: mobileNo
      });

      console.log("Signup Success:", response.data);
      navigate("/login");
    } catch (err) {
      console.log("Signup failed:", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600">
      <motion.div
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-400"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Create Account
        </motion.h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={submitHandle} className="space-y-4">
          <motion.input
            type="text"
            placeholder="Username"
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.input
            type="text"
            placeholder="Mobile Number"
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />

          <motion.button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>

        <motion.p
          className="mt-4 text-center text-gray-600"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Signup;
