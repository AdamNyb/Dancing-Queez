quizApp.controller('ScoreCtrl', function ($scope, Quiz) {
	
	$scope.scoreboard = Quiz.scoreboard;
	console.log($scope.scoreboard);


	$scope.playlistName = function(){ //playlistens namn
		if(Quiz.playlist){
			return Quiz.playlist.name;
		}
	};
});