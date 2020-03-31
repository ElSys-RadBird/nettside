// Kode for kart


function initMap() {
  // Create the map
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 63.42092, lng: 10.12167},
    zoom: 14,
    mapTypeId: 'satellite'
  });

  let ref = firebase.database().ref();
  ref.once('value', function(snapshot){
    // Henter nodene fra databasen
    let nodes = snapshot.val();
    let newNodes = Object.values(nodes);
    let i = 0;
    let circles = {};
    for (let node of newNodes) {
      if (typeof(node) === 'object') {
        if (node.funker === true) {
          let newCircle = new google.maps.Circle({
            strokeColor: '#3377AA',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillOpacity: 0.6,
            map: map,
            center: node.position.center,
            radius: 100,   
            fillColor: 'green'
          });
          circles[node.nodeNumber] = newCircle;
        }
        else if (node.funker === false) { 
          let newCircle = new google.maps.Circle({
            strokeColor: '#3377AA',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillOpacity: 0.4,
            map: map,
            center: node.position.center,
            radius: 100,   
            fillColor: 'red'
          });
          circles[node.nodeNumber] = newCircle;
        }
        google.maps.event.addListener(circles[node.nodeNumber], 'click', function(){
          document.getElementById('node-id').innerHTML = 'Node ' + node.nodeNumber;
          document.getElementById('node-id').style.color = circles[node.nodeNumber].fillColor;
        })
      }
    }
  })
}

