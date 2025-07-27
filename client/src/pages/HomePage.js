import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Star,
  ArrowRight,
  Play
} from 'lucide-react';
import { useVilla } from '../contexts/VillaContext';
import VillaCard from '../components/villas/VillaCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const { 
    featuredVillas, 
    fetchFeaturedVillas, 
    loading 
  } = useVilla();

  useEffect(() => {
    fetchFeaturedVillas();
  }, [fetchFeaturedVillas]);

  const heroStats = [
    { label: 'Luxury Villas', value: '500+' },
    { label: 'Happy Guests', value: '10K+' },
    { label: 'Countries', value: '25+' },
    { label: '5-Star Reviews', value: '2K+' },
  ];

  const features = [
    {
      icon: '🏖️',
      title: 'Beachfront Paradise',
      description: 'Wake up to the sound of waves in our stunning beachfront villas.'
    },
    {
      icon: '🏔️',
      title: 'Mountain Retreats',
      description: 'Escape to the mountains with breathtaking views and fresh air.'
    },
    {
      icon: '🏙️',
      title: 'City Luxury',
      description: 'Experience urban sophistication in the heart of vibrant cities.'
    },
    {
      icon: '🌿',
      title: 'Eco-Friendly',
      description: 'Sustainable luxury that respects our beautiful planet.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Dream Villa
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Experience luxury like never before. From beachfront paradises to mountain retreats, 
                find your perfect escape with VillaLux.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/villas"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                >
                  <span>Explore Villas</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Play className="w-5 h-5" />
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Luxury Villa"
                  className="w-full h-96 md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating Search Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Your Perfect Villa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Where to?"
                        className="input pl-10 bg-white"
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select className="input pl-10 bg-white">
                        <option>Guests</option>
                        <option>1-2</option>
                        <option>3-4</option>
                        <option>5+</option>
                      </select>
                    </div>
                    <button className="btn-primary">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VillaLux?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer more than just accommodation. We provide unforgettable experiences 
              in the world's most beautiful locations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Villas Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Villas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of the most luxurious and sought-after villas.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredVillas.slice(0, 6).map((villa, index) => (
                <motion.div
                  key={villa._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <VillaCard villa={villa} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/villas"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <span>View All Villas</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied guests who have discovered their perfect villa with VillaLux. 
              Start planning your dream vacation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/villas"
                className="btn-secondary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-100"
              >
                Browse Villas
              </Link>
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 