var firebaseConfig = {
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

var db =firebase.database();

var ctx = document.getElementById('myChart');


async function myChart(data_set){var data_chart= await data_set; let birdchart =new Chart(ctx, {
  
  type: 'bar',
  data: {
  labels: ['Node 1 ', 'Node 2', 'Node 3'],
  datasets: [{
  label: 'Antall minutter med fugleaktivitet',
  data: data_chart,
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
  return birdchart;
}

async function get_node_data(node,tid){
var lengde_node=0;
return new Promise (resolve=> {
  var ref = firebase.database().ref(node)
  ref.orderByChild('tid').startAt(tid).on('value',function(snapshot){
    var node_data=snapshot.val();
    console.log(node_data);
    for (key in node_data) {
        if (node_data.hasOwnProperty(key)){
            lengde_node++;
        }
    }
    resolve(lengde_node);
    
    console.log('1',lengde_node);
})});
}


async function get_data(tid){
var un_time= new Date();
var data_set=[]
var sec=Math.round(un_time.getTime() / 1000);
console.log(sec-tid);
data_set.push(await get_node_data("node1/",sec-tid));
data_set.push(await get_node_data("node2/",sec-tid));
data_set.push(await get_node_data("node3/",sec-tid));
console.log(data_set);
return data_set;
}



let btn_uke = document.getElementById("btn-uke");
let btn_mnd = document.getElementById("btn-mnd");
let btn_6mnd = document.getElementById("btn-6mnd");
let btn_aar = document.getElementById("btn-aar");

let data_set_uke = [1, 0, 1];
let data_set_mnd = [3, 2, 4];
let data_set_6mnd = [4, 4, 10];
let data_set_aar = [12, 15, 17];


btn_uke.addEventListener("click", async function(){
  birdChart_2= await birdChart;
  birdChart_2.destroy();
  birdChart = myChart(get_data(604800));
});

btn_mnd.addEventListener("click", async function(){
  birdChart_2= await birdChart;
  birdChart_2.destroy();
  birdChart = myChart(get_data(2629743));
});

btn_6mnd.addEventListener("click",async function(){
  birdChart_2= await birdChart;
  birdChart_2.destroy();
  birdChart = myChart(get_data(15778463));
});

btn_aar.addEventListener("click",async function(){
  birdChart_2= await birdChart;
  birdChart_2.destroy();
  birdChart = myChart(get_data(31556926));
});


let birdChart = myChart(0);
var today= new Date;
//console.log(today.toLocaleDateString());

const elem = document.getElementById('range');
const dateRangePicker = new DateRangePicker(elem, {
      // options here
      
      clearBtn: true,
      format: 'dd/mm/yyyy',
      language: 'no',
      maxDate: today.toLocaleDateString(),


});

console.log(dateRangePicker.getDate(format));
/*

async function makeChart(ds) {
  data_chart= await ds;
  let ctx = document.getElementById('myChart');
  let birdChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Node 1 ', 'Node 2', 'Node 3'],
      datasets: [{
        label: 'Antall ganger observert fugler',
        data: data_chart,
        barPercentage: 0.4,
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
*/