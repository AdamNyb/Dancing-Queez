quizApp.controller('ScoreCtrl', function ($scope, Quiz) {
	
	$scope.scoreboard = Quiz.scoreboard;
	console.log($scope.scoreboard);


	$scope.playlistName = function(){ //playlistens namn
		if(Quiz.playlist){
			return Quiz.playlist.name;
		}
	};

	$scope.getScore = function(){ //playlistens namn
		if(Quiz.getScore()){
			return Quiz.getScore();
		}
	};

	$scope.reset = function(){
		Quiz.resetGame();

	}
});