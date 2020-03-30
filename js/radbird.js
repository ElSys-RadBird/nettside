// Kode for graf


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
let db = firebase.database();

// Henter dataen fra en node.
async function getNodeData(node, tid){
  let nodeLength = 0;
  return new Promise (resolve => {
    let ref = firebase.database().ref(node);
    ref.orderByChild('tid').startAt(tid).on('value', function(snapshot){
      let nodeData = snapshot.val();
      for (key in nodeData) {
          if (nodeData.hasOwnProperty(key)){
              nodeLength++;
          }
      }
      resolve(nodeLength);
    })
  });
}

// Henter dataen fra en node.
async function getNodeData2(node, tid1, tid2){
  let nodeLength = 0;
  return new Promise (resolve => {
    let ref = firebase.database().ref(node);
    ref.orderByChild('tid').startAt(tid1).endAt(tid2).on('value', function(snapshot){
      let nodeData = snapshot.val();
      for (key in nodeData) {
          if (nodeData.hasOwnProperty(key)){
              nodeLength++;
          }
      }
      resolve(nodeLength);
    })
  });
}

// Henter dataen fra alle nodene.
async function getData(tid1, tid2){
  let unixTime = Math.round(new Date().getTime() / 1000);

  let dataSet = [];
  let nodeNumbers = [];

  let ref = firebase.database().ref();

  // Legger nodenummerene i en egen liste. Må gjøres sånn pga. async-greier.
  ref.on('value', function(snapshot){
    let nodes = snapshot.val();
    let newNodes = Object.values(nodes);
    for (let node of newNodes) {
      if (typeof(node) === 'object') {
          nodeNumbers.push(node.nodeNumber);
      }
    }
  });

  // Henter nodeData for alle nodene i databasen.
  for (let nr of nodeNumbers) {
    let nodeString = 'node' + nr + '/birdEvents';
    dataSet.push(await getNodeData2(nodeString, unixTime - tid1, unixTime - tid2));
  }

  return dataSet;
}

// Lager grafen
async function makeChart(ds) {
  let dataChart = await ds;
  let ctx = document.getElementById('myChart');

  let labs = [];
  let bgColor = [];
  let bordColor = [];

  let ref = firebase.database().ref();

  // Lager nye stolper ved iterasjon av database
  ref.on('value', function(snapshot){
    let nodes = snapshot.val();
    let newNodes = Object.values(nodes);
    for (let node of newNodes) {
      if (typeof(node) === 'object') {
        labs.push('Node ' + node.nodeNumber);
        bgColor.push('rgba(33, 77, 170, 0.15)');
        bordColor.push('rgba(33, 77, 170, 1)');
      }
    }
  });

  let birdChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labs,
      datasets: [{
        label: 'Antall ganger observert fugler',
        data: dataChart,
        barPercentage: 0.4,
        backgroundColor: bgColor,
        borderColor: bordColor,
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

// Knappene som styrer tidsperiodene.
let btnDay = document.getElementById("btn-day");
let btnUke = document.getElementById("btn-uke");
let btnMnd = document.getElementById("btn-mnd");
let btn6mnd = document.getElementById("btn-6mnd");
let btnAar = document.getElementById("btn-aar");
let date1 = document.getElementById("date-1");
let date2 = document.getElementById("date-2");
let dateBtn = document.getElementById("dateBtn");


btnDay.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(86400, 0));
});

btnUke.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(604800, 0));
});

btnMnd.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(2592000, 0));
});
  
btn6mnd.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(15768000, 0));
});

btnAar.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(31556926, 0));
});

date1.addEventListener("input", async function(){
  let chosenDate1 = document.getElementById('date-1').value;
  let chosenDate2 = document.getElementById('date-2').value;
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  if (chosenDate1 && chosenDate2) {
    let unixTime = Math.round(new Date().getTime() / 1000);
    let dateTemp1 = unixTime - new Date(chosenDate1).getTime() / 1000;
    let dateTemp2 = unixTime - new Date(chosenDate2).getTime() / 1000;
    let birdChartTemp = await birdChart;
    birdChartTemp.destroy();
    birdChart = makeChart(getData(dateTemp1, dateTemp2));
  }
  else {
    birdChart = makeChart(0);
  }
});

date2.addEventListener("input", async function(){
  let chosenDate1 = document.getElementById('date-1').value;
  let chosenDate2 = document.getElementById('date-2').value;
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  if (chosenDate1 && chosenDate2) {
    let unixTime = Math.round(new Date().getTime() / 1000);
    let dateTemp1 = unixTime - new Date(chosenDate1).getTime() / 1000;
    let dateTemp2 = unixTime - new Date(chosenDate2).getTime() / 1000;
    let birdChartTemp = await birdChart;
    birdChartTemp.destroy();
    birdChart = makeChart(getData(dateTemp1, dateTemp2));
  }
  else {
    birdChart = makeChart(0);
  }
});

let birdChart = makeChart();