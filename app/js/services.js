'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
  
phonecatServices.factory('tasksOfPlan', ['$resource',
  function($resource){
    return $resource('tasks.json', {}, {
      query: {method:'GET', params:{uid:'1234-1234-1234-1234'}, isArray:true}
    });
}]);

phonecatServices.factory('DiagramBuilder', ['tasksOfPlan', '$q', '$log',
  function(tasksOfPlan, $q, $log){
	var service = {};	
	var _selectedPlan = 'bla';
	var _diagramData = [];

	service.setPlan = function(plan)
	{
		_selectedPlan = plan;
	}
	
	service.getDiagram = function()
	{
		return _diagramData;
	}

	service.buildDiagram = function()
	{
		var deferred = $q.defer();
		tasksOfPlan.query({uid:_selectedPlan}).$promise.then(
			function(result)
			{
				var rows = [];	
				var users = [];
				for (var i = 0; i < result.length; i++){
					if ($.inArray(result[i].assignees[0], users)==-1)
					{
						var user = result[i].assignees[0];
						users.push(user);
						rows.push({user : user, tasks : []});
					};
				};
				for (var i = 0; i < rows.length; i++){
					for (var j = 0; j < result.length; j++){
						if (rows[i].user == result[j].assignees[0])
						{
							rows[i].tasks.push(result[j]);
						}
					}
				};
				deferred.resolve({myresult: rows});
			}
			
		);
		return deferred.promise;
		
	}
	
	return service;
}])
