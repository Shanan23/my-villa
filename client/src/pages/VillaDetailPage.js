import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useVilla } from '../contexts/VillaContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const VillaDetailPage = () => {
  const { id } = useParams();
  const { fetchVilla } = useVilla();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVilla = async () => {
      try {
        const villaData = await fetchVilla(id);
        setVilla(villaData);
      } catch (error) {
        console.error('Error loading villa:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVilla();
  }, [id, fetchVilla]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Villa Not Found</h1>
          <p className="text-gray-600">The villa you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Villa Images */}
          <div className="relative h-96 bg-gray-200">
            {villa.images && villa.images.length > 0 ? (
              <img
                src={villa.images[0].url}
                alt={villa.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          {/* Villa Content */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{villa.title}</h1>
              <p className="text-gray-600 mb-4">{villa.location.city}, {villa.location.country}</p>
              <div className="text-2xl font-bold text-primary-600">
                ${villa.price} / night
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{villa.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-medium">{villa.features.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-medium">{villa.features.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{villa.features.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-medium">{villa.features.area} sq ft</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {villa.amenities && villa.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    villa.availability?.isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-gray-600">
                    {villa.availability?.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <button className="btn-primary">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetailPage; 