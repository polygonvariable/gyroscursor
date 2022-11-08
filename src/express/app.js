var express = require('express');
var path = require("path"); 
var app = express();
var { getCursorPosition, setCursorPosition, sendCursorEvent, cursorEvents } = require("node-cursor");
const http = require('http').Server(app);
const io = require('socket.io')(http);

//
app.use('/shared', express.static(path.join(__dirname, './../../shared')));

app.get("/remote", function(req, res) {
    res.sendFile("./../shared/index.html")
});

//
io.on('connection', function(socket) {

    //console.log('Remote connected');

    socket.on("onPositionUpdate", function(data) {

        let _mouse_location = getCursorPosition();
        _mouse_location.x += data.x;
        _mouse_location.y += data.y;
        setCursorPosition(_mouse_location);

    });
    socket.on('CursorRightClick', function() {
        
        let _mouse_location = getCursorPosition();
        sendCursorEvent({ event: cursorEvents.LEFT_DOWN, data: 0, x: _mouse_location.x, y: _mouse_location.y });
        sendCursorEvent({ event: cursorEvents.LEFT_UP, data: 0, x: _mouse_location.x, y: _mouse_location.y });

    });
    socket.on('CursorRightDoubleClick', function() {
        
        
        let _mouse_location = getCursorPosition();
        sendCursorEvent({ event: cursorEvents.LEFT_DOWN, data: 0, x: _mouse_location.x, y: _mouse_location.y });
        sendCursorEvent({ event: cursorEvents.LEFT_DOWN, data: 0, x: _mouse_location.x, y: _mouse_location.y });

    });

    socket.on('disconnect', function() {
       console.log('Remote disconnected');
    });

});
 
//
http.listen(process.env.PORT || 3000, function() {
    console.log('listening on *:3000');
});