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
		if (Quiz.playlist){
			$scope.createQuestions();
			var question = Quiz.questionList[Quiz.currentQuestionID];
		return question;};
	}

	$scope.nextQuestionButton = function() {
		// should be linked to the button for next question
		console.log("YO")
		$scope.pauseSong();
		Quiz.currentQuestionID = Quiz.currentQuestionID + 1;
		//console.log(Quiz.currentQuestionID);
		if(Quiz.currentQuestionID === 20) {
			//Open score page
		}

	}

	$scope.currentSong = function(ques){
		if (Quiz.playlist){
			$scope.song = document.getElementById("currentSong");
			$scope.playSong();
			return ques.previewUrl;
		}
	}

	$scope.playSong = function(){
		if (Quiz.playing == false){ //förhindrar Angulars digest loop från att spela upp låten 1000ggr samtidigt
			Quiz.playSong($scope.song);
		};
	};

	$scope.pauseSong = function(){
		Quiz.pauseSong($scope.song);
		Quiz.playing = false;

	} ;


});