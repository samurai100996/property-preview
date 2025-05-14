import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FiShare2, FiHeart, FiMapPin, FiHome, FiLayers } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProperty(docSnap.data());
        } else {
          setError("Property not found");
        }
      } catch (err) {
        console.error("Firestore error:", err);
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>No property data</div>;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <div className="flex items-center text-gray-600 mt-2">
          <FiMapPin className="mr-1" />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Image Gallery & Main Info (Top Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <img 
                src={property.images[0]} 
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {property.images.slice(1, 5).map((img, i) => (
              <img 
                key={i} 
                src={img} 
                className="h-40 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Amenities */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.amenities.map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    {item.icon || <FiHome />}
                  </div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Price & Inquiry */}
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold">${property.price.toLocaleString()}</span>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-gray-100">
                <FiShare2 />
              </button>
              <button className="p-2 rounded-full bg-gray-100">
                <FiHeart />
              </button>
            </div>
          </div>

          {/* Inquiry Form */}
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-3 border rounded-lg"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 border rounded-lg"
            />
            <input 
              type="tel" 
              placeholder="Phone" 
              className="w-full p-3 border rounded-lg"
            />
            <textarea 
              placeholder="Message" 
              rows="4" 
              className="w-full p-3 border rounded-lg"
            />
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Send Inquiry
            </button>
          </form>

          {/* Agent Info */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center">
              <img 
                src={property.agent.photo} 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h4 className="font-medium">{property.agent.name}</h4>
                <p className="text-sm text-gray-600">Agent</p>
              </div>
            </div>
            <button className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded-lg">
              Contact Agent
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700">{property.description}</p>

          {/* Details Table */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-b pb-2">
                <span className="text-gray-600">Property Type</span>
                <p>{property.type}</p>
              </div>
              <div className="border-b pb-2">
                <span className="text-gray-600">Bedrooms</span>
                <p>{property.bedrooms}</p>
              </div>
              {/* Add more details... */}
            </div>
          </div>
        </div>

        {/* Area Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Area</h2>
          <div className="space-y-4">
            <div>
              <span className="text-gray-600">Built Area</span>
              <p>{property.area} sqft</p>
            </div>
            {/* Add more area info... */}
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map through similar properties... */}
        </div>
      </div>
    </div>
  );
};
export default PropertyDetails;