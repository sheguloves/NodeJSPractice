var http = require("http");

function start() {
    function onRequest(request, response) {
        //TODO: this log will be show twice at first time becasue most of
        //server will try to access favicon.ico in server root folder.
        console.log("Request received.");
        response.writeHead(200, {"Content-type": "text/plain"});
        response.write("Hello world!");
        response.end();
    }

    http.createServer(onRequest).listen(8888);

    console.log("Server Started!");
}

exports.start = start;

