import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'enquiries'));
        const enquiriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnquiries(enquiriesData);
      } catch (err) {
        console.error('Error fetching enquiries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading enquiries...</p>;
  }

  return (
    <div className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Enquiries</h1>
        {enquiries.length === 0 ? (
          <p className="text-center">No enquiries found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enquiries.map((enquiry) => (
              <div key={enquiry.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{enquiry.name}</h3>
                <p className="text-gray-600">{enquiry.phone}</p>
                <p className="text-gray-600">{enquiry.message}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Property: {enquiry.propertyTitle}
                </p>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(enquiry.createdAt.seconds * 1000).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiries;