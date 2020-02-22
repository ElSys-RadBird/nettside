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

// Lager en databasevariabel
var db =firebase.database();

// Henter nodedata
// function get_node_data(node,tid){
//   var lengde_node= 0;
//   var ref =firebase.database().ref(node)
//   ref.orderByChild('tid').endAt(tid).on('value',function(snapshot){
//     var node_data=snapshot.val();
//     console.log(node_data)
//     for(var key in node_data ){
//       if (key=="aktivitet"){
//         lengde_node=0;
//         break
//       }
//       else{
//         if(node_data.hasOwnProperty(key)){
//           lengde_node++
//         }
//       }
//     }
//   })
//   console.log(lengde_node);
//   return lengde_node;
// }

// Henter data og lager et datasett (?)
// function get_data(tid){
//   var data_set=[];
//   data_set.push(get_node_data("node1/",tid));
//   data_set.push(get_node_data("node2/",tid));
//   data_set.push(get_node_data("node3/",tid));
//   console.log(data_set);
//   return data_set;
// }


let data_set_uke = [1, 0, 1];
let data_set_mnd = [3, 2, 4];
let data_set_6mnd = [4, 4, 10];
let data_set_aar = [12, 15, 17];

function makeChart(ds) {
  let ctx = document.getElementById('myChart');
  let birdChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Node 1 ', 'Node 2', 'Node 3'],
      datasets: [{
        label: 'Antall ganger observert fugler',
        data: ds,
        backgroundColor: [
          'rgba(33, 77, 170, 0.15)',
          'rgba(33, 77, 170, 0.15)',
          'rgba(33, 77, 170, 0.15)',
        ],
        borderColor: [
          'rgba(33, 77, 170, 1)',
          'rgba(33, 77, 170, 1)',
          'rgba(33, 77, 170, 1)',
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
  return birdChart;
}


let btn_uke = document.getElementById("btn-uke");
let btn_mnd = document.getElementById("btn-mnd");
let btn_6mnd = document.getElementById("btn-6mnd");
let btn_aar = document.getElementById("btn-aar");


btn_uke.addEventListener("click", function(){
  birdChart.destroy();
  birdChart = makeChart(data_set_uke);
});

btn_mnd.addEventListener("click", function(){
  birdChart.destroy();
  birdChart = makeChart(data_set_mnd);
});

btn_6mnd.addEventListener("click", function(){
  birdChart.destroy();
  birdChart = makeChart(data_set_6mnd);
});

btn_aar.addEventListener("click", function(){
  birdChart.destroy();
  birdChart = makeChart(data_set_aar);
});


let birdChart = makeChart(0);