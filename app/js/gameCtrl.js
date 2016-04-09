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
		// should be linked to the button for next question
		//console.log("YO")
		if (Quiz.questionList[Quiz.currentQuestionPosition].lastQuestion == true) {
			//last question should rediret to score
			$location.path('score');
		} else {
			Quiz.currentQuestionPosition = Quiz.currentQuestionPosition + 1;
			//console.log(Quiz.currentQuestionID);
			
		}
		
		$scope.updateDivColor();
		$scope.hideForward=true
	}

	$scope.updateDivColor = function() {
		var id = ["alt1", "alt2", "alt3", "alt4"];
		for (i in id) {
			div = document.getElementById(id[i]);
			div.style.background="#D81B60";
		}
	}

	$scope.validateAnswer = function(alt, alternative) {
		$scope.correctAnswer();
		$scope.hideForward=false
		var currentQuestion = Quiz.questionList[Quiz.currentQuestionPosition];
		if (currentQuestion.answered === false) {
			var altID = "alt" + alt;
			var divID = document.getElementById(altID);
			console.log(divID);
			console.log("question", currentQuestion.correctAnswer);

			if (alternative !== currentQuestion.correctAnswer) {
				console.log("YES")
				//fel svar blir rött när en klickar på det
				divID.style.background="#222";
			}
			else {
				Quiz.setScore(Quiz.getScore() + 1);
				//rätt svar blir grönt när en klickar på det
				divID.style.background="#26A69A"
			}
			currentQuestion.answered = true;
		}

		//göm forward
		//rätt svar ska lysa grönt direkt (?)
		//om rätta svaret är klickat, do nothing, 
		//om fel svar sätt div till röd färg
		//sätt divar till unclickable

		//om svar är rätt lägg till i score + scoreboard
	}
	

	$scope.correctAnswer = function() {

		//var id = ["alt1", "alt2", "alt3", "alt4"];
		//for (i in id) {
		//	div = document.getElementById(id[i]);
		//	div.style.background="#FCE4EC";
		//}
	}

	$scope.numberOfQuestions = function() {
		console.log(Quiz.questionList.length);
		return Quiz.questionList.length;
	}




});