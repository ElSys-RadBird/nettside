// An object containing the position and radius of our nodes
var nodeMap = {
    blitzerman: {
      center: {lat: 63.421550, lng: 10.12148},
      radius: 100,
      text: '1'
    },
    gazerbeam: {
      center: {lat: 63.42000, lng: 10.11946},
      radius: 100,
      text: '2'
    },
    stormicide: {
      center: {lat: 63.42000, lng: 10.12350},
      radius: 100,
      text: '3'
    }
  };


function initMap() {
  // Create the map
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 63.42092, lng: 10.12167},
    zoom: 14.5,
    mapTypeId: 'satellite'
  });

  // Construct the circles
  for (let node in nodeMap) {
    new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: nodeMap[node].center,
    radius: nodeMap[node].radius,
    });
  }
}