quizApp.controller('GameCtrl', function ($scope, $routeParams, $location, Quiz) {

	

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
			if(Quiz.currentQuestionPosition === 3) {
				//hide button
				//butt.html('');
			}
		}


	}

	$scope.validateAnswer = function(divObj) {
		console.log("YES");
		
		//göm forward
		//rätt svaret ska lysa grönt direkt
		//om rätta svaret är klickat, do nothing, 
		//om fel svar sätt div till röd färg
		//sätt divar till unclickable
		//divObj.style.background="#EF5350";
	}



});