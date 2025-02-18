import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EquipCard = ({ equipment }) => {
    const { name, brand, img, title, count, _id } = equipment;

    return (
        <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="relative border border-gray-200 bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden w-80 p-4 transition-all duration-300"
        >
            {/* Image Section */}
            <div className="relative">
                <img src={img} alt={name} className="w-full h-40 object-cover rounded-lg shadow-md" />
                <span className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full">
                    {count} Recs
                </span>
            </div>

            {/* Content Section */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
                <p className="text-gray-600 text-sm"><strong>Brand:</strong> {brand}</p>
                <p className="text-gray-700 text-sm mt-2"><strong>Query:</strong> {title}</p>
            </div>

            {/* Button Section */}
            <Link to={`/equipment_details/${_id}`}>
            <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-blue-700"
            >
                Recommend
            </motion.button>
            </Link>
        </motion.div>
    );
};

export default EquipCard;
