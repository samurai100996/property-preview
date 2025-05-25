import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router'; // For navigation
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router'; // Use Link from react-router-dom
const progressData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [graphRef, graphInView] = useInView({ threshold: 0.3 });
  const [properties, setProperties] = useState([]); // State to store properties from Firestore
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate(); // For navigation

  const [propertiesRef, propertiesInView] = useInView({ threshold: 0.2 });

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'properties')); // Fetch the 'properties' collection
        const propertyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertyList); // Update the state with fetched properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll bg-gray-900">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="h-screen snap-start relative flex items-center justify-center overflow-hidden"
      >
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-32 w-1 h-1 bg-gray-400 rounded-full opacity-40"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-20"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-light text-white mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Find Your <span className="font-normal text-gray-300">Dream</span> Home
          </motion.h1>
          
          <motion.div
            className="h-px w-32 bg-white mx-auto mb-8"
            initial={{ width: 0 }}
            animate={heroInView ? { width: 128 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          />
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Discover premium properties tailored to your lifestyle
          </motion.p>
        </motion.div>
      </section>

      {/* Featured Properties Section */}
<section 
  ref={propertiesRef}
  className="min-h-screen snap-start py-12 md:py-20 bg-gray-900 relative"
>
  {/* Subtle background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-800/30 to-transparent"></div>
  
  <motion.div
    initial={{ opacity: 0 }}
    animate={propertiesInView ? { opacity: 1 } : {}}
    transition={{ duration: 0.8 }}
    className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
  >
    <motion.h2 
      className="text-3xl sm:text-4xl font-light text-center mb-4 text-white tracking-wide"
      initial={{ opacity: 0, y: 20 }}
      animate={propertiesInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Featured Properties
    </motion.h2>
    
    <motion.div
      className="h-px w-16 sm:w-20 md:w-24 bg-white mx-auto mb-12 md:mb-16"
      initial={{ width: 0 }}
      animate={propertiesInView ? { width: 96 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
    />

    {loading ? (
      <motion.div 
        className="flex justify-center items-center py-16 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-8 h-8 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
        <p className="text-gray-400 ml-4 text-sm sm:text-base">Loading properties...</p>
      </motion.div>
    ) : properties.length > 0 ? (
      <>
        {/* Enhanced Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={propertiesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/40 !w-3 !h-3',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-white'
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pb-12"
          >
            {properties.slice(0, 8).map((property, index) => (
              <SwiperSlide key={property.id}>
                <Link 
                  to={`/properties/${property.id}`}
                  className="block h-full"
                >
                  <motion.div 
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-500 group cursor-pointer h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-40 sm:h-48 overflow-hidden relative">
                      <motion.img 
                        src={property.files?.[0]?.url || 'https://via.placeholder.com/300'} 
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                      
                      {/* Hover overlay with view details */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/60 text-white px-4 py-2 rounded-md text-sm font-medium">
                          View Details
                        </div>
                      </div>
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

                      {/* Subtle click indicator */}
                      <motion.div
                        className="mt-4 pt-3 border-t border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="flex items-center justify-center text-gray-300 text-xs sm:text-sm">
                          <span>Click to view more</span>
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Made responsive */}
          <div className="swiper-button-prev !text-white !text-xl sm:!text-2xl !mt-0 !top-1/2 !left-2 sm:!left-4 !w-10 !h-10 sm:!w-12 sm:!h-12 !bg-black/20 !rounded-full !border !border-white/20 hover:!bg-black/40 !transition-all"></div>
          <div className="swiper-button-next !text-white !text-xl sm:!text-2xl !mt-0 !top-1/2 !right-2 sm:!right-4 !w-10 !h-10 sm:!w-12 sm:!h-12 !bg-black/20 !rounded-full !border !border-white/20 hover:!bg-black/40 !transition-all"></div>
        </motion.div>

        {/* Enhanced Button */}
        <motion.div 
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={propertiesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={() => navigate('/properties')}
            className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-gray-100 transition-all duration-300 font-medium tracking-wide text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Properties
          </motion.button>
        </motion.div>
      </>
    ) : (
      <motion.p 
        className="text-center text-gray-400 py-16 md:py-20 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No properties available
      </motion.p>
    )}
  </motion.div>
</section>

      {/* Progress Graph Section */}
      <section 
        ref={graphRef}
        className="h-screen snap-start bg-gray-900 flex flex-col items-center justify-center p-8 relative"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={graphInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl relative z-10"
        >
          <motion.h2 
            className="text-4xl font-light text-center mb-4 text-white tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={graphInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Market Trends
          </motion.h2>
          
          <motion.div
            className="h-px w-24 bg-white mx-auto mb-12"
            initial={{ width: 0 }}
            animate={graphInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.div 
            className="h-[400px] bg-gray-800 border border-gray-700 p-8 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={graphInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar 
                  dataKey="value" 
                  fill="#FFFFFF" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          
          <motion.p 
            className="text-center mt-8 text-gray-400 font-light"
            initial={{ opacity: 0 }}
            animate={graphInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Current market trends and property value progress
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;