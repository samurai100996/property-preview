import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Home, Star, Users, Award } from 'lucide-react';

const RealtorContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const stats = [
    { icon: Home, value: '500+', label: 'Properties Sold' },
    { icon: Users, value: '1000+', label: 'Happy Clients' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Award, value: '15+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white mix-blend-soft-light animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(0.8)'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 animate-pulse">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to find your dream home or sell your property? I'm here to make your real estate journey seamless and successful.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center group hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
  <h2 className="text-3xl font-bold text-white mb-8 group-hover:text-purple-300 transition-colors duration-300">
    Get In Touch
  </h2>

  <div className="space-y-6">
    {[
      { icon: Phone, label: 'Call Me', value: '+91 98678 28977', color: 'text-green-400', href: 'tel:+919867828977' },
      { icon: Mail, label: 'Email Me', value: 'dynamicrealtors99@gmail.com', color: 'text-blue-400', href: 'mailto:dynamicrealtors99@gmail.com' },
      { icon: MapPin, label: 'Visit Me', value: 'Thane-west', color: 'text-red-400', href: 'https://www.google.com/maps?q=Thane-west' }
    ].map((item, index) => (
      <a
        key={index}
        href={item.href}
        target={item.label === 'Visit Me' ? '_blank' : '_self'} // Open Google Maps in a new tab
        rel={item.label === 'Visit Me' ? 'noopener noreferrer' : undefined} // Security for external links
        className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group/item"
      >
        <div className={`p-3 rounded-full bg-white/10 ${item.color} group-hover/item:scale-110 transition-transform duration-300`}>
          <item.icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-gray-300 text-sm">{item.label}</p>
          <p className="text-white font-semibold group-hover/item:text-purple-300 transition-colors duration-300">
            {item.value}
          </p>
        </div>
      </a>
    ))}
  </div>


            {/* Agent Card */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl font-bold text-white hover:scale-110 transition-transform duration-300">
                  AG
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Amit Gupta</h3>
                  <p className="text-purple-300 mb-2">Senior Real Estate Agent</p>
                  <p className="text-gray-300 text-sm">Specializing in luxury properties and first-time buyers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">Send a Message</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                    required
                  />
                </div>
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  />
                </div>
                <div className="group">
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  >
                    <option value="" className="bg-gray-800">Property Type</option>
                    <option value="house" className="bg-gray-800">Villa</option>
                    <option value="house" className="bg-gray-800">Bungalow</option>
                    <option value="house" className="bg-gray-800">House</option>
                    <option value="condo" className="bg-gray-800">Condo</option>
                    <option value="apartment" className="bg-gray-800">Apartment</option>
                    <option value="commercial" className="bg-gray-800">Commercial</option>
                  </select>
                </div>
                <div className="group">
                  <select
                    name="dealType"
                    value={formData.dealType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  >
                    <option value="" className="bg-gray-800">Need</option>
                    <option value="house" className="bg-gray-800">Sell</option>
                    <option value="house" className="bg-gray-800">Buy</option>
                    <option value="house" className="bg-gray-800">Rent</option>
                  </select>
                </div>
              </div>

              <div className="group">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                >
                  <option value="" className="bg-gray-800">Budget Range</option>
                  <option value="500k-1m" className="bg-gray-800">₹50Lakh - ₹1Cr</option>
                  <option value="1m-2m" className="bg-gray-800">₹1Cr - ₹4Cr</option>
                  <option value="over-2m" className="bg-gray-800">Over ₹4Cr</option>
                </select>
              </div>

              <div className="group">
                <textarea
                  name="message"
                  placeholder="Tell me about your dream property or any questions you have..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none group-hover:bg-white/15"
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center space-x-2">
                  {isSubmitted ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:scale-105 transition-all duration-500">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Make Your Move?</h3>
            <p className="text-gray-300 mb-6">Whether buying or selling, I'm here to guide you every step of the way.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                Schedule Consultation
              </button>
              <a href="tel:+919867828977">
  <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 hover:scale-105">
    Call Now
  </button>
</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtorContactPage;