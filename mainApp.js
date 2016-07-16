'use strict';

(function(){
	// Create a new module 'ng-main'
	var app = angular.module('ng-main', ['ngResource']);
	
	// Create a new angular service 'quandl' with ngResource : https://docs.angularjs.org/api/ngResource/service/$resource
	app.factory('quandl', function($resource){
		return $resource('https://www.quandl.com/api/v3/databases.json'); //declare a REST service with the ng-resource base functions
	});
	
	// Add angular controller 'demoCtrl'
	app.controller('demoCtrl', function($scope, quandl){
		
	});
})();