const chetMap = {
    LOGIN: 'login',
    SEND: 'send',
    LOGOUT: 'logout',
}

var ws = require("nodejs-websocket")
 
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    // 接受客户端传递的信息，str 就是信息
    conn.on("text", function (info) {
        console.log(info)
        const {type, message, userName} = JSON.parse(info);
        switch(type) {
            case chetMap.LOGIN: 
                conn.nickName = userName;
                broadcast(JSON.stringify({
                    type: chetMap.LOGIN,
                    status: 200,
                    message: userName + '加入了聊天室'
                }))
            break;
            case chetMap.SEND:
                broadcast(JSON.stringify({
                    type: chetMap.SEND,
                    status: 200,
                    message: userName + '对大家说：' + message
                }))
            break;
            default:
                broadcast(JSON.stringify({
                    type: chetMap.LOGIN,
                    status: 200,
                    message: '不太对劲啊'
                }))
        }
    })

    // 尝试服务器直接给客户端发消息
    conn.sendText(JSON.stringify({
        message: '我这边是服务器'
    }))

    // 链接关闭时执行
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })

    conn.on('error', function(){
        broadcast(JSON.stringify({
            message: '聊天室关闭'
        }))
    })
}).listen(8001)

function broadcast(data) {
    server.connections.forEach(conn => {
        conn.sendText(data)
    })
}