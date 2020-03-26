// Kode for visning av noder

let ref = firebase.database().ref();

ref.once('value', function(snapshot){
    let nodes = snapshot.val();
    let nodesArray = Object.values(nodes);
    for (let node of nodesArray) {
        if (typeof(node) === 'object') {
            document.getElementById('n-o').innerHTML += '<span style="font-weight:bold">Node ' + node.nodeNumber + ': </span>';
            if (node.funker === true) {
            document.getElementById('n-o').innerHTML += '<span style="color:green">AKTIV <br></span>';
            }
            else if (node.funker === false) {        
            document.getElementById('n-o').innerHTML += '<span style="color:red">INAKTIV <br></span>';
            }
        }
    }
})

function removeNode(n){
    let nodeToRemove = 'node1/birdEvents/bird' + n;
    console.log(nodeToRemove);
    let userRef = firebase.database().ref(nodeToRemove);
    userRef.remove();
}