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
    for (let node of newNodes) {
      if (typeof(node) === 'object') {
        if (node.funker === true) {
          this['circle'+i] = new google.maps.Circle({
            strokeColor: '#3377AA',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillOpacity: 0.35,
            map: map,
            center: node.position.center,
            radius: 100,   
            fillColor: '#00FF00',
          });
        }
        else if (node.funker === false) { 
          this['circle'+i] = new google.maps.Circle({
            strokeColor: '#3377AA',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillOpacity: 0.35,
            map: map,
            center: node.position.center,
            radius: 100,   
            fillColor: '#FF0000',
          });
        }
      }
    }
  })
}