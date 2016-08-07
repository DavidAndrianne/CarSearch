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
		$scope.startdate = new Date();
		$scope.datarange = "D";
		
		$scope.updateGraph = function(){
			$scope.date = $scope.startdate.getFullYear() + '-' + $scope.startdate.getMonth() + '-' + $scope.startdate.getDate();
			att.get({start_date : $scope.date, api_key: api_key}, function(result){
				$scope.db = result.dataset;
				$scope.labels = [];
				$scope.series = ['Closing value', 'Low value', 'High value'];
				$scope.data = [
					[], // closing stock value
					[], // low stock value
					[] // high stock value
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
				
				// Loop through data of each date
				switch ($scope.datarange) {
					// Simple iteration for each day
					case "D" : 
						for(var i = 0; i < result.dataset.data.length; i++){
							var arr = result.dataset.data[i];
							var date = arr[0];
							var highPrice = arr[2];
							var lowPrice = arr[3];
							var closingPrice = arr[4];
							addEntryToGraph(date, closingPrice, lowPrice, highPrice);
						}
						break;
					// Aggregated iteration per month
					case "M" :
						var currentMonth, currentMonthItems;
						var highPrice, lowPrice, closingPrice;
						for(var i = 0; i < result.dataset.data.length; i++){
							var arr = result.dataset.data[i];
							var date = new Date(arr[0]);
							currentMonth = currentMonth || date.getFullYear() + "-" + date.getMonth(); // if first loop, then take month of currentDate
							
							// if last item for this month, add data into graph
							if(date.getFullYear() + "-" + date.getMonth() != currentMonth){
								addEntryToGraph(currentMonth, closingPrice/currentMonthItems, lowPrice/currentMonthItems, highPrice/currentMonthItems);
								currentMonth = date.getFullYear() + "-" + date.getMonth(), currentMonthItems = 0;
								highPrice = 0, lowPrice = 0, closingPrice = 0;
							}
							
							// add prices to sum
							highPrice += arr[2];
							lowPrice += arr[3];
							closingPrice += arr[4];
							currentMonthItems++;
							
							if(i+1 == result.dataset.data.length) // If last item
								addEntryToGraph(currentMonth, closingPrice/currentMonthItems, lowPrice/currentMonthItems, highPrice/currentMonthItems);
						}
						break;
				}
			})
		};
		$scope.updateGraph();
		
		function addEntryToGraph(label, closingPrice, lowPrice, highPrice){
			$scope.labels.push(label); // Add the date to our x-axis
			$scope.data[0].push(closingPrice); // Add the closing price for this date
			$scope.data[1].push(lowPrice); // Add the low price for this date
			$scope.data[2].push(highPrice); // Add the high price for this date
		}
	});
})();