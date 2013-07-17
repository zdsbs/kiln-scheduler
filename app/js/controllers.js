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

	$scope.schedule = [
		{ day: "1/1/2013",
		  shifts: [
				{time:"12-8", need:0, possible:["Sam,Dave"], ideal:["Peter"]},
				{time:"8-4", need:1, possible:["Peter,Dave"], ideal:[]},
				{time:"4-12", need:2, possible:["Dave"], ideal:["Peter"]}]},

		{ day: "1/2/2013",
		  shifts: [
				{time:"12-8", need:2},
				{time:"8-4", need:3},
				{time:"4-12", need:3}]}
	];

	$scope.showhide = function(person) {
		var index = $scope.show.indexOf(person.name);
		if(index == -1) {
			$scope.show.push(person.name);
		} else {
			$scope.show.splice(index,1);
		}
	}
}