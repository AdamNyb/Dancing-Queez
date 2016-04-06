quizApp.controller('GameCtrl', function ($scope, Quiz) {

	$scope.playlistName = function(){ //playlistens namn
		if(Quiz.playlist){
			return Quiz.playlist.name;
		}
	};



	$scope.createQuestions = function() {
		console.log(Quiz.playlist);
		$scope.questions = Quiz.createQuestions(Quiz.playlist.tracks.items); //tracks
		//console.log("These are our questions!",$scope.questions);
	}
});