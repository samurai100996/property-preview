import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Temporary data - replace with backend data later
const progressData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const properties = [
  { id: 1, title: 'Luxury Villa', location: 'Beverly Hills', price: '2.5M', bhk: '4 BHK', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 2, title: 'Modern Apartment', location: 'Downtown', price: '$1.2M', bhk: '3 BHK', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 3, title: 'Beach House', location: 'Malibu', price: '$3.8M', bhk: '5 BHK', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 4, title: 'City Penthouse', location: 'Manhattan', price: '$4.5M', bhk: '4 BHK', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
];

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [graphRef, graphInView] = useInView({ threshold: 0.3 });
  const [propertiesRef, propertiesInView] = useInView({ threshold: 0.2 });

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="h-screen snap-start relative flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Find Your <span className="text-blue-300">Dream</span> Home
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover premium properties tailored to your lifestyle
          </p>
        </motion.div>
      </section>

        {/* Properties Section */}
      <section 
        ref={propertiesRef}
        className="min-h-screen snap-start py-20 bg-white"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={propertiesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.location}
                  </p>
                  <div className="flex justify-between mt-4">
                    <span className="font-bold text-blue-600">{property.price}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {property.bhk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* Progress Graph Section */}
      <section 
        ref={graphRef}
        className="h-screen snap-start bg-gray-50 flex flex-col items-center justify-center p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={graphInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Market Trends
          </h2>
          <div className="h-[400px] bg-white p-6 rounded-xl shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center mt-6 text-gray-600">
            Current market trends and property value progress
          </p>
        </motion.div>
      </section>

    
      
    </div>
  );
};

export default Home;