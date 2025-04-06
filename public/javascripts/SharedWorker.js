let d = null;
let c = 0;

self.onconnect = event => {
    const port = event.ports[0];
    //每個主程式看到相同的時間
    if(d == null){
        d = new Date();
    }
    //每個主程式看到c累加的結果
    c++
    port.onmessage= event =>{
        const name = event.data.name;
        const data =`${name}, 您好，時間：${d.toString()} 連線數：${c.toString()}` ;
        
        port.postMessage(data);
    }
    //port.start();
}