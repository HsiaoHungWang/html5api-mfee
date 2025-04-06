//接收主程式傳過來的資料
self.addEventListener("message",function(event){
    //大量計算程式
    
    var name = event.data.name //{"name":"Eric"}
    //將計算完的結果傳給主程式
    self.postMessage("Hello " + name);
})