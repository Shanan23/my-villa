import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Star,
  Heart,
  Wifi,
  Car,
  Waves
} from 'lucide-react';

const VillaCard = ({ villa }) => {
  const mainImage = villa.images?.find(img => img.isMain)?.url || villa.images?.[0]?.url || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAmenityIcon = (amenity) => {
    const amenityIcons = {
      wifi: Wifi,
      parking: Car,
      pool: Waves,
    };
    return amenityIcons[amenity.toLowerCase()] || null;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card-hover group"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={villa.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-lg font-bold text-gray-900">
            {formatPrice(villa.price)}
          </div>
          <div className="text-xs text-gray-600">per night</div>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {villa.category}
          </span>
        </div>

        {/* Rating */}
        {villa.rating?.average > 0 && (
          <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">
              {villa.rating.average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <Link to={`/villas/${villa._id}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
              {villa.title}
            </h3>
          </Link>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">
              {villa.location.city}, {villa.location.country}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {villa.description}
        </p>

        {/* Features */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{villa.features.guests} guests</span>
            </div>
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{villa.features.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{villa.features.bathrooms} baths</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        {villa.amenities && villa.amenities.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            {villa.amenities.slice(0, 3).map((amenity, index) => {
              const Icon = getAmenityIcon(amenity);
              return Icon ? (
                <div key={index} className="flex items-center text-gray-500">
                  <Icon className="w-4 h-4" />
                </div>
              ) : null;
            })}
            {villa.amenities.length > 3 && (
              <span className="text-xs text-gray-500">
                +{villa.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Availability Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              villa.availability?.isAvailable 
                ? 'bg-green-500' 
                : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-600">
              {villa.availability?.isAvailable ? 'Available' : 'Not Available'}
            </span>
          </div>
          
          <Link
            to={`/villas/${villa._id}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VillaCard; 