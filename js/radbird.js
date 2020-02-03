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

  var db =firebase.database().ref();
  db.ref("node1/").on("value",function(snapshot){
    console.log(snapshot);
    document.getElementById("tid").innerHTML="Tid:";
    //document.getElementById("aktivitet").innerHTML=
    //document.getElementById("funker").innerHTML=

  });