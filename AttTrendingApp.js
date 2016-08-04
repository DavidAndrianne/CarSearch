'use strict';

(function(){
	// Create a new module 'ng-main'
	var app = angular.module('ng-main', ['ngResource', "chart.js"]);
	
	// Save our api_key as a constant value
	app.constant('api_key', '9JN9gvb2dv59PXJW883b');
	
	// Create a new angular service 'att'
	app.factory('att', function($resource){
		return $resource('https://www.quandl.com/api/v3/datasets/WIKI/T.json'); //See https://www.quandl.com/blog/getting-started-with-the-quandl-api#DataManipulation
	});
	
	// Add angular controller 'mainCtrl'
	app.controller('attTrendingCtrl', function($scope, att, api_key){
		//init values
		var today = new Date();
		$scope.date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
		att.get({start_date : $scope.date, api_key: api_key}, function(result){
			$scope.db = result.dataset;
			$scope.labels = [/*"January", "February", "March", "April", "May", "June", "July"*/];
			  $scope.series = ['AT&T closing prices'/*, 'Series B'*/];
			  $scope.data = [
			  []
				/*[65, 59, 80, 81, 56, 55, 40],
				[28, 48, 40, 19, 86, 27, 90]*/
			  ];
			  $scope.onClick = function (points, evt) {
				console.log(points, evt);
			  };
			  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
			  $scope.options = {
				scales: {
				  yAxes: [
					{
					  id: 'y-axis-1',
					  type: 'linear',
					  display: true,
					  position: 'left'
					},
					{
					  id: 'y-axis-2',
					  type: 'linear',
					  display: true,
					  position: 'right'
					}
				  ]
				}
			  };
			
			// Loop through data
			for(var i = 0; i < result.dataset.data.length; i++){
				var arr = result.dataset.data[i];
				var date = arr[0];
				var closingPrice = arr[4];
				$scope.labels.push(date); // Add the date to our x-axis
				$scope.data[0].push(closingPrice); // Add the closing price for this date
			}
			console.log($scope.chartdatasource.dataset[0].data);
		});
	});
})();