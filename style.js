var firebaseConfig = {
    apiKey: "AIzaSyDnEP04gm-RrDBGRRBeVhF_8Tb_fT4ijuw",
    authDomain: "train-schedules-9924c.firebaseapp.com",
    databaseURL: "https://train-schedules-9924c.firebaseio.com",
    projectId: "train-schedules-9924c",
    storageBucket: "train-schedules-9924c.appspot.com",
    messagingSenderId: "166305950155",
    appId: "1:166305950155:web:72b6721c8c4289f77eee4e",
    measurementId: "G-MBWJQEJW3Z"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var TrainName = "";
var Destination = "";  
var FirstTtime = "";
var Frequent = "";

$("#AddTrain").on("click", function (event) {
    event.preventDefault();

    TrainName = $("#Tname").val().trim();
    console.log(TrainName);
    Destination = $("#Tdest").val().trim();
    FirstTtime = $("#Time").val().trim();
    Frequent = $("#Freq").val().trim();

    database.ref().push({
        name: TrainName,
        destination: Destination,
        firsttime: FirstTtime,
        frequency: Frequent,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

    $("#Tname").val(" ");
    $("#Tdest").val(" ");
    $("#Time").val(" ");
    $("#Freq").val(" ");   


});

database.ref().on("child_added", function (snapshot) {
    var info = snapshot.val();

    console.log(info.name);
    console.log(info.destination);
    console.log(info.firsttime);
    console.log(info.frequency);
    console.log(info.dateAdded);


    // Crear un tr y dentro insertar un td con un id y después desplegar la información

    // var m = ;
    
    // console.log(m);

   var tr = $("<tr>");
   var newrow = $("#tablebody").append(tr);
   newrow.append("<td>"+ info.name);
   newrow.append("<td>"+ info.destination);
   newrow.append("<td>"+ info.frequency);
   newrow.append("<td>"+ moment().add(1,'hour'));
   newrow.append("<td>"+ "Next train arrives: " + moment().endOf('hour').fromNow());

   
    // $("#MinutesAw").text("Next train arrives: " + moment().endOf('hour').fromNow());
    

});

// necesito hacer que el jquery escriba un tr nuevo cada vez que la persona presione submit
// después calcular Next arrivaly minutes away con respecto al imput de next train arrival (time) y frequency en minutos