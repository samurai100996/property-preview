import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Transform the files array to just URLs if needed
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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;
  if (!property) return <div className="text-center py-20">No property data</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Property Title Section */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {property.bedrooms || 'N/A'} BHK {property.type || 'Property'} for {property.purpose || 'Sale'}
        </h1>
        <p className="text-gray-600 mt-1">
          "{property.title}" in {property.location}, {property.city}, {property.state}, {property.country}, {property.zipCode}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Image Gallery and Description */}
        <div className="lg:w-2/3">
          {/* Image Slider */}
          <div className="mb-8">
            {property.images && property.images.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                className="rounded-lg shadow-md"
              >
                {property.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`Property ${index + 1}`}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                <p className="text-gray-500">No Images Available</p>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">About Property</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {property.description || 'No description available.'}
            </p>
          </div>

          {/* Details Section */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-gray-600 block">Property Type</span>
                <span className="font-medium">{property.type || '-'}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Bedrooms</span>
                <span className="font-medium">{property.bedrooms || '-'}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Built Area</span>
                <span className="font-medium">{property.area ? `${property.area} sqft` : '-'}</span>
              </div>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>

        {/* Right Column - Agent and Inquiry Form */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            {/* Agent Information */}
            <div className="mb-6 pb-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {property.agent?.name || 'Unknown Agent'}
              </h3>
              <p className="text-gray-600 mt-1">{property.agent?.phone || 'No phone provided'}</p>
              <p className="text-gray-600 mt-1">
                {property.agent?.company || 'No company provided'}
              </p>
            </div>

            {/* Inquiry Form */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Enquire now</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Fill up the form below to enquire now. The owner/agent will get in touch with you soon.
              </p>

              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-2 border rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Phone Number</label>
                  <div className="flex">
                    <select className="p-2 border rounded-l-md bg-gray-100 text-sm w-20">
                      <option>+91</option>
                      <option>+1</option>
                      <option>+44</option>
                    </select>
                    <input
                      type="tel"
                      className="w-full p-2 border-t border-r border-b rounded-r-md text-sm"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="consent" className="text-gray-600 text-xs">
                    I agree to receive communication regarding this enquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Posted Date */}
            <div className="mt-6 pt-6 border-t text-xs text-gray-500">
              Posted on: {property.createdAt ? new Date(property.createdAt.toDate()).toLocaleDateString() : 'Unknown date'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;