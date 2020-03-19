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
  let dataChart= await ds;
  let ctx = document.getElementById('myChart');
  let birdChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Node 1 ', 'Node 2', 'Node 3'],
      datasets: [{
        label: 'Antall ganger observert fugler',
        data: dataChart,
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
