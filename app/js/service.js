quizApp.factory('Quiz', function ($resource, $document, $sce, $localStorage){
	this.authorizationKey = "Bearer BQBAeNzuFDP0_PKaJ52vbWxNKKZi2a6RPPaaVN-0G5DhwwykYOy2o2czN9P1JGoSTfNmdXdXStFuag2CgsLI5r86w0eB8LZhjY13cmsvZ0ZJdIzs4OM5uQcuVBbf1w7wMsbO_yRNvonCCFdsmq3gFElY-Pk7WvNK0b9rEzShmA";

	this.$storage = $localStorage.$default({
		score: 0,
		scoreboard: [],
		playlist: undefined,
		//question: null,
		questionList: [],
		currentQuestionPosition: 0
	});

	if(this.$storage.playlist){
		this.score = this.$storage.score;
		this.scoreboard = this.$storage.scoreboard; // on the form {correct: 0, questionNumber: i+1}, used by score.html to display answers
		this.playlist = this.$storage.playlist;
		this.questionList = this.$storage.questionList;
		this.currentQuestionPosition = this.$storage.currentQuestionPosition;
	}
	else{
		this.score = 0;
		this.scoreboard = []; // on the form {correct: 0, questionNumber: i+1}, used by score.html to display answers
		this.playlist;
		this.questionList = [];
		this.firstPlay = false;
		this.paused = false;
		this.currentQuestionPosition = 0;
	};

	this.count;
	this.userPlaylists = [];
	

	var client_id = 'a280b16e9b4446928ed426a402c6f67a';
	var client_secret = '13d55b7e7b5545dbbeec042aff0c2907';

	this.Album = $resource('https://api.spotify.com/v1/albums/:id');

	this.Playlist = $resource('https://api.spotify.com/v1/users/:user_id/playlists/:playlist_id',{},{
        get:{
            method:"GET",
            isArray:false,
            headers:{

				Authorization: this.authorizationKey//"Bearer BQCXnXDXdDjiO2tBCoERZ8BuHW3QAHASCrZIKkp-6C6R_IdCKzK-2LOiLBmH1WIHvnULJkNa5ri__6YcenoyI8yb_sfQI1pVk8R6Vn67zemoW-EvagG3wYitPo6kqidXY2jzTuz0CaUMiYfNTqo8ubSA9se-GS4502oEoEn2eDvqymjO_InA3qqZyLc1KDgvTtDlxGIyS-mdmVA5HoA"



            } 
        },
    });

    this.User = $resource('https://api.spotify.com/v1/users/:user_id/playlists', {}, {
    	get: {
    		method:"GET",
    		isArray: false,
    		headers: {

    		Authorization: this.authorizationKey //"Bearer BQDm8zKB50GL6jnJ_GF5QEomq2pcJEOKuqIYiJhzuA21P05dQQ98TQoplGi019hOCaehPqtWKRx2I5DC28k4DAN_e6lGg30vkYwvaIiilmLItuyftHm9_ivTnhh5CrUaCU6vlUUKLC33_H3IXrktZrNq62ItuHFj3t2qTZutjaOm2dTxo8Ji_aZHIxOdOCj35we2YOk1eiBo1e4IBrU"
    		}
    	},
    });

    this.resetGame = function() {
    	this.score = 0;
    	this.scoreboard = [];
    	this.playlist = undefined;
    	this.questionList = [];
    	this.currentQuestionPosition = 0;
    	this.artistList = [];
		this.albumList = [];
		this.firstPlay = false;
		this.paused = false;
    };

    this.resetScore = function() {
    	// resets the score
    	this.score = 0;
    	this.currentQuestionPosition = 0;
    	this.firstPlay = false;
    	this.paused = false;
    	for (var i = 0; i < this.questionList.length; i++) {
    		this.questionList[i].answered = false;
    	}
    	for (var j = 0; j < this.scoreboard.length; j++) {
    		//this.questionList[j].answered = false;
    		//this.scoreboard.push({correct: 0, questionID: i+1,correctAnswer: question.correctAnswer, userAnswer: null, questionStr: question.questionStr})
    		this.scoreboard[j].correct = 0;
    		this.scoreboard[j].userAnswer = null
    	}

    	/////cookie
    	this.$storage.score = this.score;
    	this.$storage.currentQuestionPosition = this.currentQuestionPosition;
    	this.$storage.scoreboard = this.scoreboard;
    }


	this.savePlaylist = function (playlist_object){
		//console.log("playlist object", playlist_object);
		//console.log("playlist tracks", playlist_object.tracks);
		//console.log("Playlistobject1",playlist_object.tracks.items);
		playlist_object.tracks.items = this.removeSongsWithoutPreviewUrl(playlist_object.tracks.items);
		playlist_object.tracks.items = this.randomizeSongs(playlist_object.tracks.items);
		this.playlist = [];
		this.playlist = playlist_object;
		//////////////////cookie
		this.$storage.playlist = this.playlist;
		return this.playlist;
	}

	this.removeSongsWithoutPreviewUrl = function(tracks) {
		//console.log("lets remove songs without preview url", tracks);
		var usableSongs = [];
		for (var i = 0; i < tracks.length; i ++) {
			if (tracks[i].track.preview_url != null) {
				usableSongs.push(tracks[i]);
			}
		}
		//console.log("return these songs", usableSongs);
		//console.log("number of songs",usableSongs.length);
		return usableSongs
	}

	this.randomizeSongs = function(tracks){
		//om fler än 20 låtar --> randomize vilka som används
		//console.log("let's randomize songs!");
		var randomizedTracks = [];
		var tracksLen = tracks.length;
		var usedNums = [];
		var maxQ;

		if (tracksLen > 20 || tracksLen == 20) {
			maxQ = 20;
		} else if (tracksLen < 20) {
			maxQ = tracksLen;
		}

		while (randomizedTracks.length < maxQ){
			num = this.randomizeNumber(1,tracksLen) - 1; // -1 because index starts with 0
			//console.log(num);
			//console.log(tracks[num].track.preview_url);

			if (this.isInArray(num, usedNums) == false) {
				usedNums.push(num);
				//console.log(tracks[num].track.name," has not been chosen, let's put it in our list");
				randomizedTracks.push(tracks[num]);
			}
		}
		//console.log("randomized tracks!",randomizedTracks);
		return randomizedTracks;
	};


	//fallback if the given playlist has a lot of artists/albums with the same name
	this.artistList = [];
	this.albumList = [];

	this.isInArray = function(value, array) {
		//checks if value is in array
		//console.log("Is ",value," in our arrray?");
		//console.log("this is our array", array);
		//console.log("ANSWER",array.indexOf(value) > -1);
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
		//console.log("TRACKS",tracks);
		if (this.questionList.length == 0) {
			this.createArtistList(tracks);
			this.createAlbumList(tracks);


			// questions database
			var songQuestions = ['What is the name of this song?','Name this track!', "What's the title of this track?", 'What is this song called?'];
			var artistQuestions = ['Who made this song?','What is the name of this artist?', 'Who is the creator of this track?'];
			var albumQuestions = ['On what album is this song featured?','Name the album?', 'What is the name of this album?'];
			var questionDB = [songQuestions, artistQuestions, albumQuestions];
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
					answerAlternatives: [],
					answered: false,
					chosenAnswer: null,
					questionType: null,
					previewUrl: null,
					lastQuestion: false,
					id: i+1
				};
				//randomize a number between 0 and 2
				var max = 2;
				var min = 0;
				var num = this.randomizeNumber(min,max);

				if (num == 0) {
					// the question is about the song name
					question.questionType = 'song';
					question.correctAnswer = String(currentTrack.name);
				} else if (num == 1) {
					// the question is about the artist name
					question.questionType = 'artist';
					question.correctAnswer = String(currentTrack.artists[0].name);
				} else if (num == 2) {
					// the question is about the album
					question.questionType = 'album';
					question.correctAnswer = String(currentTrack.album.name);
				}
				// generates wrongs answers + question
				var randomQuestionNum = this.randomizeNumber(0,questionDB[num].length-1);
				question.questionStr = questionDB[num][randomQuestionNum];
				question.previewUrl = String(currentTrack.preview_url);
				var wrongAnswer1 = this.randomAnswer(tracks, maxQ, question.questionType, question.correctAnswer);
				var wrongAnswer2 = this.randomAnswer(tracks, maxQ, question.questionType, question.correctAnswer, wrongAnswer1);
				var wrongAnswer3 = this.randomAnswer(tracks, maxQ, question.questionType, question.correctAnswer, wrongAnswer1, wrongAnswer2);

				// pushes the answer alternatives to the array and then shuffles it
				question.answerAlternatives.push(question.correctAnswer);
				question.answerAlternatives.push(wrongAnswer1);
				question.answerAlternatives.push(wrongAnswer2);
				question.answerAlternatives.push(wrongAnswer3);
				question.answerAlternatives = this.shuffleArray(question.answerAlternatives);

				//sets the lastQuestion attribute to true for the last questions
				if (i == maxQ-1) {
					question.lastQuestion = true;
				}
				this.scoreboard.push({correct: 0, questionID: i+1,correctAnswer: question.correctAnswer, userAnswer: null, questionStr: question.questionStr})

				// pushes the question into the questions list
				this.questionList.push(question);
			}
			console.log("Scoreboard:",this.scoreboard);
			this.setScoreboard(this.scoreboard);
			///////////cookie
			this.$storage.questionList = this.questionList;
		}
		//return this.questionList;
	};

	this.shuffleArray = function(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
	}

	return array;
	}

	this.randomAnswer = function(tracks, maxQ, type, correctAnswer, wrongAnswer1, wrongAnswer2) {
		//generates a random track name from the playlist
		// not the same name as the current track
		var max = maxQ-1;
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
			if (randomAnswer != correctAnswer && randomAnswer != wrongAnswer1 && randomAnswer != wrongAnswer2 && randomAnswer != undefined) {
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
				sweetAlert(error.message);
			}
			if (error.status == 404){
				sweetAlert('Invalid Playlist URL :(');
			}
			if (error.status == 401){
				sweetAlert('Please request new OAUTH TOKEN :(');
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

	this.playSong = function(){
		console.log('PLAYING');
		var audioElement = document.getElementById('currentSong');
		audioElement.play();
		this.firstPlay = true;
		this.paused = false;
	};

	this.pauseSong = function(currentSong){
		console.log('PAUSING');
		var audioElement = document.getElementById('currentSong');
		audioElement.pause();
		this.paused = true;
	}

	this.playAnswer = function(answer){ //answer är antingen 'correctAnswer', 'wrongAnswer1', 'wrongAnswer2' eller 'wrongAnswer3'
		var answerAudio = function(answer){
			if (answer == 'correctAnswer'){
				return new Audio(insertljudfilhere).play();
			} else {
				return new Audio(insertFelLjudFilHere).play();
			};
		};
	};


	//this.getPlaylist('https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP');
	//this.getAlbum('https://open.spotify.com/album/2eRL3OIp0Htj04g9k4FN1n');


	this.getScore = function(){
		return this.score;
	};


	this.setScore = function(num){
		this.score = num;
		///////////cookie
		this.$storage.score = this.score;
	};

	this.setScoreboard = function(newScoreboard) {
		this.scoreboard = newScoreboard;
		///////////cookie
		this.$storage.scoreboard = this.scoreboard;
	};

	this.getScoreboard = function() {
		return this.scoreboard;
	}

	this.getUserPlaylists = function(username, cb) {
		this.User.get({user_id: username}, 
			function(data){
				console.log('success', data);
				return cb(data);
				//this.createQuestions(data.tracks.items);
				//createGame(data.tracks.items); //needed to be able to return tracks
				//if success, data will be a JSON object

		}, function(error){
			if (error.status == 429){
				sweetAlert(error.message);
			}
			if (error.status == 404){
				sweetAlert('Invalid Username :(');
			}
			if (error.status == 401){
				sweetAlert('Token :(');
			}
		});
		//ta ut alla usernames playlist links
	}

	this.listPlaylists = function(data) {

		//console.log("listPlaylists function; data", data.items.length);
		for (var i = 0; i < data.items.length; i++) {
			//console.log("data[i]",i, data.items[i]);
			this.userPlaylists.push(data.items[i]);
		}
		this.setPlaylists(this.userPlaylists);
		//console.log("in listPlaylists function; userPlaylists", this.userPlaylists);
	}

	this.setPlaylists = function(userPlaylists) {
		//console.log("in setPlaylist function; this.userPlaylists", this.userPlaylists);
		this.userPlaylists = userPlaylists;
		//console.log("NAME:", this.userPlaylists.items.name);
	};

	this.getPlaylists = function() {

		return this.userPlaylists;
	}


return this;
});