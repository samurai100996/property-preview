import { useParams } from 'react-router';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Helmet } from "react-helmet";
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
  Users,
  Compass,
  ChevronLeft,
  Share2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  X
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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [areAmenitiesExpanded, setAreAmenitiesExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

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
    if (property?.images?.[0]) {
      // Set initial image meta tags when property loads
      const imageUrl = property.images[0];
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', imageUrl);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', imageUrl);
    }
  }, [property]);
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

  const handleShare = async (platform) => {
    const imageUrl = getAbsoluteImageUrl(property.images?.[0]);
    const currentUrl = window.location.href.split('?')[0];
    
    // Update meta tags immediately before sharing
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', imageUrl);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', imageUrl);
    
    const title = `${property.bedrooms} BHK ${property.type} in ${property.location}`;
    const text = `Check out this property: ${title}`;
  
    try {
      switch (platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(`${title}\n\n${text}\n\n${currentUrl}`)}`, '_blank');
          break;
          
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
          break;
          
        case 'native':
          if (navigator.share) {
            await navigator.share({
              title,
              text,
              url: currentUrl
            });
          }
          break;
          
        default:
          await navigator.clipboard.writeText(`${title}\n\n${currentUrl}`);
          setShareMessage('Link copied!');
      }
    } catch (err) {
      console.error('Sharing failed:', err);
      setShareMessage('Error sharing');
    }
  
    setTimeout(() => setShareMessage(''), 3000);
  };
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };
// Add this above your component
const getAbsoluteImageUrl = (url) => {
  if (!url) return 'https://dynamicrealtors.in/logo.png'; // Fallback to your logo
  
  // Fix Firebase Storage URL encoding issues
  let cleanUrl = url
    .replace(/%252F/g, '/')
    .replace(/%253F/g, '?')
    .replace(/%253D/g, '=')
    .replace(/%2526/g, '&');
    
  // Add cache busting parameter
  return `${cleanUrl}?v=${new Date().getTime()}`;
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center animate-fade-in">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <p className="text-gray-600 animate-fade-in">No property data available</p>
      </div>
    );
  }

  function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
<Helmet>
  {/* Primary Meta Tags */}
  <title>{`${property.bedrooms} BHK ${property.type} for ${property.purpose} in ${property.location}`}</title>
  <meta name="description" content={property.description || `Beautiful ${property.type} in ${property.location}`} />
  
  {/* Open Graph / Facebook */}
  <meta property="og:url" content={window.location.href.split('?')[0]} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={`${property.bedrooms} BHK ${property.type} | ${property.location}`} />
  <meta property="og:description" content={property.description || `Premium ${property.type} for ${property.purpose}`} />
  <meta property="og:image" content={getAbsoluteImageUrl(property.images?.[0])} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={`${property.bedrooms} BHK ${property.type} in ${property.location}`} />
  <meta property="og:site_name" content="Dynamic Realtors" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${property.bedrooms} BHK ${property.type} | ${property.location}`} />
  <meta name="twitter:description" content={property.description || `Premium ${property.type} for ${property.purpose}`} />
  <meta name="twitter:image" content={getAbsoluteImageUrl(property.images?.[0])} />
