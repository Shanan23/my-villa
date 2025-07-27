import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useVilla } from '../../contexts/VillaContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  Home, 
  Star, 
  TrendingUp, 
  Calendar,
  Plus,
  Settings,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { villas, fetchVillas, loading } = useVilla();
  const [stats, setStats] = useState({
    totalVillas: 0,
    activeVillas: 0,
    featuredVillas: 0,
    totalUsers: 0
  });

  useEffect(() => {
    console.log('🔄 AdminDashboard loaded - Updated version!');
    fetchVillas();
  }, [fetchVillas]);

  useEffect(() => {
    if (villas) {
      console.log('📊 Updating stats with villas:', villas.length);
      setStats({
        totalVillas: villas.length,
        activeVillas: villas.filter(v => v.status === 'active').length,
        featuredVillas: villas.filter(v => v.rating?.average >= 4).length,
        totalUsers: 3 // Hardcoded for now
      });
    }
  }, [villas]);

  const quickActions = [
    {
      title: 'Add New Villa',
      description: 'Create a new villa listing',
      icon: Plus,
      href: '/admin/villas/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Manage Villas',
      description: 'View and edit all villas',
      icon: Home,
      href: '/admin/villas',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts',
      icon: Users,
      href: '/admin/users',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Analytics',
      description: 'View detailed statistics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const recentActivity = [
    {
      action: 'New villa added',
      description: 'Luxury Beachfront Villa was created',
      time: '2 hours ago',
      type: 'villa'
    },
    {
      action: 'User registered',
      description: 'New user john@example.com joined',
      time: '4 hours ago',
      type: 'user'
    },
    {
      action: 'Villa updated',
      description: 'Mountain Retreat Villa was modified',
      time: '1 day ago',
      type: 'villa'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.username || 'Admin'}! Here's what's happening with your villa platform.</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              ✅ Updated Dashboard
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Villas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVillas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Villas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeVillas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Featured Villas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.featuredVillas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className={`flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors ${action.color} text-white`}
                >
                  <action.icon className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'villa' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">API Server: Online</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">Database: Connected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">Authentication: Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 