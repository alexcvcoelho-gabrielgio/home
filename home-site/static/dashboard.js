SlidingMarker.initializeGlobally();

markers = [];
dicMarker = {};
var facens = {lat: -23.469742, lng: -47.429808};

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

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

updateMarker = function (data) {
    if (dicMarker[data.uuid]) {
        dicMarker[data.uuid].setPosition({lat: data.lat, lng: data.long})

    }
    else {
        dicMarker[data.uuid] = new google.maps.Marker({
            position: {lat: data.lat, lng: data.long},
            map: map
        });
        dicMarker[data.uuid].tag = data;
        dicMarker[data.uuid].addListener('click', function () {
            drawLine(dicMarker[data.uuid].getPosition(), {lat: data["des-lat"], lng: data["des-long"]})
        });
    }
}

drawLine = function (or, des) {
    directionsDisplay.setMap(map);
    var request = {
        travelMode: google.maps.TravelMode.DRIVING,
        origin: or,
        destination: des
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
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