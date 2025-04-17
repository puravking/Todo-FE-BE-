import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandle = async () => {
    try {
      await axios.post("http://localhost:3001/login", {
        username,
        password
      });
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-cyan-600">
      <motion.div
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-400"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Log In
        </motion.h2>

        <div className="space-y-4">
          <motion.input
            type="text"
            placeholder="Username"
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />

          <motion.button
            onClick={submitHandle}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </motion.button>
        </div>

        <motion.p
          className="mt-4 text-center text-gray-600"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Don't have an account?{' '}
          <Link to="/signup" className="text-teal-600 hover:underline">Sign up</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;
