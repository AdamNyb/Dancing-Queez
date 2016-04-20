quizApp.controller('HomeCtrl', function ($scope, Quiz, $location) {
	
	$scope.userInput = null;
	$scope.playlists = [];

	$scope.hideOptionButtons = false;
	$scope.playlistInputHide = true;
	$scope.usernameInputHide = true;
	$scope.goPlaylistHide = true;
	$scope.goUsernameHide = true;

	$scope.playlistButton = function(){
		$scope.hideOptionButtons = true;
		$scope.playlistInputHide = false;
		$scope.goPlaylistHide = false;
	}

	$scope.usernameButton = function(){
		$scope.hideOptionButtons = true;
		$scope.usernameInputHide = false;
		$scope.goUsernameHide = false;

	}

	$scope.getUserPlaylists = function(username){
		//console.log("HEJ");
		var data = Quiz.getUserPlaylists(username, function(data) {
		//console.log("USERNAME", data);
		$scope.listPlaylists(data);
		var playlists = Quiz.getPlaylists();
		//console.log("playlists", playlists);
		if(data) {
			$location.path('user');
		}
		});
	}
	/*$scope.test = function() {
		console.log('test');
	};*/

	//$scope.test();
	//$scope.playlistInput = null;

	$scope.getPlaylist = function(link) {
		//gets the playlist
		//bad playlist https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP
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


	$scope.listPlaylists = function(data){
		//console.log("DATA", data.items);
		Quiz.listPlaylists(data);
	}

	//$scope.getPlaylists = function(){
		//if(Quiz.userPlaylists.length > 0){
		//$scope.playlists = Quiz.getPlaylists();
		//console.log("PLAY", $scope.playlists[0].name);
		//}
	//}

});