const http = require('http');
const request = require('request');

// 建立伺服器
const server = http.createServer((req, res) => {
  if (req.url === '/youbike') {
    // 設定 SSE 標頭
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*' // 允許所有來源
    });

    // 設定重試間隔為 5000 毫秒 (5 秒)
    res.write('retry: 5000\n\n');

    
    const intervalId = setInterval(() => {
     //取得YouBike資料
     //request HTTPClient 
      request('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json', {encoding: null}, function(err, response, body){
        res.write(`data: ${body.toString()}\n\n`);       
      });     
    }, 1000 * 60);

    // 客戶端斷線處理
    req.on('close', () => {
      clearInterval(intervalId); // 清除計時器
      console.log('Client disconnected');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// 監聽 8080 端口
server.listen(8080, () => {
  console.log('SSE server running at http://localhost:8080/youbike');
});

