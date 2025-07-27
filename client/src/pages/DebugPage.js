import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DebugPage = () => {
  const { user, isAuthenticated, loading, token } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Debug Information</h1>
          
          <div className="space-y-6">
            {/* Authentication Status */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Authentication Status</h2>
              <div className="space-y-2">
                <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
                <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
                <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'No token'}</p>
              </div>
            </div>

            {/* User Information */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">User Information</h2>
              {user ? (
                <div className="space-y-2">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Is Active:</strong> {user.isActive ? 'Yes' : 'No'}</p>
                  <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                  <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</p>
                </div>
              ) : (
                <p className="text-red-600">No user data available</p>
              )}
            </div>

            {/* Role Hierarchy */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Role Hierarchy</h2>
              <div className="space-y-2">
                <p><strong>Viewer:</strong> Level 0 - Basic access</p>
                <p><strong>Editor:</strong> Level 1 - Can manage villas</p>
                <p><strong>Admin:</strong> Level 2 - Full access</p>
              </div>
            </div>

            {/* Access Test */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Access Test</h2>
              <div className="space-y-2">
                <p><strong>Can access /admin:</strong> {user?.role === 'admin' ? 'Yes' : 'No'}</p>
                <p><strong>Can access /admin/villas:</strong> {['admin', 'editor'].includes(user?.role) ? 'Yes' : 'No'}</p>
                <p><strong>Can access /admin/users:</strong> {user?.role === 'admin' ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Quick Actions</h2>
              <div className="space-x-4">
                <a 
                  href="/admin" 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Try Admin Dashboard
                </a>
                <a 
                  href="/admin/villas" 
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Try Admin Villas
                </a>
                <a 
                  href="/admin/users" 
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Try Admin Users
                </a>
              </div>
            </div>

            {/* Raw User Data */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Raw User Data</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage; 