</Helmet>
      {/* Mobile Header with Navigation */}

      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900 text-center flex-1 mx-4 truncate">
            {property.bedrooms || 'N/A'} BHK {property.type || 'Property'}
          </h1>
          <div className="relative">
            <button 
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
            {showShareMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-60 min-w-48">
                <div className="py-2">
                  {navigator.share && (
                    <button
                      onClick={() => handleShare('native')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Share2 className="w-4 h-4 mr-3" />
                      Share via...
                    </button>
                  )}
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-3" />
                    Copy Link
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-3" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Facebook className="w-4 h-4 mr-3" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Twitter className="w-4 h-4 mr-3" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Linkedin className="w-4 h-4 mr-3" />
                    LinkedIn
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Message */}
      {shareMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm z-60 animate-fade-in">
          {shareMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Desktop Header Section */}
        <div className="mb-6 md:mb-8 animate-fade-in-up hidden md:block" style={{ animationDelay: '0.1s' }}>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 hover:text-gray-700 transition-colors duration-300">
                  {property.bedrooms || 'N/A'} BHK {property.type || 'Property'} for {property.purpose || 'Sale'}
                </h1>
                <div className="flex items-start text-gray-600 hover:text-gray-800 transition-colors duration-300">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm lg:text-base">"{property.title}" in 📍{property.location} {property.city} {property.state} {property.country} {property.zipCode}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-left lg:text-right">
                  <div className="text-xl lg:text-2xl font-bold text-green-600 animate-pulse">
                    ₹{property.price ? property.price.toLocaleString() : 'Price on request'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {property.pricePerSqft && `₹${property.pricePerSqft}/sqft`}
                  </div>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                  {showShareMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-60 min-w-48">
                      <div className="py-2">
                        {navigator.share && (
                          <button
                            onClick={() => handleShare('native')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <Share2 className="w-4 h-4 mr-3" />
                            Share via...
                          </button>
                        )}
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-3" />
                          Copy Link
                        </button>
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <MessageCircle className="w-4 h-4 mr-3" />
                          WhatsApp
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Facebook className="w-4 h-4 mr-3" />
                          Facebook
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Twitter className="w-4 h-4 mr-3" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Linkedin className="w-4 h-4 mr-3" />
                          LinkedIn
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="xl:w-2/3 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Mobile Price Banner */}
            <div className="md:hidden bg-white rounded-lg shadow-md p-4 border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-1">
                ₹{property.price ? property.price.toLocaleString() : 'Price on request'}
              </div>
              {property.pricePerSqft && (
                <div className="text-sm text-gray-500">₹{property.pricePerSqft}/sqft</div>
              )}
              <div className="flex items-start text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">"{property.title}" in {property.location}</p>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
                {property.images && property.images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                      enabled: window.innerWidth > 768
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    className="h-64 sm:h-80 lg:h-96 xl:h-[500px]"
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
                          {/* Mobile image counter */}
                          <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs md:hidden">
                            {index + 1} / {property.images.length}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm sm:text-base">No Images Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {/* Quick Stats */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 flex items-center">
                  <Home className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Quick Details
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Bed className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{property.bedrooms || '-'}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Maximize className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{property.area || '-'}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Built Area (sqft)</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Maximize className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{property.carpetarea || '-'}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Carpet Area (sqft)</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Maximize className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{property.plotsize || '-'}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Plot Size (sqft)</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <Car className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{property.parking || '0'}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Car Parking</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">Amenities</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {property.amenities && property.amenities.length > 0 ? (
                    <>
                      {(areAmenitiesExpanded ? property.amenities : property.amenities.slice(0, 6)).map((amenity, index) => {
                        const IconComponent = amenityIcons[amenity.toLowerCase()] || Building;
                        return (
                          <div 
                            key={index} 
                            className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                            style={{ animationDelay: `${0.1 * index}s` }}
                          >
                            <IconComponent className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-700 capitalize">{amenity}</span>
                          </div>
                        );
                      })}
                      {property.amenities.length > 6 && (
                        <button
                          onClick={() => setAreAmenitiesExpanded(!areAmenitiesExpanded)}
                          className="flex items-center justify-center p-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-300"
                        >
                          {areAmenitiesExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              +{property.amenities.length - 6} more
                            </>
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      <p className="text-sm">No amenities listed</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          {/* Video Section */}
{property.videoUrl && getYouTubeId(property.videoUrl) && (
  <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-500">
    <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">▶️ Property Tour Video 🔻</h2>
    <a
      href={property.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition relative"
    >
      <img
        src={`https://img.youtube.com/vi/${getYouTubeId(property.videoUrl)}/hqdefault.jpg`}
        alt="YouTube Video Thumbnail"
        className="w-full object-cover"
      />
      {/* Play Button Overlay */}
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-16 h-16 text-white opacity-90 drop-shadow-lg"
          fill="currentColor"
          viewBox="0 0 84 84"
        >
          <circle cx="42" cy="42" r="42" fill="rgba(0,0,0,0.5)" />
          <polygon points="34,28 60,42 34,56" fill="white" />
        </svg>
      </span>
    </a>
  </div>
)}

            {/* Description */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">About This Property</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description ? (
                    isDescriptionExpanded ? 
                      property.description : 
                      truncateText(property.description, 200)
                  ) : 'No description available for this property.'}
                </p>
                {property.description && property.description.length > 200 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="inline-flex items-center mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Read Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Read More
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Detailed Specifications */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900">Property Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {[
                  { label: 'Property Type', value: property.type, icon: Home },
                  { label: 'Bedrooms', value: property.bedrooms, icon: Bed },
                  { label: 'Built Area', value: property.area ? `${property.area} sqft` : '-', icon: Maximize },
                  { label: 'Carpet Area', value: property.carpetarea ? `${property.carpetarea} sqft` : '-', icon: Maximize },
                  { label: 'Plot Size', value: property.plotsize ? `${property.plotsize} sqft` : '-', icon: Maximize },
                  { label: 'Car Parking', value: property.parking || '0', icon: Car },
                  { label: 'Facing', value: property.facing, icon: Compass }
                ].map((detail, index) => (
                  <div 
                    key={index} 
                    className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex items-center mb-2">
                      <detail.icon className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-gray-600" />
                      <span className="text-xs sm:text-sm text-gray-600">{detail.label}</span>
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{detail.value || '-'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="xl:w-1/3">
            <div className="sticky top-4 sm:top-6">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900 flex items-center">
                  <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
                  Contact Agent
                </h3>
                
                {/* Agent Info */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <User className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-gray-600" />
                    <span className="font-medium text-gray-900">Property Agent</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+91 98678 28977</span>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm resize-none"
                      placeholder="I'm interested in this property..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Enquiry'
                    )}
                  </button>

                  {formStatus && (
                    <div className={`p-3 rounded-lg text-sm animate-fade-in ${
                      formStatus.includes('successfully') 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      <div className="flex items-center">
                        {formStatus.includes('successfully') ? (
                          <Check className="w-4 h-4 mr-2" />
                        ) : (
                          <X className="w-4 h-4 mr-2" />
                        )}
                        {formStatus}
                      </div>
                    </div>
                  )}
                </form>

                {/* Quick Contact Buttons */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:++91 98678 28977"
                      className="flex items-center justify-center py-2.5 px-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/+919867828977?text=Hi, I'm interested in the ${property?.bedrooms} BHK ${property?.type} property in ${property?.location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center py-2.5 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Property Summary Card */}
              <div className="mt-4 sm:mt-6 bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-500">
                <h4 className="font-semibold text-gray-900 mb-3">Property Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID:</span>
                    <span className="text-gray-900 font-medium">#{id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="text-gray-900 font-medium">{property?.type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purpose:</span>
                    <span className="text-gray-900 font-medium">{property?.purpose || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Built Area:</span>
                    <span className="text-gray-900 font-medium">{property?.area ? `${property.area} sqft` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carpet Area:</span>
                    <span className="text-gray-900 font-medium">{property?.carpetarea ? `${property.carpetarea} sqft` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plot size:</span>
                    <span className="text-gray-900 font-medium">{property?.plotsize ? `${property.plotsize} sqft` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Facing:</span>
                    <span className="text-gray-900 font-medium">{property?.facing || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-green-600 font-bold">
                      ₹{property?.price ? property.price.toLocaleString() : 'On Request'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       {/* Location & Map Section */}
<div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 flex items-center">
    <MapPin className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
    Location Details
  </h2>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    <div className="space-y-3">
      <div className="p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Complete Address</div>
        <div className="font-medium text-gray-900">
          {property?.title && `"${property.title}"`}
          {property?.location && ` ${property.location}`}
          {property?.city && `, ${property.city}`}
          {property?.state && `, ${property.state}`}
          {property?.country && `, ${property.country}`}
          {property?.zipCode && ` - ${property.zipCode}`}
        </div>
        {/* Show location as a clickable link to Google Maps */}
        {property?.location && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 hover:underline text-sm"
          >
            View on Google Maps
          </a>
        )}
      </div>

      {property?.nearbyPlaces && property.nearbyPlaces.length > 0 && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Nearby Places</div>
          <div className="space-y-1">
            {property.nearbyPlaces.slice(0, 5).map((place, index) => (
              <div key={index} className="text-sm text-gray-700 flex items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                {place}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-48">
      {property?.location ? (
        <iframe
          title="Google Map"
          width="100%"
          height="200"
          className="rounded-lg border-0"
          src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
          allowFullScreen
        ></iframe>
      ) : (
        <div className="text-center text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Interactive Map</p>
          <p className="text-xs">Would be integrated with Google Maps</p>
        </div>
      )}
    </div>
  </div>
</div>
        {/* Similar Properties Section */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-500">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Similar Properties</h2>
          <div className="text-center py-8 text-gray-500">
            <Building className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Similar properties would be displayed here</p>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden z-40">
        <div className="flex gap-3">
          <a
            href="tel:+91 98678 28977"
            className="flex-1 flex items-center justify-center py-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-all duration-300 active:scale-95"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </a>
          <a
            href={`https://wa.me/+919867828977?text=Hi, I'm interested in the ${property?.bedrooms} BHK ${property?.type} property in ${property?.location}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
        
        /* Swiper customization */
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.8);
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: white;
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px;
        }
        
        /* Responsive bottom padding for mobile action bar */
        @media (max-width: 768px) {
          body {
            padding-bottom: 80px;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
};

export default PropertyDetails;