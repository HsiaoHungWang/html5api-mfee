﻿//https://www.npmjs.com/package/websocket
//https://gist.github.com/martinsik/2031681

var WebSocketServer = require('websocket').server,
    http = require('http'),
    clients = [],  //記錄所有連線的client
    users = [];    //記錄所有連線的使用者

//建立 HTTP Server
var server = http.createServer(function (request, response) {
    
});

//http://localhost:8080
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

//建立 WebSocket Server
wsServer = new WebSocketServer({
    httpServer: server,    
});

//綁定request事件，用來接收使用者請求
wsServer.on('request', function (request) {   
    //接受連線，產生連線物件
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    //console.log(connection);
    //把產生的連線物件存到clients陣列中
    clients.push(connection);

    var userName = "guest"
        index = 0;

   //連線成功要綁定一個message事件，用來接收WebSocket Client傳送過來的資料
    connection.on('message', function (message) {
        //console.log('Received Message: ' + message.utf8Data);
        //接收文字資料 message.utf8Data
         var data = JSON.parse(message.utf8Data); //我們的範例 WebSocket Client是傳送 SON Data 到 WebSocket Server

         var json = ""; //json變數裡面的資料是要傳給 WebSocket Client

        if(data["name"] != null){
            userName = data["name"]; 
            console.log((new Date()) + userName + " 登入");
            
            json= {time:(new Date()).getTime(),text: userName + " 登入",name:userName};
        }else{
            console.log((new Date()) + " " + userName + " 說：" +  data["message"]);

            json = {time:(new Date()).getTime(),text:data["message"],name:userName};

        }

        //todo 聊天的資料要寫進資料庫


            //廣播給所有人
            for(var i=0,max=clients.length;i<max;i++){
              clients[i].sendUTF(JSON.stringify(json));
            }
        
       

        
        //connection.sendUTF(JSON.stringify(users));
    });

    //使用者關閉連線會觸發close事件
    connection.on('close', function (reasonCode, description) {
        users.splice(index, 1);  //splice(開始位置,刪除幾筆)刪除陣列中的元素
        console.log((new Date()) + userName + connection.remoteAddress + ' disconnected.');
    });
});