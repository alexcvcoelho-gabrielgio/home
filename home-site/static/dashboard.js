markers = []
var facens = {lat: -23.469742, lng: -47.429808};

map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: facens
});

function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

dicMarker = {}

updateMarker = function (data) {
    if (dicMarker[data.uuid]) {
        dicMarker[data.uuid].setPosition({lat: data.lat, lng: data.long})
    }
    else {
        dicMarker[data.uuid] = new google.maps.Marker({
            position: {lat: data.lat, lng: data.long},
            map: map
        });
    }
}

clearMap = function () {
    for (i in markers) {
        markers[i].setMap(null)
    }
}
var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function () {
    console.log('socket connection opened properly');
});

socket.on('message', function (data) {
    for (i in data) {
        updateMarker(data[i])
    }
});