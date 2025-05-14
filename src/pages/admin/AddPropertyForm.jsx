import React, { useState } from 'react';
import { db } from '../../firebase'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore';
import { FiWifi, FiCoffee, FiTv, FiAirplay, FiDroplet } from 'react-icons/fi';
// import { uploadPropertyImages } from '../../services/storage';

const AddPropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    type: '',
    bedrooms: '',
    area: '',
    images: [],
    amenities: [],
    agent: {
      name: '',
      photo: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const toggleAmenity = (amenity) => {
    setFormData((prevState) => {
      const amenities = prevState.amenities.includes(amenity)
        ? prevState.amenities.filter((a) => a !== amenity)
        : [...prevState.amenities, amenity];
      return { ...prevState, amenities };
    });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
    //         // Upload images to Firebase Storage
    // const imageUrls = await uploadPropertyImages(formData.images);

          // Save property data to Firestore
          const docRef = await addDoc(collection(db, 'properties'), {
            ...formData,
            images: formData.images.map((file) => file.name), // Placeholder for image URLs
            createdAt: new Date(),
          });
          console.log('Property added with ID:', docRef.id);
      
          // Reset form after successful submission
          setFormData({
            title: '',
            location: '',
            price: '',
            description: '',
            type: '',
            bedrooms: '',
            area: '',
            images: [],
            amenities: [],
            agent: {
              name: '',
              photo: '',
            },
          });
          alert('Property added successfully!');
        } catch (error) {
          console.error('Error adding property:', error);
          alert('Failed to add property. Please try again.');
        }
      };

  const availableAmenities = [
    { name: 'WiFi', icon: <FiWifi /> },
    { name: 'Coffee Maker', icon: <FiCoffee /> },
    { name: 'TV', icon: <FiTv /> },
    { name: 'Air Conditioning', icon: <FiAirplay /> },
    { name: 'Parking', icon: <FiCoffee /> },
    { name: 'Swimming Pool', icon: <FiDroplet /> },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Property Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter property title"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter property location"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter property price"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter property description"
            rows="4"
            required
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Property Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select property type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter number of bedrooms"
            required
          />
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-medium mb-1">Built Area (sqft)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter built area"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full p-3 border rounded-lg"
          />
          {formData.images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                  <p className="text-xs text-gray-600">{image.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium mb-1">Amenities</label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {availableAmenities.map((amenity) => (
              <button
                type="button"
                key={amenity.name}
                onClick={() => toggleAmenity(amenity.name)}
                className={`flex items-center justify-center p-3 border rounded-lg ${
                  formData.amenities.includes(amenity.name)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <span className="mr-2">{amenity.icon}</span>
                {amenity.name}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddPropertyForm;