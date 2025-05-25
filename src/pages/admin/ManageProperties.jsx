import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AddPropertyForm from './AddPropertyForm';

const ManageProperties = () => {
  const [activeTab, setActiveTab] = useState('add'); // State to toggle between tabs
  const [properties, setProperties] = useState([]); // State to store properties

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propertiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertiesData);
    };

    fetchProperties();
  }, []);

  // Delete a property
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteDoc(doc(db, 'properties', id));
      setProperties((prev) => prev.filter((property) => property.id !== id));
    }
  };

  return (
    <div className="manage-properties p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Properties</h1>

      {/* Tabs for toggling views */}
      <div className="tabs flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded ${
            activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-500`}
        >
          Add New
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-4 py-2 rounded ${
            activeTab === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-500`}
        >
          Edit Properties
        </button>
      </div>

      {/* Conditional rendering based on activeTab */}
      <div className="content bg-white p-4 rounded shadow">
        {activeTab === 'add' && <AddPropertyForm />}
        {activeTab === 'edit' && <EditPropertyList properties={properties} onDelete={handleDelete} />}
      </div>
    </div>
  );
};

// EditPropertyList Component
const EditPropertyList = ({ properties, onDelete }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Edit Property List</h2>
    {properties.length === 0 ? (
      <p>No properties found.</p>
    ) : (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td className="border border-gray-300 p-2">{property.title}</td>
              <td className="border border-gray-300 p-2">{property.location}</td>
              <td className="border border-gray-300 p-2">₹ {property.price}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => onDelete(property.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default ManageProperties;