var quizApp = angular.module('quiz', ['ngRoute', 'ngResource', 'ngStorage']);

quizApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider){
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html',
				controller: "HomeCtrl"
			}).
			when('/user', {
				templateUrl: 'partials/user.html',
				controller: "HomeCtrl"
			}).
			when('/game', {
				templateUrl: 'partials/game.html',
				controller: "GameCtrl"
			}).
			when('/score', {
				templateUrl: 'partials/score.html',
				controller: "ScoreCtrl"
			}).
			otherwise({
				redirectTo: '/home'
			});

	}]);