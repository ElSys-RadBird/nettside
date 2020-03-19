// Kode for graf
// TODO:
// La funksjonen getData gjelde uavhengig av antall noder

async function getNodeData(node, tid){
  let lengde_node = 0;
  return new Promise (resolve => {
    let ref = firebase.database().ref(node);
    ref.orderByChild('tid').startAt(tid).on('value', function(snapshot){
      let node_data = snapshot.val();
      for (key in node_data) {
          if (node_data.hasOwnProperty(key)){
              lengde_node++;
          }
      }
      resolve(lengde_node);
    })
  });
}


async function getData(tid){
  var un_time = new Date();
  var data_set = [];
  var sec = Math.round(un_time.getTime() / 1000);
  data_set.push(await getNodeData("node1/birdEvents", sec - tid));
  data_set.push(await getNodeData("node2/birdEvents", sec - tid));
  data_set.push(await getNodeData("node3/birdEvents", sec - tid));
  return data_set;
}


async function makeChart(ds) {
  let data_chart= await ds;
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

let btnDay = document.getElementById("btn-day");
let btnUke = document.getElementById("btn-uke");
let btnMnd = document.getElementById("btn-mnd");
let btn6mnd = document.getElementById("btn-6mnd");

btnDay.addEventListener("click", async function(){
  let birdChart_temp = await birdChart;
  birdChart_temp.destroy();
  birdChart = makeChart(getData(86400));
});

btnUke.addEventListener("click", async function(){
  let birdChart_temp = await birdChart;
  birdChart_temp.destroy();
  birdChart = makeChart(getData(604800));
});

btnMnd.addEventListener("click", async function(){
  let birdChart_temp = await birdChart;
  birdChart_temp.destroy();
  birdChart = makeChart(getData(2592000));
});
  
btn6mnd.addEventListener("click", async function(){
  let birdChart_temp = await birdChart;
  birdChart_temp.destroy();
  birdChart = makeChart(getData(15768000));
});
    
      
      
let birdChart = makeChart(0);