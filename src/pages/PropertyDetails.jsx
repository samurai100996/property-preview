import { useParams } from 'react-router';
import { FiHome, FiMapPin, FiDroplet, FiLayers, FiUser, FiPhone } from 'react-icons/fi';

const PropertyDetails = () => {
  // This will come from backend/API later
  const { id } = useParams();
  
  // Temporary data - replace with API call later
  const property = {
    id: id,
    title: "4 BHK Luxury Villa with Contemporary Fusion",
    description: "4 BHK Luxury villa with Contemporary Fusion and with Private swimming pool... which is a coastal town famous as a tourist and happening Spot in North Goa (India). The beach of Mandrem lies between the twin beaches of Norjim and Aramedi. This place is covered with lush green and quite peaceful.",
    type: "4 BHK Others Villa, Residential",
    status: "Villa For Sale",
    location: "Mandrem Road, Mandrem, Goa, India, 403519",
    date: "30-09-2024",
    features: {
      bathrooms: 3,
      furnished: "Furnished",
      livingRooms: 1,
      kitchen: 1,
      bedrooms: 4
    },
    area: {
      property: "213 Sq. Meters",
      carpet: "183 Sq. Meters",
      builtUp: "203 Sq. Meters",
      superBuiltUp: "414 Sq. Meters"
    },
    contact: {
      name: "Sanjay Aswani",
      phone: "+357934977125",
      company: "Excob Realty India Pvt. Ltd."
    },
    similarProperties: [
      { id: 1, title: "4 BHK Villa", location: "9 Salun, Goa, India, 403519" },
      { id: 2, title: "5 BHK Villa", location: "Mandrem, Goa, India" },
      { id: 3, title: "3 BHK Villa", location: "Arambol, Goa, India" }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <FiMapPin className="mr-1" />
          <span>{property.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
            <FiHome className="mr-1" /> {property.type}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {property.status}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery - Placeholder for now */}
          <div className="bg-gray-200 h-96 rounded-lg mb-6 flex items-center justify-center text-gray-500">
            [Property Image Gallery]
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FiDroplet className="text-blue-500 mr-2" />
                <span>{property.features.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <FiHome className="text-blue-500 mr-2" />
                <span>{property.features.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <FiLayers className="text-blue-500 mr-2" />
                <span>{property.features.furnished}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">🛋️</span>
                <span>{property.features.livingRooms} Living Room</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">🍳</span>
                <span>{property.features.kitchen} Kitchen</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="text-blue-500 mr-2" />
                <span>Posted: {property.date}</span>
              </div>
            </div>
          </div>

          {/* About Property */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About Property</h2>
            <p className="text-gray-700">{property.description}</p>
          </div>

          {/* Area Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Area</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-600">Property Area</h3>
                <p className="text-lg">{property.area.property}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">Carpet Area</h3>
                <p className="text-lg">{property.area.carpet}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">Built Up Area</h3>
                <p className="text-lg">{property.area.builtUp}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">Super Built Up Area</h3>
                <p className="text-lg">{property.area.superBuiltUp}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="space-y-6">
          {/* Contact Person */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mr-3">
                <FiUser className="text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold">{property.contact.name}</h3>
                <p className="text-sm text-gray-600">{property.contact.company}</p>
              </div>
            </div>
            <a 
              href={`tel:${property.contact.phone}`}
              className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPhone className="mr-2" /> {property.contact.phone}
            </a>
          </div>

          {/* Enquiry Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Enquire now</h2>
            <p className="text-gray-600 mb-4">
              Fill up the form below to enquire now. The owner/realtor will get in touch with you.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-100 text-gray-600 rounded-l-lg">
                    +91
                  </span>
                  <input 
                    type="tel" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="consent" 
                  className="mr-2"
                />
                <label htmlFor="consent" className="text-gray-600">
                  I agree to receive communication regarding property enquiry.
                </label>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Enquiry
              </button>
            </form>
          </div>

          {/* Similar Properties */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">More Properties</h2>
            <div className="space-y-4">
              {property.similarProperties.map((similar) => (
                <div key={similar.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium">{similar.title}</h3>
                  <p className="text-sm text-gray-600">{similar.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;