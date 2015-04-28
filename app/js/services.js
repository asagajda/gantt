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

phonecatServices.factory('DiagramBuilder', ['tasksOfPlan', 
  function(tasksOfPlan){
	var service = {};	
	var _selectedPlan = 'bla';
	

	service.setPlan = function(plan)
	{
		_selectedPlan = plan;
	}

	service.buildDiagram = function()
	{
		return tasksOfPlan.query({uid:_selectedPlan});//.$promise;/*.then(
			/*function(promise)
			{
				/*var users = [];
				var rows = [];		
				for (var i = 0; i < promise.length; i++){
					if ($.inArray(promise[i].assignees[0], users)==-1)
					{
						rows[promise[i].assignees[0]] = [];
					};
				};
				for (var i = 0; i < promise.length; i++){
					rows[promise[i].assignees[0]].push(promise[i]);
				};
				return promise;
			}*/
			
		//);
	}
	
	return service;
}])
