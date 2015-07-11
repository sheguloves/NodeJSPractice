var http = require("http");
var url = require("url");
/*
 * 这种实现方式的问题是：当未来有请求处理程序需要进行非阻塞操作的时候，我们的应用就“挂”了
 * 请看requestHandler的实现
 * 测试方法：
 * 1. 打开一个浏览器窗口，输入：http://localhost:8888/start,但是不打开
 * 2. 打开另一个浏览器窗口，输入：http://localhost:8888/upload,但是不打开
 * 3. 在第一个窗口（/start）按下回车，让start执行，快速切换到第二个窗口（/upload），也按回车
 * 4. /start执行了10秒，/upload也执行了10秒
 */
function start(route, handler) {
    function onRequest(request, response) {
        //TODO: this log will be show twice at first time becasue most of
        //server will try to access favicon.ico in server root folder.
        //Research how to prevent this behavior
        var pathname = url.parse(request.url).pathname;
        console.log("Request from " + pathname + " received.");

        response.writeHead(200, {"Content-type": "text/plain"});
        var content = route(handler, pathname);
        response.write(content);
        response.end();
    }

    http.createServer(onRequest).listen(8888);

    console.log("Server Started!");
}

exports.start = start;

