quizApp.controller('GameCtrl', function ($scope, $routeParams, $location, Quiz) {

	$scope.scoreboard = Quiz.scoreboard;
	//console.log("SCOOOOORE", $scope.scoreboard);
	$scope.hideForward=true

	$scope.playlistName = function(){ //playlistens namn
		if(Quiz.playlist){
			return Quiz.playlist.name;
		}
	};

	$scope.createQuestions = function() {
		if (Quiz.playlist){
			return Quiz.createQuestions(Quiz.playlist.tracks.items);//tracks
		}
	}

	$scope.question = function() {
		// is called by view, creates all questions (only the first time)
		// and returns the current question
		$scope.createQuestions();
		return Quiz.questionList[Quiz.currentQuestionPosition];
	}

	$scope.nextQuestionButton = function() {
		// linked to the button for next question
		if (Quiz.questionList[Quiz.currentQuestionPosition].lastQuestion == true) {
			//last question redirects to score
			$location.path('score');
		} else {
			Quiz.currentQuestionPosition = Quiz.currentQuestionPosition + 1;

			
		}
		
		$scope.updateDivColor();
		$scope.hideForward=true
	}

	$scope.updateDivColor = function() {
		//updates answer divs with standard color before next question
		var id = ["alt1", "alt2", "alt3", "alt4"]; //available div id's
		for (i in id) {
			div = document.getElementById(id[i]);
			div.style.background="#00BCD4";
		}
	}

	$scope.validateAnswer = function(alt, alternative) {
		//validates answer wrong/right plus color change to clicked div
		//sends data to scoreboard, stops user from answering more than once.
		//$scope.correctAnswer();
		$scope.hideForward=false //hides forward button
		var currentQuestion = Quiz.questionList[Quiz.currentQuestionPosition];
			var currentQuestionID = currentQuestion.id;
		
		if (currentQuestion.answered === false) {
			var altID = "alt" + alt;
			var divID = document.getElementById(altID);
			
			if (alternative !== currentQuestion.correctAnswer) {
				//wrong answer turns black
				divID.style.background="#F44336";
				Quiz.scoreboard[Quiz.currentQuestionPosition].correct = 0; //update scoreboard

			}
			else {
				Quiz.setScore(Quiz.getScore() + 1);
				//right answer turns greenish
				divID.style.background="#8BC34A" /*#26A69A*/
				Quiz.scoreboard[Quiz.currentQuestionPosition].correct = 1; //update scoreboard
			}
			currentQuestion.answered = true; //to stop user to answer same question twice
			Quiz.scoreboard[Quiz.currentQuestionPosition].userAnswer = alternative;
		}
	}
	

	$scope.correctAnswer = function() {
		//om vi vill att det rätta svaret ska bli grönt oavsett
		//vad som klickats på
	}

	$scope.numberOfQuestions = function() {
		//returns number of total questions to be asked
		return Quiz.questionList.length;
	}

	// NOTES

		var width="330px";
		var height = "83px";

		//var noteWidth = "30px";
		//var noteHeight = "30px";

		var data = [{correct:1, questionID:1, correctAnswer: "Test", userAnswer: "Hej"}];
		//$scope.scoreboard;
		//console.log("DATA;", data);
		//[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

		var svg = d3.select("#note").append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "note");

		var note = svg.selectAll(".note")
		      	.data(Quiz.scoreboard)
		    .enter().append("svg")
		    	.attr("width", "30px")
				.attr("height", "30px")
		      	.attr("class", "note")
		      	.attr("x", function(d,i) { return  i*20; }) 
		      	.attr("y", function(d,i) { return  i*2; })
		      	.attr("viewBox", "0 0 512 512")
		      	//.attr("enable-background", "new 0 0 512 512")

		.attr("fill", function(d) {
			  if (d.correct == 0) {
				return "#F44336" // incorrect => red
			} else {
				return "#8BC34A"
			}
		})

		  .append("path")
		    .attr("d", "M272,48h-32v304.594C223,342.375,200.688,336,176,336c-53,0-96,28.625-96,64s43,64,96,64s96-28.625,96-64V144c80-13,128,80,160,128C412,48,272,48,272,48z")

});