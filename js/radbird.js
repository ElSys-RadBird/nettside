  // Your web app's Firebase configuration
  
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

  //var db =firebase.database();
  var data=firebase.database().ref("node1/");
  data.on('value',function(snapshot){
    console.log(snapshot.val());
    data=snapshot.val();
    document.getElementById("tid").innerHTML="Tid:"+data.tid;
    document.getElementById("aktivitet").innerHTML= "Aktivitet: " +data.aktivitet;
    document.getElementById("funker").innerHTML= "Aktiv: "+ data.funker;

  });   