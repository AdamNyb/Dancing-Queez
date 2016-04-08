quizApp.controller('GameCtrl', function ($scope, Quiz) {

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
		return Quiz.questionList[Quiz.currentQuestionID];
	}

	$scope.nextQuestionButton = function() {
		// should be linked to the button for next question
		console.log("YO")
		Quiz.currentQuestionID = Quiz.currentQuestionID + 1;
		//console.log(Quiz.currentQuestionID);
		if(Quiz.currentQuestionID === 20) {
			//Open score page
		}

	}



});