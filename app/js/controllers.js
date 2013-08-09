'use strict';

function ScheduleCtlrOld($scope) {

	$scope.availablePeople = function(shift) {
	};


	$scope.assignedPeople = function(shift){

	};

	$scope.shiftNeed = function(shift) {

	};

	$scope.assignPerson=function(shift,person) {

	};

	$scope.unassignPerson=function(shift,person) {

	};


	$scope.schedule = { 
	"1/1/2013": {"12-8":0,"8-4":1,"4-12":2},
	"1/2/2013": {"12-8":2,"8-4":3,"4-12":3}};

	$scope.days = ["1/1/2013","1/2/2013"];
	$scope.times = ["12-8","8-4","4-12"];


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

	$scope.pete = {
		name:"Pete",
		availability: {
			"1/1/2013": {
				"8-4": {type:"ideal", assigned:false},
				"4-12": {type:"possible", assigned:false}
			},
			"1/2/2013": {
				"8-4": {type:"ideal", assigned:false},
				"4-12": {type:"possible", assigned:false}
			}

		}
	}

	$scope.lucy = {
		name:"Lucy",
		availability: {
			"1/1/2013": {
				"8-4": {type:"ideal", assigned:false},
				"4-12": {type:"possible", assigned:false}
			},
			"1/2/2013": {
				"8-4": {type:"ideal", assigned:false},
				"12-8": {type:"possible", assigned:false}
			}

		}
	}

	$scope.bob = {
		name:"Bob",
		availability: {
			"1/1/2013": {
				"12-8": {type:"ideal", assigned:false}
			},
			"1/2/2013": {
				"12-8": {type:"ideal", assigned:false}
			}
		}
	}

	$scope.allPeople = [$scope.sam,$scope.dave,$scope.al];
	$scope.displayPeople = [];
	//TODO rename to displayPeople
	$scope.people = [$scope.sam,$scope.dave,$scope.al];

	$scope.assignedSlots = {};

	$scope.$watch('allPeople',function() {
		for(var d = 0; d < $scope.days.length; d++) {
			var day = $scope.days[d];
			for(var t = 0; t < $scope.times.length; t++) {
				var time = $scope.times[t];
				for(var p = 0; p < $scope.allPeople.length; p++) {
					var person = $scope.allPeople[p];
					// if()
				}						
			}
		}
	},true);



	$scope.availability = [];
	$scope.$watch('people',function(){
		$scope.availability = [];
		for(var i = 0; i < $scope.people.length; i++) {
			var person = $scope.people[i];
			for(var j =0; j < person.availability.length; j++) {
				var availability = person.availability[j];
				var shift = {
					name:person.name,
					shift:availability,
					assigned:availability.assigned,
					preference:availability.type,
					toggle:function() {
						this.shift.assigned = !this.shift.assigned;
					}
				};
				$scope.availability.push(shift);
			}
		}
	},true);

	$scope.onlyAssigned = false;

	$scope.show = [$scope.dave.name, $scope.sam.name];



	$scope.showhide = function(person) {
		var index = $scope.show.indexOf(person.name);
		if(index == -1) {
			$scope.show.push(person.name);
		} else {
			$scope.show.splice(index,1);
		}
	}
}