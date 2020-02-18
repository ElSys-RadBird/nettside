// Limt inn fra index.html
var firebaseConfig = {
  apiKey: "AIzaSyA2DnfBtReYSUeJf94VFzoqaN2_vNbid-s",
  authDomain: "radbird-elsys.firebaseapp.com",
  databaseURL: "https://radbird-elsys.firebaseio.com",
  projectId: "radbird-elsys",
  storageBucket: "radbird-elsys.appspot.com",
  messagingSenderId: "78896005129",   
  appId: "1:78896005129:web:9faab86bab14880b3db8d8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db =firebase.database();

var ctx = document.getElementById('myChart');
function myChart(data_set){ new Chart(ctx, {
type: 'bar',
data: {
labels: ['Node 1 ', 'Node 2', 'Node 3'],
datasets: [{
label: 'Antall minutter med fugleaktivitet',
data: data_set,
backgroundColor: [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)'
  
],
borderColor: [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)'
  
],
borderWidth: 1
}]
},
options: {
scales: {
yAxes: [{
  ticks: {
      beginAtZero: true
  }
}]
}
}
});
}

function get_node_data(node,tid){
var lengde_node= 0;
var ref =firebase.database().ref(node)
ref.orderByChild('tid').endAt(tid).on('value',function(snapshot){
var node_data=snapshot.val();
console.log(node_data)
for(var key in node_data ){
if (key=="aktivitet"){
lengde_node=0;
break
}
else{
if(node_data.hasOwnProperty(key)){
lengde_node++
}

}
}
})
console.log(lengde_node)
return lengde_node;
}

function get_data(tid){
var data_set=[]
data_set.push(get_node_data("node1/",tid))
data_set.push(get_node_data("node2/",tid))
data_set.push(get_node_data("node3/",tid))
console.log(data_set)
return data_set;
}
myChart(get_data(4)); 
myChart(get_data(4));     