import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

const Properties = () => {
  const [properties, setProperties] = useState([]); // State to store fetched properties
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(null); // State to handle errors

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'properties'));
        const propertiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertiesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Clean loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
          <p className="text-gray-300 text-lg text-center">Loading properties...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-900 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 md:p-8 text-center max-w-md w-full">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Elegant title */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-wide">
              Available Properties
            </h1>
            <motion.div
              className="h-px w-16 sm:w-20 md:w-24 bg-white mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {properties.length === 0 ? (
            <motion.div
              className="text-center py-16 md:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 text-lg md:text-xl">No properties found.</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  {/* Make entire card clickable */}
                  <Link 
                    to={`/properties/${property.id}`}
                    className="block h-full"
                  >
                    {/* Subtle border glow on hover */}
                    <div className="absolute -inset-px bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative h-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all duration-500 group-hover:border-gray-600 cursor-pointer">
                      {/* Image container */}
                      <div className="relative overflow-hidden">
                        {property.files && property.files.length > 0 ? (
                          <motion.img
                            src={property.files[0].url}
                            alt={property.title}
                            className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-40 sm:h-48 bg-gray-700 flex items-center justify-center">
                            <p className="text-gray-500 text-sm sm:text-base">No Image Available</p>
                          </div>
                        )}
                        
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                      </div>

                      <div className="p-4 sm:p-6 flex flex-col flex-grow">
                        <h3 className="font-semibold text-lg sm:text-xl mb-3 text-white group-hover:text-gray-100 line-clamp-2">
                          {property.title}
                        </h3>
                        <p className="text-gray-400 mb-3 flex items-center text-sm sm:text-base">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{property.location}</span>
                        </p>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-auto gap-2">
                          <span className="font-bold text-white text-lg sm:text-xl">
                            ₹{typeof property.price === 'number' ? property.price.toLocaleString() : property.price}
                          </span>
                          <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs sm:text-sm border border-gray-600 self-start sm:self-auto">
                            {property.bedrooms || 'N/A'} BHK
                          </span>
                        </div>

                        {/* View Details indicator */}
                        <motion.div
                          className="mt-4 pt-4 border-t border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center justify-center text-white text-sm font-medium">
                            <span>View Details</span>
                            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;