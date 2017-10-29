update = function (data) {
    $('#' + data.uuid + 'lat').text(data.lat)
    $('#' + data.uuid + 'long').text(data.long)
    $('#' + data.uuid + 'gas').text(data['gas-lvl'])
    $('#' + data.uuid + 'vel').text(data.vel)
}

var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function () {
    console.log('socket connection opened properly');
});

socket.on('message', function (data) {
    for (i in data) {
        update(data[i])
    }
});