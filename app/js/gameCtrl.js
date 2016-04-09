quizApp.controller('GameCtrl', function ($scope, $routeParams, $location, Quiz) {

	
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
			div.style.background="#D81B60";
		}
	}

	$scope.validateAnswer = function(alt, alternative) {
		//validates answer wrong/right plus color change to clicked div
		//sends data to scoreboard, stops user from answering more than once.
		//$scope.correctAnswer();
		$scope.hideForward=false //hides forward button
		
		if (currentQuestion.answered === false) {
			var currentQuestion = Quiz.questionList[Quiz.currentQuestionPosition];
			var currentQuestionID = currentQuestion.id;
			var altID = "alt" + alt;
			var divID = document.getElementById(altID);
			
			if (alternative !== currentQuestion.correctAnswer) {
				//wrong answer turns black
				divID.style.background="#222";
				Quiz.scoreboard[Quiz.currentQuestionPosition].correct = 0; //update scoreboard

			}
			else {
				Quiz.setScore(Quiz.getScore() + 1);
				//right answer turns greenish
				divID.style.background="#26A69A"
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




});