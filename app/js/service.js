quizApp.factory('Quiz', function ($resource){

	this.currentScore = 0;
	this.playlist;

	var client_id = 'a280b16e9b4446928ed426a402c6f67a';
	var client_secret = '13d55b7e7b5545dbbeec042aff0c2907';

	this.Album = $resource('https://api.spotify.com/v1/albums/:id');

	this.Playlist = $resource('https://api.spotify.com/v1/users/:user_id/playlists/:playlist_id',{},{
        get:{
            method:"GET",
            isArray:false,
            headers:{
            	        Authorization: "Bearer BQDWz7SJn9Osm-BBPttb8R0dBt-Hu-8uX_Z--X4AdamRxSb0CDjhyOFBe6UrrdeHKc1jEk9p20MIqxdBqeZN0IN7RnqLBQDjtDA2_g0zZ6uXnOnUti2KYXn3KGugnhoATalWCm8uBxVsuT_nbQmSa_Sd9UKgBf0ewmuwUmhRaSIwYM7aOqE"

            } 
        },
    });

	this.playSong = function(trackID){
		//spelar upp 30 sekunder från låt
	};

	this.getAlbum = function (link){
		var album_id = this.getAlbumID(link);

		var playlist = this.Album.get({id: album_id}, 
			function(data){
				console.log('success');
			//if success, data will be a JSON object
		}, function(error){
			//if error
			if (error.status == 429){
				alert(error.message);
			}
			
		});

	};

	this.getAlbumID = function (link){
		var linkList = link.split("/");
		var len = linkList.length;
		var album_id = linkList[len-1];
		return album_id;
	};

	this.getPlaylist = function(link){
		//kolla om det finns minst 30 låtar (?)
		//tar ut info om låtarna i användarens playlist
		var playlist_id = this.getPlaylistID(link);
		var user_id = this.getUserID(link);


		this.Playlist.get({user_id: user_id, playlist_id: playlist_id}, 
			function(data){
				console.log('success');
				createGame(data.tracks.items); //needed to be able to return tracks
			//if success, data will be a JSON object

		}, function(error){
			//if error
			if (error.status == 429){
				alert(error.message);
			}
			
		});
		return this.playlist; 
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

	this.getPlaylist('https://open.spotify.com/user/113325595/playlist/5U6ibJ4AW3keswEmMhhtNP');
	//this.getAlbum('https://open.spotify.com/album/2eRL3OIp0Htj04g9k4FN1n');

	this.randomizeSongs = function(){
		//om fler än 30 låtar --> randomize vilka som används
	};

	this.createQuestions = function(tracks){
		//frågedatabas: låtnamn, artist, album
		//slumpa frågesträngar
		//3 frågor skapas för varje låt --> slumpa så att det endast finns
		//		en fråga per låt

		//data.tracks.items gives the list of tracks
		console.log("HEJ tracks",tracks);

		// questions database
		var questionDB = ['What is the name of this song?', 'Who made this song?', 'On what album is this song featured?'];
		// list of complete questions
		var questions;
		var len = track.length;
		var maxQ;
		if (len > 20 or len == 20) {
			maxQ = 20;
		} else if (len < 20) {
			maxQ = len;
		}
		for (var i = 0; i < maxQ; i++){
			console.log("This is the track",tracks[i]);
			// questionArray [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3, questionStr, chosenAnswer]
		}
	};

	this.setScore = function(currentScore){
		if (chosenAnswer == question.rightAnswer){
			currentScore = currentScore + 1;
		}
		return currentScore;
	};

	



return this;
});