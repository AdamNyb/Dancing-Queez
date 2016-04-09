quizApp.controller('ScoreCtrl', function ($scope, Quiz) {
	
	$scope.scoreboard = Quiz.scoreboard;
	console.log($scope.scoreboard);
});