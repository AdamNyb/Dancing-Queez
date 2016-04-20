quizApp.controller('HomeCtrl', function ($scope, Quiz, $localStorage) {
	

	$scope.playlistInput = null;

	$scope.resetStorage = function(){
		Quiz.$storage.$reset();
	};

	$scope.getPlaylist = function(link) {
		// gets the playlist
		// bad playlist https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP
		// good playlist 'https://open.spotify.com/user/hhawthorn/playlist/1Hue9EGWG1xl9UPcgji9vX'
		//console.log('This is link',link);
		$scope.tracks = Quiz.getPlaylist(link, function(data){
			$scope.savePlaylist(data);
		});
	}

/*	$scope.$storage = $localStorage.$default({
		score: 0,
		scoreboard: [],
		playlist: null,
		//question: null,
		questionList: [],
		currentQuestionPosition: 0
	});
*/
	$scope.savePlaylist = function(data){
		Quiz.savePlaylist(data);
		//Quiz.updateCookie();
		//$scope.$storage.playlist = Quiz.savePlaylist(data);
	}




});