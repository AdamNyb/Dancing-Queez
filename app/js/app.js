var quizApp = angular.module('quiz', ['ngRoute', 'ngResource']);

quizApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider){
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html',
				controller: "HomeCtrl"
			}).
			when('/game', {
				templateUrl: 'partials/game.html',
				controller: "GameCtrl"
			}).
			when('/score', {
				templateUrl: 'partials/score.html',
				
			}).
			otherwise({
				redirectTo: '/home'
			});

	}]);