quizApp.controller('GameCtrl', function ($scope, $routeParams, Quiz) {

	

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
		return Quiz.questionList[Quiz.currentQuestionID];
	}

	$scope.nextQuestionButton = function() {
		// should be linked to the button for next question
		//console.log("YO")
		Quiz.currentQuestionID = Quiz.currentQuestionID + 1;
		//console.log(Quiz.currentQuestionID);
		if(Quiz.currentQuestionID === 3) {
			//hide button
			//butt.html('');
		}
		
		$scope.updateDivColor();
	}

	$scope.updateDivColor = function() {
		var id = ["alt1", "alt2", "alt3", "alt4"];
		for (i in id) {
			div = document.getElementById(id[i]);
			div.style.background="#FCE4EC";
		}
	}

	$scope.validateAnswer = function(alt, alternative) {

		var altID = "alt" + alt;
		var divID = document.getElementById(altID);
		console.log("question", $scope.question().correctAnswer);

		if (alternative !== $scope.question().correctAnswer) {
			console.log("YES")
			//fel svar blir rött när en klickar på det
			divID.style.background="#EF5350";
		}
		else {
			//rätt svar blir grönt när en klickar på det
			divID.style.background="#26A69A"
		}
		
		//göm forward
		//rätt svar ska lysa grönt direkt (?)
		//om rätta svaret är klickat, do nothing, 
		//om fel svar sätt div till röd färg
		//sätt divar till unclickable
		
	}

	$scope.correctAnswer = function() {

	}



});