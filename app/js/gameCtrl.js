quizApp.controller('GameCtrl', function ($scope, Quiz) {

	$scope.playlistName = function(){ //playlistens namn
		if(Quiz.playlist){
			return Quiz.playlist.name;
		}
	};



	$scope.createQuestions = function() {
		//if (Quiz.playlist){
		console.log(Quiz.playlist);
		return Quiz.createQuestions(Quiz.playlist.tracks.items);// };//tracks
		//console.log("These are our questions!",$scope.questions);
	}

	$scope.questions = function(){
		return $scope.createQuestions()};

});