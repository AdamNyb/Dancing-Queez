quizApp.controller('ScoreCtrl', function ($scope, Quiz, $localStorage) {
	
	$scope.scoreboard = Quiz.scoreboard;
	console.log($scope.scoreboard);


	$scope.playlistName = function(){ //playlistens namn
		if(Quiz.playlist){
			return Quiz.playlist.name;
		}
	};

	$scope.getScore = function(){ //playlistens namn
		return Quiz.getScore();
	};

  $scope.numberOfQuestions = function() {
    //returns number of total questions to be asked
    return Quiz.questionList.length;
  }

	$scope.resetGame = function(){
		Quiz.resetGame();
	}

	$scope.resetScore = function(){
		Quiz.resetScore();
	}


  var alert = function(objects) {
            if (objects.correct ==1 ){
              swal(objects.questionID + ". " + objects.questionStr, "\nCorrect answer: "+objects.correctAnswer, "success")
          	};

            if (objects.correct ==0 ){
               sweetAlert(objects.questionID + ". " + objects.questionStr, "Your answer: "+objects.userAnswer+"\nCorrect answer: "+objects.correctAnswer, "error")
           	};


         }

    var width="270px";
    var height = "320px";
   
  
    // should get scoreboard from service
    var data = [{correct:0, questionID:1, correctAnswer: "Test", userAnswer: "Hej"}, {correct:0, questionID:2, correctAnswer: "Test2", userAnswer: "Hej2"}, {correct:1, questionID:3, correctAnswer: "Test3", userAnswer: "Hej3"}];

    var svg = d3.select("#results").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "mark");

        

    var mark = svg.selectAll(".mark")
            .data($scope.scoreboard)
            //.data(data) //hard coded for testing purposes
        .enter().append("svg")
        
            .attr("class", "marks")
            .attr("x", function(d,i) { return  ((i%4))*70; }) 
           
            .attr("y", function(d,i) { 
                
              if (i<4){return -20;}
              else if(3<i && i<8) {return  40;} 
              else if(7<i && i<12) {return  100;} 
              else if(11<i && i<16) {return  160;}
              else if(15<i && i<20) {return  220;}})
           
            .attr("enable-background", "new 0 0 512 512")

            //on click execute function alert           
             .on({
          "click": alert,
            })
            //.attr("correct", function(d){return d;});


    var marks = d3.selectAll(".marks")
 
    .attr("fill", function(d){
         
          if(d.correct == 0)
            {return "#F44336"} // RED

          else{
            return "#8BC34A" //green
          }

        })

      .attr("viewBox", function(d){
          
          if(d.correct == 0)
            {return "0 0 1120 980"}

          else{
            return "0 0 1120 980"
          }

        })

      .append("path")
        .attr("d", function(d) {
          //if wrong answer give it an X-symbol
          if(d.correct == 0)
            { return "M146.537,1.047c-1.396-1.396-3.681-1.396-5.077,0L89.658,52.849c-1.396,1.396-3.681,1.396-5.077,0L32.78,1.047  c-1.396-1.396-3.681-1.396-5.077,0L1.047,27.702c-1.396,1.396-1.396,3.681,0,5.077l51.802,51.802c1.396,1.396,1.396,3.681,0,5.077  L1.047,141.46c-1.396,1.396-1.396,3.681,0,5.077l26.655,26.655c1.396,1.396,3.681,1.396,5.077,0l51.802-51.802  c1.396-1.396,3.681-1.396,5.077,0l51.801,51.801c1.396,1.396,3.681,1.396,5.077,0l26.655-26.655c1.396-1.396,1.396-3.681,0-5.077  l-51.801-51.801c-1.396-1.396-1.396-3.681,0-5.077l51.801-51.801c1.396-1.396,1.396-3.681,0-5.077L146.537,1.047z"}

          //else it is a correct answer give it a correct-symbol
          else
            {return "M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z   M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685  c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971  l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969  C156.146,65.765,156.146,74.362,150.862,79.646z"}
        })

          
      

});