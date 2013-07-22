'use strict';

function ScheduleCtlr($scope) {

	$scope.sam = {
		name:"Sam",
		availability: [
			{day:"1/1/2013",time:"4-12",type:"ideal",assigned:false},
			{day:"1/2/2013",time:"4-12",type:"possible",assigned:true},
			{day:"1/1/2013",time:"12-8",type:"possible",assigned:true},
			{day:"1/2/2013",time:"12-8",type:"possible",assigned:false}]
	}

	$scope.dave = {
			name:"Dave",
			availability: [
				{day:"1/1/2013",time:"12-8",type:"possible",assigned:false},
				{day:"1/1/2013",time:"4-12",type:"ideal",assigned:false},
				{day:"1/2/2013",time:"12-8",type:"possible",assigned:false}]
	}

	$scope.al = {
			name:"Al",
			availability: [
				{day:"1/1/2013",time:"8-4",type:"possible",assigned:false},
				{day:"1/1/2013",time:"4-12",type:"ideal",assigned:false},
				{day:"1/2/2013",time:"12-8",type:"possible",assigned:false}]
	}

	$scope.people = [$scope.sam,$scope.dave,$scope.al];

	$scope.availability = [];
	$scope.$watch('people',function(){
		$scope.availability = [];
		for(var i = 0; i < $scope.people.length; i++) {
			var person = $scope.people[i];
			for(var j =0; j < person.availability.length; j++) {
				var availability = person.availability[j];
				var shift = {name:person.name,
					shift:availability};
				$scope.availability.push(shift);
			}
		}
	},true);

	$scope.onlyAssigned = false;

	$scope.show = [];

	$scope.toggle = function(shift) {
		shift.shift.assigned = !shift.shift.assigned;
	}

	$scope.days = ["1/1/2013","1/2/2013"];
	$scope.times = ["12-8","8-4","4-12"];

	$scope.schedule = { 
		"1/1/2013": {"12-8":0,"8-4":1,"4-12":2},
		"1/2/2013": {"12-8":2,"8-4":3,"4-12":3}};

	$scope.showhide = function(person) {
		var index = $scope.show.indexOf(person.name);
		if(index == -1) {
			$scope.show.push(person.name);
		} else {
			$scope.show.splice(index,1);
		}
	}
}