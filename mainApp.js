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
	// Create a new angular service 'datasets' for querying quandl datasets
	/*app.factory('datasets', function($resource){
		return $resource('https://www.quandl.com/api/v3/datasets'); //example query : ?database_code=YFinance&include%5B%5D=latest_values&include%5B%5D=related_datasets&page=1&per_page=20&query=AT%26
	});*/
	
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
	app.controller('mainCtrl', function($scope, $location, quandl, /*datasets,*/ api_key){
		//init values
		$scope.filterPremium = false;
		$scope.query_databases = "Stock";
		
		/*
		 * Updates the list of available databases
		 */
		$scope.updateTable = function(){
			quandl.get({query: $scope.query_databases, api_key: api_key}, function(response){
				$scope.databases = response.databases;
			});
		};
		
		/*
		 * Views a database in detail with it's icon, description and subsequent datasets
		 */
		$scope.viewDatabase = function(database){
			$scope.detailDB = database;
			//$scope.updateDatasets(); // update datasets for selected database
		};
		
		/*
		 * Updates the datasets for the selected database and specified querystring
		 */
		/*$scope.updateDatasets = function(){
			datasets.query({database_code:$scope.detailDB.name, query: $scope.datasetQuery}, function(datasets){
				$scope.datasets = datasets;
			});
		};*/
		
		/*
		 * This function redirects the user to the specified url
		 */
		$scope.redirect = function(url){
			//$location.url(url); 
			window.location = url; // $location.url doesn't work for local testing
		};
		
		$scope.updateTable();
	});
})();