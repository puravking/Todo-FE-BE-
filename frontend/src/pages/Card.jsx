import React from 'react'
import { motion } from 'framer-motion'

function Card({ elem }) {
  const { title, description } = elem

  return (
    <motion.div
      className='w-full max-w-md bg-white rounded-xl shadow-md p-5'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
      <p className='text-gray-600 mt-2'>{description}</p>
    </motion.div>
  )
}

export default Card
