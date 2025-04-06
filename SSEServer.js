const http = require('http');

// 建立伺服器
const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    // 設定 SSE 標頭
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*' // 允許所有來源

    });
  
    // 格式化時間函式
    const getFormattedTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    const intervalId = setInterval(() => {
      const time = getFormattedTime();
      res.write(`id: ${Date.now()} \n`);
      res.write(`data: ${time}\n\n`);
    }, 1000);

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
  console.log('SSE server running at http://localhost:8080/events');
});



