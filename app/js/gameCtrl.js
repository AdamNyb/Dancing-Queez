quizApp.controller('GameCtrl', function ($scope, $routeParams, $location, Quiz, $sce) {

	$scope.scoreboard = Quiz.scoreboard;
	//console.log("SCOOOOORE", $scope.scoreboard);
	$scope.hideForward=true

	$scope.hideVolumeOff=true
	$scope.playlistName = function(){ //playlistens namn
		if(Quiz.playlist){
			return Quiz.playlist.name;
		}
	};

	$scope.createQuestions = function() {
		if (Quiz.playlist){
			return Quiz.createQuestions(Quiz.playlist.tracks.items);//tracks
		}
	}

	$scope.question = function() {
		// is called by view, creates all questions (only the first time)
		// and returns the current question
		$scope.createQuestions();
		return Quiz.questionList[Quiz.currentQuestionPosition];
	}

	$scope.nextQuestionButton = function() {
		// linked to the button for next question
		if (Quiz.questionList[Quiz.currentQuestionPosition].lastQuestion == true) {
			//last question redirects to score
			$location.path('score');
		} else {
			Quiz.currentQuestionPosition = Quiz.currentQuestionPosition + 1;

			
		}
		Quiz.firstPlay = false;
		$scope.updateDivColor();
		$scope.hideForward=true
	}

	$scope.updateDivColor = function() {
		//updates answer divs with standard color before next question
		var id = ["alt1", "alt2", "alt3", "alt4"]; //available div id's
		for (i in id) {
			div = document.getElementById(id[i]);
			div.style.background="#00BCD4";
		}
	}

	$scope.validateAnswer = function(alt, alternative) {
		//validates answer wrong/right plus color change to clicked div
		//sends data to scoreboard, stops user from answering more than once.
		//$scope.correctAnswer();
		$scope.hideForward=false //hides forward button
		
		var currentQuestion = Quiz.questionList[Quiz.currentQuestionPosition];
			var currentQuestionID = currentQuestion.id;
		
		if (currentQuestion.answered === false) {
			var altID = "alt" + alt;
			var divID = document.getElementById(altID);
			


			if (alternative !== currentQuestion.correctAnswer) {
				correctAnswer(currentQuestion.correctAnswer)
				//wrong answer turns black
				divID.style.background="#F44336";
				Quiz.scoreboard[Quiz.currentQuestionPosition].correct = 0; //update scoreboard

			}
			else {
				Quiz.setScore(Quiz.getScore() + 1);
				//right answer turns greenish
				divID.style.background="#8BC34A" /*#26A69A*/
				Quiz.scoreboard[Quiz.currentQuestionPosition].correct = 1; //update scoreboard
			}
			currentQuestion.answered = true; //to stop user to answer same question twice
			Quiz.scoreboard[Quiz.currentQuestionPosition].userAnswer = alternative;
		}
		$scope.setNotes(Quiz.currentQuestionPosition);
	}
	

	var correctAnswer = function(correctAnswer) {
		//Only runs when wrong answer in game is clicked. Compares the
		//text in the divs with the correct answer. If there is a match
		//the container turns green. 
	setTimeout(function timeDelay() { //turn green after 600ms


		for (var i=1; i < 5;i++){
			var answerDiv = "answer" + i;
			var answer = document.getElementById(answerDiv).innerText; //get the text in the answer-divs
			
			if (answer === correctAnswer){
				var altID = "alt" + i;
				var divID = document.getElementById(altID);
				divID.style.background="#8BC34A"

				setTimeout(function blink(){	//turn blue after 300ms
					divID.style.background="#00BCD4"

					setTimeout(function blink(){	//turn green after 300ms
						divID.style.background="#8BC34A"	
					},300);

				},300);
			}		
				}
		

		//om vi vill att det rätta svaret ska bli grönt oavsett
		//vad som klickats på
	},600);
	}

	$scope.currentSong = function(){
		// this is the current song that should be playing
		if (Quiz.firstPlay == false && Quiz.questionList.length > 0){

			return $sce.trustAsResourceUrl(Quiz.questionList[Quiz.currentQuestionPosition].previewUrl);
		}
		// end
	}

	$scope.playSong = function(){
		// plays the song
		if (Quiz.firstPlay == false && Quiz.questionList.length > 0){ //förhindrar Angulars digest loop från att spela upp låten 1000ggr samtidigt
			//firstPlay är att låten spelades när man startar frågan

			Quiz.playSong();
		};
		// end
	};

	$scope.pauseSong = function(){
		console.log('pause')
		// pauses the sound
		if(Quiz.paused == false){ 
			$scope.hideVolumeUp=true
			$scope.hideVolumeOff=false
			Quiz.pauseSong();
		}
		else if (Quiz.paused == true){
			$scope.hideVolumeUp=false
			$scope.hideVolumeOff=true
			Quiz.playSong();
		};
		//end
	};

	$scope.numberOfQuestions = function() {
		//returns number of total questions to be asked
		return Quiz.questionList.length;
	}

	
	$scope.changeVolumeUp = function(){

			
			$scope.hideVolumeUp=true
			$scope.hideVolumeOff=false
		}

	

	$scope.changeVolumeOff = function(){
			console.log('a')
			$scope.hideVolumeUp=false
			$scope.hideVolumeOff=true
		};

	
	$scope.setNotes = function(questionNumber) {
		// den tar in vilket nummer det är, gör om noterna
		//och skriver ut det nya antalet noter
		//console.log("YO", questionNumber);
		var width = "30px";
		var height = "30px";

		var position = questionNumber;
		var scoreBoard = Quiz.getScoreboard();
		//console.log(data);
		var data = [scoreBoard[position]];
		//for (var i = 0; i <= position; i++) {
		//	tempData = scoreBoard[i];
		//	data.push(tempData);
			//console.log("i", i);
			//console.log("temp: ", tempData);
		//}

		var svg = d3.select("#noteProgress").append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "note");

		var note = svg.selectAll(".note")
				.data(data)
			.enter().append("svg")
				.attr("width", "25px")
				.attr("height", "25px")
				.attr("class", "note")
				.attr("x", function(d, i) {return i; })
				.attr("y", function(d, i) {
					if(i%2 !== 0) {
						return i; 
					} else {
						return i*3;
					}
				})
				



				.attr("viewBox", "0 0 512 512")
				//.attr("enable-background", "new 0 0 512 512")
				.attr("fill", function(d) {
					if (d.correct == 0) {
						return "#F44336";
					} else {
						return "#8BC34A";
					}
				})
				.append("path")
					.attr("d", "M272,48h-32v304.594C223,342.375,200.688,336,176,336c-53,0-96,28.625-96,64s43,64,96,64s96-28.625,96-64V144c80-13,128,80,160,128C412,48,272,48,272,48z")
		//console.log("DATA:", data);
	}
	

	
		
});