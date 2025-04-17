import React from 'react';
import { motion } from 'framer-motion';

function Card({ elem, onDelete, onEdit }) {
  const { _id, title, description } = elem;

  return (
    <motion.div
      className='w-full max-w-md bg-white rounded-xl shadow-md p-5 relative'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
      <p className='text-gray-600 mt-2'>{description}</p>

      <div className="flex justify-end gap-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(_id, title, description)}
          className="px-4 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
        >
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(_id)}
          className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Card;
