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
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 63.42092, lng: 10.12167},
      zoom: 14.5,
      mapTypeId: 'satellite'
    });

    // Construct the circles
    for (var node in nodeMap) {
      var nodeCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: nodeMap[node].center,
        radius: nodeMap[node].radius,
        // var mapLabel = new google.maps.mapLabel({
        // text: nodeMap[node].text,
        // position: nodeMap[node].center,
        // map: map,
        // fontSize: 35,
        // align: 'center'
        // });
        // mapLabel.set('position', new google.maps.LatLng(nodeMap[node].center));
  
        // var marker = new google.maps.Marker();
        // marker.bindTo('map', mapLabel);
        // marker.bindTo('position', mapLabel);
      });
    }
  }
  // The following script contains an unrestricted API key connected to my PERSONAL google cloud console profile. 
  // It will charge me economically if overused. Therefore: Do NOT spread it around - Andreas
