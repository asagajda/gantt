'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);


phonecatControllers.controller('GanttCtrl', ['$scope', 'tasksOfPlan', 'DiagramBuilder',
  function($scope, tasksOfPlan, DiagramBuilder) {

	$scope.data1 = DiagramBuilder.buildDiagram();
	
	$scope.tasks = tasksOfPlan.query();

	$scope.data = [
	    {
	    name: 'row1', 
	    tasks: [
		{name: 'task1', from: new Date(2013, 9, 25, 15, 0, 0), to: new Date(2013, 9, 25, 18, 30, 0)},
		{name: 'task2', from: new Date(2013, 10, 1, 15, 0, 0), to: new Date(2013, 10, 1, 18, 0, 0)}
		]
	    },
	    {
	    name: 'row2', 
	    tasks: [
		{name: 'task3', from: new Date(2013, 10, 8, 15, 0, 0), to: new Date(2013, 10, 8, 18, 0, 0)},
		{name: 'task4', from: new Date(2013, 10, 15, 15, 0, 0), to: new Date(2013, 10, 15, 18, 0, 0)}
	      ]
	    },
	]

}
]
);
