// Henter dataen fra en node.

function getNodeDataLine(node){
    let days = {};
    return new Promise (resolve => {
      let ref = firebase.database().ref(node);
      ref.orderByChild('tid').on('value', function(snapshot){
        let nodeData = snapshot.val();
        let newNodeData = Object.values(nodeData);
        for (key of newNodeData) {
            let newDay = new Date(key.tid * 1000).toJSON().slice(0,10);
            if (days[newDay]) {
                days[newDay]++;
            }
            else {
                days[newDay] = 1;   
            }
        }
        console.log(days);
        resolve(days);
        })
    });
}

async function testytest() {
    let days = await getNodeDataLine('node1/birdEvents');  
    let labs = [];
    console.log();
    for (const [key, value] of Object.entries(days)) {
        labs.push(key);
    }
}

testytest();

  
  // Henter dataen fra alle nodene.
  async function getDataLine(){
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
  async function makeLineChart(ds) {
    let dataChart = await ds;
    let ctx = document.getElementById('myChart');
  

    let bgColor = [];
    let bordColor = [];
  
    // let ref = firebase.database().ref();
  
    // Lager nye stolper ved iterasjon av database
    // ref.on('value', function(snapshot){
    //   let nodes = snapshot.val();
    //   let newNodes = Object.values(nodes);
    //   for (let node of newNodes) {
    //     if (typeof(node) === 'object') {
    //       labs.push('Node ' + node.nodeNumber);
    //       bgColor.push('rgba(33, 77, 170, 0.15)');
    //       bordColor.push('rgba(33, 77, 170, 1)');
    //     }
    //   }
    // });
  
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