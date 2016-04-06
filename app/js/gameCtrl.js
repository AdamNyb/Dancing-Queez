quizApp.controller('GameCtrl', function ($scope, Quiz) {
	
	$scope.test = function() {
		console.log('test');
	};

	//$scope.test();
	$scope.playlistInput = null;

	$scope.getPlaylist = function(link) {
		// gets the playlist
		// bad playlist https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP
		// good playlist 'https://open.spotify.com/user/hhawthorn/playlist/1Hue9EGWG1xl9UPcgji9vX'
		console.log('This is link',link);
		$scope.tracks = Quiz.getPlaylist(link, function(data){
		//$scope.tracks = Quiz.getPlaylist('https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP', function(data){
			//console.log("hey");
			//console.log("YOYO",data.tracks.items);
			$scope.createQuestions(data.tracks.items);
		});
		//console.log("TRACKS",$scope.tracks);
	}


	$scope.createQuestions = function(tracks) {
		//console.log("This is my tracks",tracks);
		$scope.questions = Quiz.createQuestions(tracks);
		console.log("These are our questions!",$scope.questions);
	}
});