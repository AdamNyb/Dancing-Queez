quizApp.controller('TestCtrl', function ($scope, Quiz) {
	
	$scope.test = function() {
		console.log('test');
	};

	$scope.test();

	$scope.getPlaylist = function() {
		// gets the playlist
		//console.log("YO");
		$scope.tracks = Quiz.getPlaylist('https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP', function(data){
			//console.log("hey");
			//console.log("YOYO",data.tracks.items);
			$scope.createQuestions(data.tracks.items);
		});
		//console.log("TRACKS",$scope.tracks);
	}


	$scope.getPlaylist();

	$scope.createQuestions = function(tracks) {
		console.log("This is my tracks",tracks);
		Quiz.createQuestions(tracks);
	}
});