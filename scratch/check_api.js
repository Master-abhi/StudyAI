const http = require('http');

function checkApi() {
  console.log('Sending GET request to http://localhost:3000/api/user/badges ...');
  
  http.get('http://localhost:3000/api/user/badges', (res) => {
    console.log('Response status:', res.statusCode);
    console.log('Response headers:', JSON.stringify(res.headers, null, 2));
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('\nFirst 200 characters of body:');
      console.log(data.substring(0, 200));
    });
  }).on('error', (err) => {
    console.error('Request failed:', err.message);
  });
}

checkApi();
