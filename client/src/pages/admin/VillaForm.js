import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useVilla } from '../../contexts/VillaContext';
import axios from '../../config/api';
import { 
  Save, 
  X, 
  Upload, 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
  DollarSign,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminVillaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchVilla, createVilla, updateVilla, loading } = useVilla();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    status: 'active',
    location: {
      address: '',
      city: '',
      country: '',
      coordinates: {
        lat: '',
        lng: ''
      }
    },
    features: {
      bedrooms: '',
      bathrooms: '',
      guests: '',
      area: ''
    },
    amenities: [],
    images: []
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      setIsEditing(true);
      loadVilla();
    }
  }, [id]);

  const loadVilla = async () => {
    try {
      const villa = await fetchVilla(id);
      setFormData({
        title: villa.title || '',
        description: villa.description || '',
        price: villa.price || '',
        category: villa.category || '',
        status: villa.status || 'active',
        location: {
          address: villa.location?.address || '',
          city: villa.location?.city || '',
          country: villa.location?.country || '',
          coordinates: {
            lat: villa.location?.coordinates?.lat || '',
            lng: villa.location?.coordinates?.lng || ''
          }
        },
        features: {
          bedrooms: villa.features?.bedrooms || '',
          bathrooms: villa.features?.bathrooms || '',
          guests: villa.features?.guests || '',
          area: villa.features?.area || ''
        },
        amenities: villa.amenities || [],
        images: villa.images || []
      });
      setUploadedImages(villa.images || []);
    } catch (error) {
      toast.error('Failed to load villa data');
      navigate('/admin/villas');
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleLocationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const handleFeaturesChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [field]: value
      }
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setImageUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      const response = await axios.post('/api/admin/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newImages = response.data.images.map(img => ({
        url: img.url,
        caption: '',
        isMain: uploadedImages.length === 0 // First image is main by default
      }));

      setUploadedImages(prev => [...prev, ...newImages]);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));

      toast.success('Images uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload images');
      console.error('Error uploading images:', error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSetMainImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const villaData = {
        ...formData,
        price: Number(formData.price),
        features: {
          ...formData.features,
          bedrooms: Number(formData.features.bedrooms),
          bathrooms: Number(formData.features.bathrooms),
          guests: Number(formData.features.guests),
          area: Number(formData.features.area)
        },
        location: {
          ...formData.location,
          coordinates: {
            lat: Number(formData.location.coordinates.lat),
            lng: Number(formData.location.coordinates.lng)
          }
        }
      };

      if (isEditing) {
        await updateVilla(id, villaData);
        toast.success('Villa updated successfully!');
      } else {
        await createVilla(villaData);
        toast.success('Villa created successfully!');
      }
      
      navigate('/admin/villas');
    } catch (error) {
      toast.error('Failed to save villa');
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonAmenities = [
    'WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Pool', 'Gym',
    'Beach Access', 'Mountain View', 'Garden', 'BBQ', 'Fireplace',
    'Washing Machine', 'Dishwasher', 'TV', 'Netflix', 'Balcony'
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Edit Villa' : 'Add New Villa'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Update villa information' : 'Create a new villa listing'}
            </p>
          </div>
          <Link
            to="/admin/villas"
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Villa Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Luxury Beachfront Villa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Beachfront">Beachfront</option>
                  <option value="Mountain">Mountain</option>
                  <option value="City">City</option>
                  <option value="Countryside">Countryside</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Night (USD) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="450"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the villa, its features, and what makes it special..."
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location.address}
                  onChange={(e) => handleLocationChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Beach Road"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location.city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bali"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location.country}
                  onChange={(e) => handleLocationChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Indonesia"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Bed className="w-4 h-4 mr-2" />
                  Bedrooms *
                </label>
                <input
                  type="number"
                  required
                  value={formData.features.bedrooms}
                  onChange={(e) => handleFeaturesChange('bedrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Bath className="w-4 h-4 mr-2" />
                  Bathrooms *
                </label>
                <input
                  type="number"
                  required
                  value={formData.features.bathrooms}
                  onChange={(e) => handleFeaturesChange('bathrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Guests *
                </label>
                <input
                  type="number"
                  required
                  value={formData.features.guests}
                  onChange={(e) => handleFeaturesChange('guests', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sq ft) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.features.area}
                  onChange={(e) => handleFeaturesChange('area', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="350"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2" />
              Villa Images
            </h2>
            
            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 ${
                    imageUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imageUploading ? 'Uploading...' : 'Choose Images'}
                </label>
                {imageUploading && <LoadingSpinner size="sm" />}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Upload up to 10 images. First image will be set as main image.
              </p>
            </div>

            {/* Image Gallery */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Villa ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(index)}
                          className={`p-1 rounded ${
                            image.isMain 
                              ? 'bg-yellow-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-yellow-500 hover:text-white'
                          }`}
                          title={image.isMain ? 'Main Image' : 'Set as Main'}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="p-1 rounded bg-white text-red-600 hover:bg-red-500 hover:text-white"
                          title="Remove Image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {image.isMain && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {commonAmenities.map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/admin/villas"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Villa' : 'Create Villa')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminVillaForm; 