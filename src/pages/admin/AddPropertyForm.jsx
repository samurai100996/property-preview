import React, { useState, useCallback } from 'react';
import { db } from '../../firebase'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore';
import { FaHandHoldingWater } from "react-icons/fa";
import { FaPersonSwimming,FaPersonShelter , FaCar} from "react-icons/fa6";
import { PiElevatorDuotone } from "react-icons/pi";
import { GiPoliceOfficerHead } from "react-icons/gi";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FiWifi, FiCoffee, FiTv, FiAirplay, FiX } from 'react-icons/fi';

const AddPropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    type: '',
    facing:'',
    videoUrl:'',
    bedrooms: '',
    parking:'',
    area: '',
    carpetarea:'',
    plotsize:'',
    files: [], // To store uploaded file URLs
    amenities: [],
    videoUrl:'',
    agent: {
      name: 'Amit Gupta',
      photo: '',
    },
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [fileErrors, setFileErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleAmenity = (amenityName) => {
    setFormData(prevState => {
      if (prevState.amenities.includes(amenityName)) {
        return {
          ...prevState,
          amenities: prevState.amenities.filter(a => a !== amenityName)
        };
      } else {
        return {
          ...prevState,
          amenities: [...prevState.amenities, amenityName]
        };
      }
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files); // Get the selected files
    if (files.length === 0) return;
  
    console.log('Selected files:', files); // Debug log
  
    // Reset any previous errors
    setFileErrors([]);
  
    // Check file sizes (limit to 5MB per file)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
  
    if (oversizedFiles.length > 0) {
      setFileErrors(oversizedFiles.map((file) => `${file.name} exceeds the 5MB size limit`));
      console.error('Oversized files:', oversizedFiles); // Debug log
      return;
    }
  
    setIsUploading(true);
    const storage = getStorage(); // Initialize Firebase Storage
    const uploadedFiles = [...formData.files]; // Start with existing files
  
    // Initialize progress tracking for each file
    const initialProgress = {};
    files.forEach((file) => {
      initialProgress[file.name] = 0;
    });
    setUploadProgress(initialProgress);
  
    const processFile = async (file) => {
      try {
        // Create a unique file name
        const randomId = Math.random().toString(36).substring(2, 8);
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${Date.now()}-${randomId}-${safeFileName}`;
        
        // Create a reference to Firebase Storage
        const storageRef = ref(storage, `properties/${fileName}`);
  
        console.log(`Uploading file: ${fileName}`); // Debug log
  
        // Start the upload task
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Calculate and update progress
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              console.log(`Progress for ${file.name}: ${progress}%`); // Debug log
              
              setUploadProgress((prevProgress) => ({
                ...prevProgress,
                [file.name]: progress,
              }));
            },
            (error) => {
              // Handle errors
              console.error(`Error uploading ${file.name}:`, error); // Debug log
              setFileErrors((prev) => [...prev, `Failed to upload ${file.name}: ${error.message}`]);
              reject(error);
            },
            async () => {
              try {
                // Get the download URL after successful upload
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log(`File uploaded successfully: ${downloadURL}`); // Debug log
                
                // Return the file info with URL, type, and name
                resolve({ 
                  url: downloadURL, 
                  type: file.type,
                  name: file.name // Include the original file name
                });
              } catch (error) {
                console.error(`Error getting download URL for ${file.name}:`, error); // Debug log
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        console.error(`Error setting up upload for ${file.name}:`, error); // Debug log
        setFileErrors((prev) => [...prev, `Error setting up upload for ${file.name}: ${error.message}`]);
        return null;
      }
    };
  
    try {
      // Process each file sequentially
      const uploadPromises = files.map(file => processFile(file));
      const uploadedFileResults = await Promise.all(uploadPromises);
      
      // Filter out null results (failed uploads)
      const successfulUploads = uploadedFileResults.filter(Boolean);
      
      // Add new uploads to the existing files
      setFormData((prevState) => ({
        ...prevState,
        files: [...prevState.files, ...successfulUploads],
      }));
  
      console.log('All files uploaded successfully:', [...uploadedFiles, ...successfulUploads]); // Debug log
    } catch (error) {
      console.error('Error in upload process:', error); // Debug log
    } finally {
      setIsUploading(false);
      // Clear progress after a delay for better UX
      setTimeout(() => {
        setUploadProgress({});
      }, 2000);
    }
  };

  // Function to remove a file from the uploaded files
  const removeFile = useCallback((indexToRemove) => {
    setFormData(prevState => ({
      ...prevState,
      files: prevState.files.filter((_, index) => index !== indexToRemove)
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isUploading) {
      alert('Please wait for images to finish uploading');
      return;
    }

    try {
      console.log('Files to Save:', formData.files);
      
      // Create a copy of the form data to submit
      const propertyData = {
        ...formData,
      carpetarea: Number(formData.carpetarea),
      facing: formData.facing.toLowerCase(), // Ensure consistent casing
        createdAt: new Date(),
      };
      
      // Save to Firestore
      await addDoc(collection(db, 'properties'), propertyData);

      alert('Property added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        location: '',
        price: '',
        description: '',
        type: '',
        facing:'',
        videoUrl:'',
        bedrooms: '',
        parking:'',
        area: '',
        carpetarea:'',
        plotsize:'',
        files: [],
        amenities: [],
        videoUrl:'',
        agent: {
          name: '',
          photo: '',
        },
      });
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
    { name: 'Parking', icon: <FaCar /> },
    { name: 'Swimming Pool', icon: <FaPersonSwimming /> },
    {name:'24x7 Water Supply',icon:<FaHandHoldingWater/>},
    {name:'Lift',icon:<PiElevatorDuotone/>},
    {name:'Security',icon:<GiPoliceOfficerHead/>},
    {name:'Servent Room',icon:<FaPersonShelter/>},


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
             type="interger"
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
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Duplex">Duplex</option>
            <option value="Studio">Studio</option>
            <option value="Row House">Row House</option>
            <option value="Independent House">Independent House</option>
            <option value="Mansion">Mansion</option>
          </select>
        </div>

  {/* facing */}
  <div>
          <label className="block text-sm font-medium mb-1">Facing</label>
          <select
            name="facing"
            value={formData.facing}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select facing</option>
            <option value="....">....</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="South-East">South-East</option>
            <option value="Sounth-West">Sounth-West</option>
            <option value="North-West">North-West</option>
            <option value="North-East">North-East</option>
           

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

{/* Car parking */}
<div>
          <label className="block text-sm font-medium mb-1">Car Parking</label>
          <input
            type="number"
            name="parking"
            value={formData.parking}
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
 {/* Carpet Area */}
 <div>
          <label className="block text-sm font-medium mb-1">Carpet Area (sqft)</label>
          <input
            type="number"
            name="carpetarea"
            value={formData.carpetarea}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter built area"
            required
          />
        </div>
         {/* Plot Size */}
 <div>
          <label className="block text-sm font-medium mb-1">Plot Size (sqft)</label>
          <input
            type="number"
            name="plotsize"
            value={formData.plotsize}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter built area"
            required
          />
        </div>
        
        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Images/Videos</label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="w-full p-3 border rounded-lg"
            disabled={isUploading}
            accept="image/*,video/*"
          />
          <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Recommended: JPG, PNG for images.</p>
          
          {/* File upload progress */}
          {isUploading && Object.keys(uploadProgress).length > 0 && (
            <div className="mt-2">
              <p className="text-blue-600 font-medium">Uploading files... Please don't close this page.</p>
              <div className="space-y-2 mt-2">
                {Object.entries(uploadProgress).map(([fileName, progress]) => (
                  <div key={fileName} className="flex flex-col">
                    <div className="flex justify-between text-xs">
                      <span className="truncate max-w-xs">{fileName}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Upload errors */}
          {fileErrors.length > 0 && (
            <div className="mt-2 p-2 border border-red-300 bg-red-50 rounded">
              <p className="text-red-600 font-medium text-sm">Upload issues:</p>
              <ul className="list-disc list-inside text-xs text-red-600">
                {fileErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Uploaded files preview */}
          {formData.files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Uploaded files ({formData.files.length})</h4>
              <div className="flex flex-wrap gap-2">
                {formData.files.map((file, index) => (
                  <div key={index} className="w-24 h-24 bg-gray-200 rounded overflow-hidden relative group">
                    {file.type?.startsWith('image/') ? (
                      <img src={file.url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-white text-xs">Video</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-70 hover:opacity-100"
                    >
                      <FiX size={12} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 truncate">
                      {file.name || `File ${index + 1}`}
                    </div>
                  </div>
                ))}
              </div>
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
{/* YouTube Video Link */}
<div>
  <label className="block text-sm font-medium mb-1">YouTube Video Link</label>
  <input
    type="url"
    name="videoUrl"
    value={formData.videoUrl}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg"
    placeholder="Paste YouTube video URL (e.g. https://youtu.be/...)"
    pattern="^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11,}"
    title="Please enter a valid YouTube video URL"
  />
</div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading Files...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyForm;