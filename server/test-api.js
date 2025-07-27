const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Villa API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Login with Editor
    console.log('2. Testing Login with Editor...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'editor@villalux.com',
      password: 'editor123'
    });
    console.log('✅ Login Response Status:', loginResponse.status);
    console.log('✅ Login Response Headers:', loginResponse.headers['content-type']);
    console.log('✅ Login Response Data:', {
      message: loginResponse.data.message,
      user: {
        username: loginResponse.data.user?.username,
        email: loginResponse.data.user?.email,
        role: loginResponse.data.user?.role
      },
      hasToken: !!loginResponse.data.token
    });
    console.log('');

    // Test 3: Get Villas (should work without auth)
    console.log('3. Testing Get Villas...');
    const villasResponse = await axios.get(`${API_BASE}/villas`);
    console.log('✅ Villas Response Status:', villasResponse.status);
    console.log('✅ Villas Response Headers:', villasResponse.headers['content-type']);
    console.log('✅ Villas Count:', villasResponse.data.villas?.length || 0);
    console.log('');

    // Test 4: Get Featured Villas
    console.log('4. Testing Get Featured Villas...');
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