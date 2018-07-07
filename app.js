

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBf0pkGVXjkQYUqbnYwZudZ37JacVA9VTc",
    authDomain: "train-schedule-5369e.firebaseapp.com",
    databaseURL: "https://train-schedule-5369e.firebaseio.com",
    projectId: "train-schedule-5369e",
    storageBucket: "",
    messagingSenderId: "546881355307"
  };
  firebase.initializeApp(config);

  //console.log("hello"); Checking if connected app.js to index.html

  var dataRef = firebase.database();

  var trainNameJS = "";
  var destinationJS = "";
  var trainTimeJS = "";
  var frequencyJS = "";

  //Capture Input
  $("#add-train").on("click", function(event){
      event.preventDefault();

      trainNameJS = $("#TrainName_html").val().trim();
      destinationJS = $("#Destination_html").val().trim();
      trainTimeJS = $("#TrainTime_html").val().trim();
      frequencyJS = $("#Frequency_html").val().trim();
//Checking if data is stored in console.
        console.log(trainNameJS);
        console.log(destinationJS);
        console.log(trainTimeJS);
        console.log(frequencyJS);

        dataRef.ref().push({
            trainNameJS: trainNameJS,
            destinationJS: destinationJS,
            trainTimeJS: trainTimeJS,
            frequencyJS: frequencyJS,
        })
  });

  dataRef.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val().trainNameJS);
    console.log(childSnapshot.val().destinationJS);
    console.log(childSnapshot.val().trainTimeJS);
    console.log(childSnapshot.val().frequencyJS);

// full list of items to the well


  })


  $("#responseTable_html").append("<div class='well'><th scope='col' id='trainTable_html'>"+ childSnapshot.val().trainNameJS +
        " </th><th scope='col' id='destinationTable_html'> " + childSnapshot.val().destinationJS +
          " </th><th scope='col' id='frequency_html'> " + childSnapshot.val().trainTimeJS +
            " </th><th scope='col' id='minutesTable_html'> " + childSnapshot.val().frequencyJS + " </th></div>");

            database.ref().on("child_added", function (childSnapshot) {
                var newTrain = childSnapshot.val().trainName;
                var newLocation = childSnapshot.val().destination;
                var newFirstTrain = childSnapshot.val().firstTrain;
                var newFreq = childSnapshot.val().frequency;
                //first time (pushed back 1 year to make sure it comes before the current time)
                var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
                //current time
                var currentTime = moment();
                //difference between the times
                var diffTime = moment().diff(moment(startTimeConverted), "minutes");
                //time apart (remainder)
                var tRemainder = diffTime % newFreq;
                //minutes until train
                var tMinutesTillTrain = newFreq - tRemainder;
                //next train
                var nextTrain = moment().add(tMinutesTillTrain, "minutes");
                var catchTrain = moment(nextTrain).format("HH:mm");