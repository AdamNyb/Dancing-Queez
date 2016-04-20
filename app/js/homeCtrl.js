quizApp.controller('HomeCtrl', function ($scope, Quiz, $location) {
	
	/*$scope.test = function() {
		console.log('test');
	};*/

	//$scope.test();
	$scope.playlistInput = null;

	$scope.getPlaylist = function(link) {
		// gets the playlist
		// bad playlist https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP
		// good playlist 'https://open.spotify.com/user/hhawthorn/playlist/1Hue9EGWG1xl9UPcgji9vX'
		//console.log('This is link',link);

		$scope.tracks = Quiz.getPlaylist(link, function(data){
		$scope.savePlaylist(data);
		if (data){  //if the input playlist generates data then the playlist is valid and the game can begin!
			$location.path('game');
		}
		});
		
	}


	$scope.savePlaylist = function(data){
		Quiz.savePlaylist(data);
	}

});