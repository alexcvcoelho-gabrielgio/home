update = function (data) {
    $('#' + data.uuid + 'lat').text(data.lat)
    $('#' + data.uuid + 'long').text(data.long)
    $('#' + data.uuid + 'gas').text(data['gas-lvl'])
    $('#' + data.uuid + 'vel').text(data.vel)
}

var ws = new WebSocket('ws://localhost:5000/info');
ws.onopen = function () {
    console.log('socket connection opened properly');
};

ws.onmessage = function (evt) {
    var data = JSON.parse(evt.data);

    for (i in data) {
        update(data[i])
    }
};

ws.onclose = function () {
    // websocket is closed.
    console.log("Connection closed...");
};