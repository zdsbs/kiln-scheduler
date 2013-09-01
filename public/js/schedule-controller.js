'use strict';

function ScheduleCtlr($scope,dataServer) {

	$scope.shiftNeed = dataServer.shiftNeed();

	$scope.days = dataServer.getDays();
	$scope.times = dataServer.getTimes();

	$scope.people = dataServer.getAllPeople();
	$scope.peopleToShow = [];
	for(var i = 0; i < $scope.people.length;i++) {
		$scope.peopleToShow.push($scope.people[i]);
	}
	$scope.showOnlyAssigned = false;

	/*
	scheduleView is a data object of type:
	[day][time][{name,preferece=<ideal|possible>,assigned=<true|false>},...]
	*/
	$scope.scheduleView = {
		selectedPeople: function(day,time) {
			return this[day][time];
		}
	}


	$scope.showHide = function(person,show) {
		if(show) {
			$scope.peopleToShow.push(person);
		} else{
			$scope.peopleToShow = _.reject($scope.peopleToShow,function(item){
				return person.name == item.name;
			});
		}
	}

	$scope.toggleAssignment = function(name,day,time) {
		var person = _.find($scope.people,function(person) {return person.name == name});
		person.availability[day][time].assigned = !person.availability[day][time].assigned;
	}

	$scope.assignedPeopleCount = {};

	//utility functions - depdant on the days / times :(
	var forEachDayTime = function(action) {
		for(var i = 0; i < $scope.days.length; i++) {
			for(var j = 0; j < $scope.times.length; j++) {
				action($scope.days[i],$scope.times[j]);
			}
		}
	}
	this.forEachDayTime = forEachDayTime;

	var forEachDayTimeAvailable = function(person,action) {
		for (var day in person.availability) {
			for(var time in person.availability[day]) {
				action(person,day,time);
			}
		}
	};
	this.forEachDayTimeAvailable = forEachDayTimeAvailable;

	//initializers
	var initScheduleViewShift = function(day,time) {
		if(!$scope.scheduleView[day]) {
			$scope.scheduleView[day] = {};
		}
		$scope.scheduleView[day][time] = [];
	}

	var initAssignedPeopleCount = function() {
		var personAssigned = function(person,day,time) {
			if(person.availability[day] && person.availability[day][time] && person.availability[day][time].assigned) {
				return 1;
			} else {
				return 0;
			}
		}
		forEachDayTime(function(day,time){
			if(!$scope.assignedPeopleCount[day]) {
				$scope.assignedPeopleCount[day] = {};
			}
			$scope.assignedPeopleCount[day][time] = 0;
		});

		_.each($scope.people,function(person){
			forEachDayTimeAvailable(person,function(person,day,time) {
				$scope.assignedPeopleCount[day][time] += personAssigned(person,day,time);
			})
		});
	}

	//Render functions
	var showPerson = function(person) {
		var showPersonAction = function(person,day,time){
			var shiftDetails = person.availability[day][time];
			$scope.scheduleView[day][time].push({
				name:person.name,preference: shiftDetails.preference, assigned:shiftDetails.assigned
			});
		}

		forEachDayTimeAvailable(person,showPersonAction);
	}

	var hideOnlyAssigned = function() {
		for(var d = 0; d<$scope.days.length;d++) {
			var day = $scope.days[d];
			for(var t = 0; t<$scope.times.length;t++) {
				var time = $scope.times[t];
				var viewing = $scope.scheduleView[day][time];
				$scope.scheduleView[day][time] = _.reject(viewing,function(item) {
					return !item.assigned;
				});
			}
		}
	}

	var rerenderPeople = function() {
		forEachDayTime(initScheduleViewShift); //hide all people
		_.each($scope.peopleToShow,showPerson); //re calc the people to show
		if($scope.showOnlyAssigned) {
			hideOnlyAssigned();
		}
	}

	//watches
	$scope.$watch('people',function(){
		rerenderPeople();
		initAssignedPeopleCount();
	},true);

	$scope.$watch('peopleToShow',function() {
		rerenderPeople();
	},true);

	$scope.$watch('showOnlyAssigned',function() {
		rerenderPeople();
	});

}