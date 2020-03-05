// Kode for nodeoversikt

// let ref = firebase.database().ref();
ref.once('value', function(snapshot){
  let nodes = snapshot.val();
  let nodesArray = Object.values(nodes);
  let nodeNr = 1;
  for (let node of nodesArray) {
    if (typeof(node) === 'object') {
      document.getElementById('n-o').innerHTML += '<span style="font-weight:bold">Node ' + nodeNr + ': </span>';
      if (node.funker === true) {
        document.getElementById('n-o').innerHTML += '<span style="color:green">AKTIV <br></span>';
      }
      else if (node.funker === false) {        
        document.getElementById('n-o').innerHTML += '<span style="color:red">NODEN HAR VELTET <br></span>';
      }
      nodeNr++;
    }
  }
})