const socket  = require("socket.io-client").io("https://gyroscursor");

//const socket = io("https://gyroscursor.onrender.com/socket.io/")

//
socket.on("connect", function(s) {

    console.log("conned")

});

socket.on("emitPositionUpdate", function(data) {

    console.log(data)
    let _mouse_location = getCursorPosition();
    _mouse_location.x += data.x;
    _mouse_location.y += data.y;
    setCursorPosition(_mouse_location);

});
socket.on("emitRightClick", function() {

    let _mouse_location = getCursorPosition();
    sendCursorEvent({ event: cursorEvents.LEFT_DOWN, data: 0, x: _mouse_location.x, y: _mouse_location.y });
    sendCursorEvent({ event: cursorEvents.LEFT_UP, data: 0, x: _mouse_location.x, y: _mouse_location.y });

});
socket.on("onDoubleClick", function() {

    let _mouse_location = getCursorPosition();
    sendCursorEvent({ event: cursorEvents.LEFT_DOWN, data: 0, x: _mouse_location.x, y: _mouse_location.y });
    sendCursorEvent({ event: cursorEvents.LEFT_DOWN, data: 0, x: _mouse_location.x, y: _mouse_location.y });

});

socket.on("disconnect", function() {
   console.log("Remote disconnected");
});