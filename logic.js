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
      name = snapshot.val().name;
      role = snapshot.val().role;
      startDate = snapshot.val().startDate;
      monthlyRate = snapshot.val().monthlyRate;
  
      var randomFormat = "MM/DD/YYYY";
      var convertedDate = moment(startDate, randomFormat);
  
      console.log(convertedDate.toNow());
      var monthsDif = convertedDate.diff(moment(), "months");
      var monthsDif = monthsDif * -1;
      
      var paidTotal = monthsDif * monthlyRate;
  
  
  
      function addRow(){
          var rows =  $("<tr>");
           
          var nameTD = $("<td>").attr("scope", "col").text(name);
          var roleTD = $("<td>").attr("scope", "col").text(role);
          var startDateTD = $("<td>").attr("scope", "col").text(startDate);
          var monthsWorkedTD = $("<td>").attr("scope", "col").text(monthsDif) ;
          var monthlyRateTD = $("<td>").attr("scope", "col").text("$" + monthlyRate);
          var paidTD = $("<td>").attr("scope", "col").text("$" + paidTotal);
          (rows).append(nameTD, roleTD, startDateTD, monthsWorkedTD, monthlyRateTD, paidTD);
        
        $("#edm").append(rows);
      }
  
      console.log(name);
      console.log(role);
      console.log(startDate);
      console.log(monthlyRate);
      
      addRow();
  
    }), function(errorObject){
      console.log ("error")
    }
  
  $("#submitBttn").on("click", function(){
      var name = $("#name").val().trim();
      console.log(name);
      var role = $("#role").val().trim();
      var startDate = $("#start-date").val().trim();
      var monthlyRate= $("#monthly-rate").val().trim();
  
       
      database.ref().push({
          name: name,
          role: role,
          startDate: startDate,
          monthlyRate: monthlyRate,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
  })
  
  