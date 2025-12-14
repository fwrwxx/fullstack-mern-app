const http = require('http');

async function makeRequest(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const time = Date.now() - start;
        resolve({ status: res.statusCode, time });
      });
    });
    req.on('error', () => resolve({ status: 0, time: 0 }));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ status: 0, time: 0 });
    });
  });
}

async function runTest() {
  console.log('Початок тесту...');
  const results = [];
  const requests = 100; // Всього 100 запитів
  
  for (let i = 1; i <= requests; i++) {
    const result = await makeRequest('http://localhost:3001/health');
    results.push(result);
    
    if (i % 20 === 0) {
      console.log(`   Виконано: ${i} запитів`);
    }
    await new Promise(r => setTimeout(r, 50)); // Затримка 50мс
  }
  
  // Аналіз
  const success = results.filter(r => r.status === 200).length;
  const avgTime = results.reduce((sum, r) => sum + r.time, 0) / results.length;
  
  console.log('\n Результати:');
  console.log(`   Успішних запитів: ${success}/${requests}`);
  console.log(`   Середній час: ${avgTime.toFixed(2)}ms`);
  console.log(`   Помилок: ${requests - success}`);
  
  if (avgTime > 200) {
    console.log('Увага: середній час більше 200ms');
  }
}

runTest();