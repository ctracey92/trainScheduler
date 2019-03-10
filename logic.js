  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCUS5MnEfF_dS1Tb7yL1dFjPz7rg75cdkg",
    authDomain: "trainscheduler-bdac6.firebaseapp.com",
    databaseURL: "https://trainscheduler-bdac6.firebaseio.com",
    projectId: "trainscheduler-bdac6",
    storageBucket: "trainscheduler-bdac6.appspot.com",
    messagingSenderId: "311208951291"
  };
  firebase.initializeApp(config);
  
    var database = firebase.database();
    var trainName;
    var destination;
    var firstTrain;
    var frequency;
    
  
  
    database.ref().on("child_added", function(snapshot){
      
      console.log(snapshot);
      trainName = snapshot.val().trainName;
      destination = snapshot.val().destination;
      firstTrainTime = snapshot.val().firstTrainTime;
      frequency = snapshot.val().frequency;
  
      var randomFormat = "MM/DD/YYYY";
      var convertedDate = moment(firstTrainTime, randomFormat);
  
      console.log(convertedDate.toNow());
      var monthsDif = convertedDate.diff(moment(), "months");
      var monthsDif = monthsDif * -1;
      
      var paidTotal = monthsDif * frequency;
  
  
  
      function addRow(){
          var rows =  $("<tr>");
           
          var trainNameTD = $("<td>").attr("scope", "col").text(trainName);
          var destinationTD = $("<td>").attr("scope", "col").text(destination);
          var firstTrainTimeTD = $("<td>").attr("scope", "col").text(firstTrainTime);
          var frequencyTD = $("<td>").attr("scope", "col").text(frequency + " min");
          var paidTD = $("<td>").attr("scope", "col").text("$" + paidTotal);


          var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
          console.log(firstTimeConverted);


          (rows).append(trainNameTD, destinationTD, frequencyTD, firstTrainTimeTD, paidTD);
        
        $("#trains").append(rows);
      }
  
      console.log(trainName);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);
      
      addRow();
  
    }), function(errorObject){
      console.log ("error")
    }
  
  $("#submitBttn").on("click", function(){
      var trainName = $("#trainName").val().trim();
      console.log(trainName);
      var destination = $("#destination").val().trim();
      var firstTrainTime = $("#firstTrainTime").val().trim();
      var frequency= $("#frequency").val().trim();
  
       
      database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
  })
  
  