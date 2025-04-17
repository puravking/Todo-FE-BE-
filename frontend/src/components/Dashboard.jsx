import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../pages/Card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const userId = localStorage.getItem("userId");

  // Fetch all todos for the logged-in user when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dashboard/${userId}`);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/dashboard", {
        title,
        description,
        userId
      });

      if (response && response.data) {
        setTodos([...todos, response.data]);
        setTitle("");
        setDescription("");
      } else {
        console.log("Unable to push data to database");
      }
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-blue-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Welcome to Todo Application
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex flex-col gap-4 bg-white shadow-md p-6 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <input
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder='Title'
          className='p-3 rounded border border-gray-300'
          required
        />
        <input
          type="text"
          onChange={e => setDescription(e.target.value)}
          value={description}
          placeholder='Description'
          className='p-3 rounded border border-gray-300'
          required
        />
        <motion.input
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          value="Submit"
          className='cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition'
        />
      </motion.form>

      <div className="mt-10 flex flex-col items-center gap-4">
        {todos.length > 0 ? (
          todos.map((elem, index) => (
            <Card elem={elem} key={index} />
          ))
        ) : (
          <p className="text-center text-gray-600">No todos found!</p>
        )}
      </div>
      <motion.button
            onClick={() => {
                localStorage.removeItem("userId");
                navigate("/login");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 mx-auto block bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
            Logout
        </motion.button>

    </div>
  );
}

export default Dashboard;
