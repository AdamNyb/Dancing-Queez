quizApp.factory('Quiz', function ($resource){

	this.currentScore = 0;
	this.playlist;
	this.questionList = [];
	this.currentQuestionID = 0;

	var client_id = 'a280b16e9b4446928ed426a402c6f67a';
	var client_secret = '13d55b7e7b5545dbbeec042aff0c2907';

	this.Album = $resource('https://api.spotify.com/v1/albums/:id');

	this.Playlist = $resource('https://api.spotify.com/v1/users/:user_id/playlists/:playlist_id',{},{
        get:{
            method:"GET",
            isArray:false,
            headers:{
            	        Authorization: "Bearer BQAIlhiL1v4wJNgQhvloNAUld75LKaYMA7fWlt0_4bjcqZbP9gMAUpJPusiCZjEULh_KlyFfm7q4wlR6YOqTrT3He_0HS1865Y4ICZSrdeQbXnIxwW04Bk_i989Uhe4MRjWI68j-oQoLVnxx6le3ZW9tNJkcaJp9qt6hOQ"

            } 
        },
    });

	this.savePlaylist = function (playlist_object){
		this.playlist = [];
		this.playlist = playlist_object;
		return this.playlist;
	}

	//fallback if the given playlist has a lot of artists/albums with the same name
	this.artistList = [];
	this.albumList = [];

	this.isInArray = function(value, array) {
		//checks if value is in array
		return array.indexOf(value) > -1;
	}

	this.createArtistList = function(tracks) {
		for (var i = 0; i < tracks.length; i++){
			var currentValue = String(tracks[i].track.artists[0].name);
			//checks if current value is in the list
			// if not, puts it into list
			if (this.isInArray(currentValue, this.artistList) == false) {
				this.artistList.push(currentValue);
			}
		}
		//console.log(this.artistList);
	};

	this.createAlbumList = function(tracks) {
		for (var i = 0; i < tracks.length; i++){
			var currentValue = String(tracks[i].track.album.name);
			//checks if current value is in the list
			// if not, puts it into list
			if (this.isInArray(currentValue, this.albumList) == false) {
				this.albumList.push(currentValue);
			}
		}
		//console.log(this.albumList);
	};

	this.createQuestions = function(tracks){
		//frågedatabas: låtnamn, artist, album
		//slumpa frågesträngar
		//3 frågor skapas för varje låt --> slumpa så att det endast finns
		//		en fråga per låt

		//data.tracks.items gives the list of tracks
		//console.log("HEJ tracks",tracks);

		// these should probably not be here...
		//console.log(tracks);
		if (this.questionList.length == 0) {
			this.createArtistList(tracks);
			this.createAlbumList(tracks);


			// questions database
			var questionDB = ['What is the name of this song?', 'Who made this song?', 'On what album is this song featured?'];
			// list of complete questions
			//var questionList = [];
			var len = tracks.length;
			// sets our max number of questions
			var maxQ;
			if (len > 20 || len == 20) {
				maxQ = 20;
			} else if (len < 20) {
				maxQ = len;
			}
			// for each question, create a question
			for (var i = 0; i < maxQ; i++){
				var currentTrack = tracks[i].track;
				var question = {
					questionStr: null,
					correctAnswer: null,
					wrongAnswer1: null,
					wrongAnswer2: null,
					wrongAnswer3: null,
					answered: false,
					chosenAnswer: null,
					questionType: null,
					id: i
				};
				// question [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3, questionStr, chosenAnswer]
				//randomize a number between 0 and 2
				var max = 2;
				var min = 0;
				var num = this.randomizeNumber(min,max);

				if (num == 0) {
					// the question is about the song name
					question.correctAnswer = String(currentTrack.name);
					question.questionType = 'song';
				} else if (num == 1) {
					// the question is about the artist name
					question.correctAnswer = String(currentTrack.artists[0].name);
					question.questionType = 'artist';
				} else if (num == 2) {
					// the question is about the album
					question.correctAnswer = String(currentTrack.album.name);
					question.questionType = 'album';
				}
				// generates wrongs answers + question
				question.questionStr = questionDB[num];
				question.wrongAnswer1 = this.randomAnswer(tracks, maxQ, question.questionType, question.correctAnswer);
				question.wrongAnswer2 = this.randomAnswer(tracks, maxQ, question.questionType, question.correctAnswer, question.wrongAnswer1);
				question.wrongAnswer3 = this.randomAnswer(tracks, maxQ, question.questionType, question.correctAnswer, question.wrongAnswer1, question.wrongAnswer2);

				// pushes the question into the questions list
				this.questionList.push(question);
			}
			//console.log("These are our questions:",this.questionList);
		}
		//return this.questionList;
	};


	this.randomAnswer = function(tracks, maxQ, type, correctAnswer, wrongAnswer1, wrongAnswer2) {
		//generates a random track name from the playlist
		// not the same name as the current track
		var max = maxQ;
		var min = 0;
		var num;
		var randomAnswer;
		var continueLoop = true;
		
		while (continueLoop == true) {
			num = this.randomizeNumber(min,max);
			// depending on what type the answer should be, generate the answer differently
			if (type == 'song') {
				randomAnswer = String(tracks[num].track.name);
			} else if (type == 'artist') {
				randomAnswer = this.artistList[num];
			} else if (type == 'album') {
				randomAnswer = this.albumList[num];
			}
			// if the random answer is not the same as the other answers, stop the loop
			if (randomAnswer != correctAnswer && randomAnswer != wrongAnswer1 && randomAnswer != wrongAnswer2) {
				continueLoop = false;
			}
		} 
		return randomAnswer;

	};

	this.randomizeNumber = function(min,max) {
		// randomize a number
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.getPlaylist = function(link,cb){
		//kolla om det finns minst 30 låtar (?)
		//tar ut info om låtarna i användarens playlist
		var playlist_id = this.getPlaylistID(link);
		var user_id = this.getUserID(link);


		this.Playlist.get({user_id: user_id, playlist_id: playlist_id}, 
			function(data){
				console.log('success');
				return cb(data);
				//this.createQuestions(data.tracks.items);
				//createGame(data.tracks.items); //needed to be able to return tracks
				//if success, data will be a JSON object

		}, function(error){
			//if error
			if (error.status == 429){
				alert(error.message);
			}
			
		});
		//console.log("This is our data!",data);
		//return this.playlist; 
	};

	this.getPlaylistID = function(link) {
		var linkList = link.split("/");
		var len = linkList.length;
		var playlist_id = linkList[len-1];
		return playlist_id;
	};

	this.getUserID = function(link){
		var linkList = link.split("/");
		var len = linkList.length;
		var user_id = linkList[len-3];
		return user_id;
	};

	var createGame = function(tracks){ //tracks is an array of track objects
		if (tracks.length > 20){
			console.log(tracks);
			var newTracks = [];
			tracks = tracks[Math.floor(Math.random()*tracks.length)];
			console.log(tracks);
		}
		if (tracks.track){
			console.log('playing');
			playSong(tracks.track.preview_url);
			console.log('played');
		}
	}

	var playSong = function(url){
		var songAudio = new Audio(url).play();
		console.log(url); 
	}

	//this.getPlaylist('https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP');
	//this.getAlbum('https://open.spotify.com/album/2eRL3OIp0Htj04g9k4FN1n');

	this.randomizeSongs = function(){
		//om fler än 30 låtar --> randomize vilka som används
	};

	


	this.setScore = function(currentScore){
		if (chosenAnswer == question.rightAnswer){
			currentScore = currentScore + 1;
		}
		return currentScore;
	};

	



return this;
});