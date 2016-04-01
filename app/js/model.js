quizApp.factory('Quiz', function ($resource){

	this.currentScore = 0;

	this.Playlist = $resource('https://api.spotify.com/v1/search?type=playlist');

	this.playSong = function(trackID){
		//spelar upp 30 sekunder från låt
	};

	this.getPlaylist = function(){
		//kolla om det finns minst 30 låtar (?)
		//tar ut info om låtarna i användarens playlist
		var gottenPlaylist = this.Playlist.get({queryshit}, function(data){
			//if success, data will be a JSON object
		}, function(error){
			//if error
			if (error.status == 429){
				alert(error.message);
			}
			
		});
	};

	this.randomizeSongs = function(){
		//om fler än 30 låtar --> randomize vilka som används
	};

	this.createQuestions = function(){
		//frågedatabas: låtnamn, artist, album
		//slumpa frågesträngar
		//3 frågor skapas för varje låt --> slumpa så att det endast finns
		//		en fråga per låt
	};

	this.setScore = function(currentScore){
		if (chosenAnswer == question.rightAnswer){
			currentScore = currentScore + 1;
		}
		return currentScore;
	};




};