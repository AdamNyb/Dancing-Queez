var quizApp = angular.module('quiz', ['ngRoute', 'ngResource']);

quizApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html',
				controller: "TestCtrl"
			}).
			otherwise({
				redirectTo: '/home'
			});

	}]);