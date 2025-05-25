import { useParams } from 'react-router';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { 
  Home, 
  MapPin, 
  Bed, 
  Car, 
  Maximize, 
  Calendar,
  Phone,
  Building,
  User,
  Mail,
  MessageCircle,
  Check,
  Wifi,
  Dumbbell,
  Shield,
  Waves,
  Trees,
  Zap,
  Wind,
  Camera,
  Users
} from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Amenity icons mapping
  const amenityIcons = {
    'wifi': Wifi,
    'gym': Dumbbell,
    'security': Shield,
    'parking': Car,
    'swimming pool': Waves,
    'garden': Trees,
    'power backup': Zap,
    'ac': Wind,
    'cctv': Camera,
    'club house': Users,
    'elevator': Building,
    'playground': Users
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.files && Array.isArray(data.files)) {
            data.images = data.files.map(file => file.url);
          }
          setProperty(data);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        console.error('Firestore error:', err);
        setError('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'enquiries'), {
        ...formData,
        propertyId: id,
        propertyTitle: property?.title || 'Unknown Property',
        createdAt: new Date(),
      });

      setFormStatus('Enquiry submitted successfully!');
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setFormStatus('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center animate-fade-in">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <p className="text-gray-600 animate-fade-in">No property data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section with Fade In Animation */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-500">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 hover:text-gray-700 transition-colors duration-300">
                  {property.bedrooms || 'N/A'} BHK {property.type || 'Property'} for {property.purpose || 'Sale'}
                </h1>
                <div className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  <p>"{property.title}" in {property.location}, {property.city}, {property.state}, {property.country}, {property.zipCode}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 animate-pulse">
                  ₹{property.price ? property.price.toLocaleString() : 'Price on request'}
                </div>
                <div className="text-sm text-gray-500">
                  {property.pricePerSqft && `₹${property.pricePerSqft}/sqft`}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Column */}
          <div className="xl:w-2/3 space-y-8">
            {/* Image Gallery with Hover Effects */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
                {property.images && property.images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    className="h-96 lg:h-[500px]"
                  >
                    {property.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative overflow-hidden group">
                          <img
                            src={img}
                            alt={`Property ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>No Images Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Details Cards */}
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Quick Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-lg font-semibold text-gray-900">{property.bedrooms || '-'}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Maximize className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-lg font-semibold text-gray-900">{property.area || '-'}</div>
                    <div className="text-sm text-gray-600">Built Area (sqft)</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Maximize className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-lg font-semibold text-gray-900">{property.carpetArea || '-'}</div>
                    <div className="text-sm text-gray-600">Carpet Area (sqft)</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Car className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-lg font-semibold text-gray-900">{property.parking || '0'}</div>
                    <div className="text-sm text-gray-600">Car Parking</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity.toLowerCase()] || Building;
                      return (
                        <div 
                          key={index} 
                          className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                          style={{ animationDelay: `${0.1 * index}s` }}
                        >
                          <IconComponent className="w-4 h-4 mr-2 text-gray-600" />
                          <span className="text-sm text-gray-700 capitalize">{amenity}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-2 text-center text-gray-500 py-4">
                      No amenities listed
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">About This Property</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description || 'No description available for this property.'}
                </p>
              </div>
            </div>

            {/* Detailed Specifications */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Property Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: 'Property Type', value: property.type, icon: Home },
                  { label: 'Bedrooms', value: property.bedrooms, icon: Bed },
                  { label: 'Built Area', value: property.area ? `${property.area} sqft` : '-', icon: Maximize },
                  { label: 'Carpet Area', value: property.carpetArea ? `${property.carpetArea} sqft` : '-', icon: Maximize },
                  { label: 'Car Parking', value: property.parking || '0', icon: Car },
                  { label: 'Facing', value: property.facing || '-', icon: Wind }
                ].map((detail, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex items-center mb-2">
                      <detail.icon className="w-5 h-5 mr-2 text-gray-600" />
                      <span className="text-sm text-gray-600">{detail.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{detail.value || '-'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="xl:w-1/3">
            <div className="sticky top-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
                {/* Agent Info */}
                <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {property.agent?.name || 'Property Agent'}
                      </h3>
                      <p className="text-gray-300 text-sm">{property.agent?.company || 'Real Estate Professional'}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{property.agent?.phone || 'Contact for details'}</span>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Get In Touch</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Interested in this property? Fill out the form below and we'll get back to you soon.
                  </p>

                  <div className="space-y-4" onSubmit={handleSubmit}>
                    <div className="group">
                      <label className="block text-gray-700 mb-2 text-sm font-medium">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-300" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-gray-700 mb-2 text-sm font-medium">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-300" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-gray-700 mb-2 text-sm font-medium">Message</label>
                      <div className="relative">
                        <MessageCircle className="absolute left-3 top-4 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-300" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="I'm interested in this property..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-none"
                          rows="4"
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div
                      onClick={handleSubmit}
                      className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer text-center"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Enquiry
                        </div>
                      )}
                    </div>
                  </div>

                  {formStatus && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                      <div className="flex items-center text-green-700">
                        <Check className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formStatus}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Posted Date */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      Posted on: {property.createdAt ? new Date(property.createdAt.toDate()).toLocaleDateString() : 'Unknown date'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .group:focus-within .group-focus-within\\:text-gray-600 {
          color: #4b5563;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default PropertyDetails;