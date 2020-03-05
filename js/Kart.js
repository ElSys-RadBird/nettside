// Kode for kart

let firebaseConfig = {
  apiKey: "AIzaSyA2DnfBtReYSUeJf94VFzoqaN2_vNbid-s",
  authDomain: "radbird-elsys.firebaseapp.com",
  databaseURL: "https://radbird-elsys.firebaseio.com",
  projectId: "radbird-elsys",
  storageBucket: "radbird-elsys.appspot.com",
  messagingSenderId: "78896005129",   
  appId: "1:78896005129:web:9faab86bab14880b3db8d8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.database();
let ref = db.ref();


function initMap() {
  // Create the map
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 63.42092, lng: 10.12167},
    zoom: 14,
    mapTypeId: 'satellite'
  });

  ref.once('value', function(snapshot){
    let nodes = snapshot.val();
    let nodeArray = Object.values(nodes);
    for (let node of nodeArray) {
      if (typeof(node) === 'object') {
        
        if (node.funker === true) {
          new google.maps.Circle({
            strokeColor: '#3377AA',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillOpacity: 0.35,
            map: map,
            center: node.position.center,
            radius: 100,   
            fillColor: '#00FF00'       
          });
        }
        else if (node.funker === false) { 
          new google.maps.Circle({
            strokeColor: '#3377AA',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillOpacity: 0.35,
            map: map,
            center: node.position.center,
            radius: 100,   
            fillColor: '#FF0000'       
          });
        }
      }
    }
  })
}