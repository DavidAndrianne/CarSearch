'use strict';

(function(){
	// Create a new module 'ng-main'
	var app = angular.module('ng-main', ['ngResource']);
	
	// Save our api_key as a constant value
	app.constant('api_key', '9JN9gvb2dv59PXJW883b');
	
	// Create a new angular service 'quandl' with ngResource : https://docs.angularjs.org/api/ngResource/service/$resource
	app.factory('quandl', function($resource){
		return $resource('https://www.quandl.com/api/v3/databases.json'); //declare a REST service with the ng-resource base functions
	});
	
	// Create a directive for a database
	app.directive('database', function(){
		return {
			//templateurl: 'database.html',
			scope: {
				databaseObject : "="
			},
			controller: function($scope){
				console.log("received db : " + $scope.databaseObject);
			}
	    };
	});
	
	// Add angular controller 'mainCtrl'
	app.controller('mainCtrl', function($scope, quandl, api_key){
		//init values
		$scope.filterPremium = false;
		$scope.query_databases = "Stock";
		
		$scope.updateTable = function(){
			quandl.get({query: $scope.query_databases, api_key : api_key}, function(response){
				$scope.databases = response.databases;
			});
		}
		
		$scope.viewDatabase = function(database){
			$scope.detailDB = database;
		};
		
		$scope.updateTable();
	});
})();