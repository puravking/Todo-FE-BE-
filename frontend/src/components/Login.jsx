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
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password
      });

      if (res.data.userId) {
        localStorage.setItem("userId", res.data.userId);
        // alert("Login successful");
        navigate("/dashboard");
      } else {
        alert(res.data);
      }
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
          className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-400"
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
            className="w-full border-2 border-gray-300 rounded-lg p-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-gray-300 rounded-lg p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.button
            onClick={submitHandle}
            className="w-full bg-teal-600 text-white py-3 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </motion.button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/" className="text-teal-600 hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
