const axios = require('axios');

const API_BASE = 'https://api-villa.nahsbyte.my.id/api';

async function testAPI() {
  console.log('🧪 Testing Villa API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Login with Admin
    console.log('2. Testing Login with Admin...');
    const adminLoginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@villalux.com',
      password: 'admin123'
    });
    console.log('✅ Admin Login Response Status:', adminLoginResponse.status);
    console.log('✅ Admin Login Response Headers:', adminLoginResponse.headers['content-type']);
    console.log('✅ Admin Login Response Data:', {
      message: adminLoginResponse.data.message,
      user: {
        username: adminLoginResponse.data.user?.username,
        email: adminLoginResponse.data.user?.email,
        role: adminLoginResponse.data.user?.role
      },
      hasToken: !!adminLoginResponse.data.token
    });
    console.log('');

    // Test 3: Login with Editor
    console.log('3. Testing Login with Editor...');
    const editorLoginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'editor@villalux.com',
      password: 'editor123'
    });
    console.log('✅ Editor Login Response Status:', editorLoginResponse.status);
    console.log('✅ Editor Login Response Headers:', editorLoginResponse.headers['content-type']);
    console.log('✅ Editor Login Response Data:', {
      message: editorLoginResponse.data.message,
      user: {
        username: editorLoginResponse.data.user?.username,
        email: editorLoginResponse.data.user?.email,
        role: editorLoginResponse.data.user?.role
      },
      hasToken: !!editorLoginResponse.data.token
    });
    console.log('');

    // Test 4: Get Villas (should work without auth)
    console.log('4. Testing Get Villas...');
    const villasResponse = await axios.get(`${API_BASE}/villas`);
    console.log('✅ Villas Response Status:', villasResponse.status);
    console.log('✅ Villas Response Headers:', villasResponse.headers['content-type']);
    console.log('✅ Villas Count:', villasResponse.data.villas?.length || 0);
    console.log('');

    // Test 5: Get Featured Villas
    console.log('5. Testing Get Featured Villas...');
    const featuredResponse = await axios.get(`${API_BASE}/villas/featured/list`);
    console.log('✅ Featured Villas Response Status:', featuredResponse.status);
    console.log('✅ Featured Villas Response Headers:', featuredResponse.headers['content-type']);
    console.log('✅ Featured Villas Count:', featuredResponse.data?.length || 0);
    console.log('');

    console.log('🎉 All API tests completed successfully!');

  } catch (error) {
    console.error('❌ API Test Failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testAPI(); 