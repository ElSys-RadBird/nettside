// Kode for graf
// TODO:
// La funksjonen getData gjelde uavhengig av antall noder

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


async function getData(tid){
  let unTime = new Date();
  let dataSet = [];
  let sec = Math.round(unTime.getTime() / 1000);
  dataSet.push(await getNodeData("node1/birdEvents", sec - tid));
  dataSet.push(await getNodeData("node2/birdEvents", sec - tid));
  dataSet.push(await getNodeData("node3/birdEvents", sec - tid));
  return dataSet;
}


async function makeChart(ds) {
  let dataChart = await ds;
  let ctx = document.getElementById('myChart');

  // Forsøk på å iterere gjennom noder i database.
  let labs = [];
  let bgColor = [];
  let bordColor = [];

  let ref = firebase.database().ref();

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
    console.log(labs);
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
