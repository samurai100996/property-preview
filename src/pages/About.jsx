import React, { useState, useEffect, useRef } from 'react';
import { Home, Award, Users, MapPin, Phone, Mail, Star, TrendingUp, Heart, Key, Calendar, CheckCircle } from 'lucide-react';

const RealtorAboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Home, number: "500+", label: "Homes Sold", color: "from-blue-500 to-cyan-500" },
    { icon: Users, number: "1000+", label: "Happy Clients", color: "from-purple-500 to-pink-500" },
    { icon: Award, number: "15+", label: "Years Experience", color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, number: "$50M+", label: "Total Sales", color: "from-orange-500 to-red-500" }
  ];

  const services = [
    {
      icon: Home,
      title: "Luxury Home Sales",
      description: "Specializing in high-end residential properties with premium marketing strategies.",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: Key,
      title: "First-Time Buyers",
      description: "Guiding new homeowners through every step of their purchase journey.",
      color: "from-green-600 to-green-400"
    },
    {
      icon: TrendingUp,
      title: "Investment Properties",
      description: "Identifying profitable real estate opportunities for savvy investors.",
      color: "from-purple-600 to-purple-400"
    },
    {
      icon: Heart,
      title: "Relocation Services",
      description: "Making your move seamless whether across town or across the country.",
      color: "from-pink-600 to-pink-400"
    }
  ];

  const achievements = [
    "Top 1% Realtor Nationwide",
    "Million Dollar Producer - 5 Years",
    "Client Satisfaction Award 2023",
    "Certified Luxury Home Specialist",
    "Real Estate Technology Pioneer",
    "Community Service Excellence"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${-mousePosition.x * 0.08}px, ${mousePosition.y * 0.05}px)`,
            right: '10%',
            bottom: '20%'
          }}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm">
                <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
                <span className="text-sm font-medium text-slate-700">Award-Winning Realtor</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent animate-pulse">
                  Amit
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Gupta
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 max-w-2xl leading-relaxed">
                Transforming dreams into addresses with 
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> passion</span>, 
                <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> expertise</span>, and 
                <span className="font-semibold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent"> dedication</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Schedule Consultation
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
             
            </div>
          </div>

          {/* Profile Image with Animation */}
          <div className="relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500 animate-pulse" />
              <div className="relative w-96 h-96 mx-auto bg-gradient-to-br from-slate-100 to-white rounded-3xl shadow-2xl overflow-hidden border border-white/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                <div className="flex items-center justify-center h-full">
                  <div className="w-80 h-80 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                    <Users className="w-32 h-32 text-slate-400" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" data-animate className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
                <div className="relative text-center space-y-4">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${stat.color} rounded-2xl text-white transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Story Section */}
      <section id="story" data-animate className="py-20 px-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center space-y-12 transition-all duration-1000 ${isVisible.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                My Story
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>
            
            <div className="prose prose-lg mx-auto text-slate-700 leading-relaxed">
              <p className="text-xl mb-6">
                With over 15 years of experience in luxury real estate, I've built my reputation on three core principles: 
                <span className="font-semibold text-blue-600"> integrity</span>, 
                <span className="font-semibold text-purple-600"> innovation</span>, and 
                <span className="font-semibold text-pink-600"> results</span>.
              </p>
              
              <p className="text-lg mb-6">
                Starting my career in 2008 during one of the most challenging real estate markets, I learned early that success comes from understanding each client's unique needs and exceeding their expectations. This philosophy has led to over $50 million in sales and countless satisfied families.
              </p>
              
              <p className="text-lg">
                When I'm not helping clients find their perfect home, you'll find me volunteering at local community centers, exploring the latest real estate technology, or spending time with my family exploring the beautiful neighborhoods that make our city special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" data-animate className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`space-y-16 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Services & Expertise
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 cursor-pointer ${
                    activeService === index ? 'ring-2 ring-blue-400 shadow-2xl' : ''
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
                  <div className="relative space-y-4">
                    <div className={`inline-flex p-4 bg-gradient-to-r ${service.color} rounded-2xl text-white transform group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" data-animate className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className={`space-y-12 transition-all duration-1000 ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Recognition & Awards
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" data-animate className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center space-y-12 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Let's turn your real estate dreams into reality. Contact me today for a personalized consultation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* Phone */}
  <div className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
    <a href="tel:+919867828977" className="flex items-center gap-3">
      <Phone className="w-6 h-6 text-blue-600" />
      <span className="text-slate-700 font-medium">+91 98678 28977</span>
    </a>
  </div>

  {/* Email */}
  <div className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
    <a href="mailto:dynamicrealtors99@gmail.com" className="flex items-center gap-3">
      <Mail className="w-6 h-6 text-purple-600" />
      <span className="text-slate-700 font-medium">dynamicrealtors99@gmail.com</span>
    </a>
  </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
    <a
      href="https://maps.app.goo.gl/F6Eudri5AmJmw3kU9"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3"
    >
      <MapPin className="w-6 h-6 text-pink-600" />
      <span className="text-slate-700 font-medium">Location</span>
    </a>
  </div>
            </div>

            <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-3xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10 flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                Schedule Your Consultation Today
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </div>
      </section>

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="group w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse">
          <Phone className="w-6 h-6 mx-auto group-hover:animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default RealtorAboutPage;