// Kode for graf

// Henter dataen fra en node.
async function getNodeData(node, tid){
  let lengdeNode = 0;
  return new Promise (resolve => {
    let ref = firebase.database().ref(node);
    ref.orderByChild('tid').startAt(tid).on('value', function(snapshot){
      let nodeData = snapshot.val();
      for (key in nodeData) {
          if (nodeData.hasOwnProperty(key)){
              lengdeNode++;
          }
      }
      resolve(lengdeNode);
    })
  });
}

// Henter dataen fra alle nodene.
async function getData(tid){
  let unTime = new Date();
  let sec = Math.round(unTime.getTime() / 1000);

  let dataSet = [];
  let nodeNavn = [];

  let ref = firebase.database().ref();

  // Legger nodenummerene i en egen liste. Må gjøres sånn pga. async-greier.
  ref.on('value', function(snapshot){
    let nodes = snapshot.val();
    let newNodes = Object.values(nodes);
    for (let node of newNodes) {
      if (typeof(node) === 'object') {
          nodeNavn.push(node.nodeNumber);
      }
    }
  });

  // Henter nodeData for alle nodene i databasen.
  for (let nr of nodeNavn) {
    let nodeString = 'node' + nr + '/birdEvents';
    dataSet.push(await getNodeData(nodeString, sec - tid));
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

btnDay.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(86400));
});

btnUke.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(604800));
});

btnMnd.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(2592000));
});
  
btn6mnd.addEventListener("click", async function(){
  let birdChartTemp = await birdChart;
  birdChartTemp.destroy();
  birdChart = makeChart(getData(15768000));
});

      
let birdChart = makeChart(0);