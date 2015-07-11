var http = require("http");
var url = require("url");

function start(route, handler) {
    function onRequest(request, response) {
        //TODO: this log will be show twice at first time becasue most of
        //server will try to access favicon.ico in server root folder.
        //Research how to prevent this behavior
        var pathname = url.parse(request.url).pathname;
        console.log("Request from " + pathname + " received.");

        route(handler, pathname, response);
    }

    http.createServer(onRequest).listen(8888);

    console.log("Server Started!");
}

exports.start = start;

