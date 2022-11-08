var express = require("express");
var path = require("path"); 
var app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//
app.use("/shared", express.static(path.join(__dirname, "./../../shared")));

//
io.on("connection", function(socket) {

    console.log("Remote connected");

    socket.on("onPositionUpdate", function(data) {
        socket.emit("emitPositionUpdate", data);
    });
    socket.on("onRightClick", function() {
        socket.emit("emitRightClick");
    });
    socket.on("onDoubleClick", function() {
        socket.emit("emitDoubleClick");
    });

    socket.on("disconnect", function() {
       console.log("Remote disconnected");
    });

});
 
//
http.listen(process.env.PORT || 3000, function() {
    console.log("listening on *:3000");
});