import React, { useEffect } from 'react';
import { useVilla } from '../contexts/VillaContext';
import VillaCard from '../components/villas/VillaCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const VillaListPage = () => {
  const { villas, fetchVillas, loading } = useVilla();

  useEffect(() => {
    fetchVillas();
  }, [fetchVillas]);

  // Debug logging
  console.log('VillaListPage - villas:', villas);
  console.log('VillaListPage - loading:', loading);
  console.log('VillaListPage - villas type:', typeof villas);
  console.log('VillaListPage - villas isArray:', Array.isArray(villas));
  
  // Ensure villas is always an array
  const safeVillas = Array.isArray(villas) ? villas : [];
  console.log('VillaListPage - safeVillas:', safeVillas);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Villas</h1>
          <p className="text-gray-600">Discover our collection of luxury villas</p>
        </div>

        {safeVillas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No villas found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeVillas.map((villa) => (
              <VillaCard key={villa._id} villa={villa} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VillaListPage; 