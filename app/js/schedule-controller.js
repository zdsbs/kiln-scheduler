'use strict';

function ScheduleCtlr($scope,dataServer) {

	$scope.assignedPeople = function(shift){
	};

	$scope.assignPerson=function(shift,person) {

	};

	$scope.unassignPerson=function(shift,person) {

	};


	$scope.shiftNeed = dataServer.shiftNeed();

	$scope.days = dataServer.getDays();
	$scope.times = dataServer.getTimes();

	$scope.people = dataServer.getAllPeople();
	$scope.peopleToShow = [];
	for(var i = 0; i < $scope.people.length;i++) {
		$scope.peopleToShow.push($scope.people[i]);
	}
	$scope.showOnlyAssigned = false;

	var scheduleView = {
		selectedPeople: function(day,time) {
			return this[day][time];
		}
	}

	var initScheduleView = function(days,times) {
		for(var i = 0; i < days.length; i++) {
			var day = days[i];		
			scheduleView[day] = {};
			for(var j = 0; j < times.length; j++) {
				var time = times[j];
				scheduleView[day][time] = [];
			}
		}
	}	

	initScheduleView($scope.days,$scope.times);
	$scope.scheduleView = scheduleView;

	var forEachDayTimeAvailable = function(person,action) {
		for (var day in person.availability) {
			for(var time in person.availability[day]) {
				action(person,day,time);
			}
		}
	};

	this.forEachDayTimeAvailable = forEachDayTimeAvailable;

	var showPersonAction = function(person,day,time){
		var shiftDetails = person.availability[day][time];
		$scope.scheduleView[day][time].push({
			name:person.name,preference: shiftDetails.preference, assigned:shiftDetails.assigned
		});
	}

	var hidePersonAction = function(person,day,time){
		$scope.scheduleView[day][time] = _.reject($scope.scheduleView[day][time],function(item) {
			return item.name == person.name;
		});
	}

	var hideAllPeople = function() {
		initScheduleView($scope.days,$scope.times);
	}
	var showPerson = function(person) {
		forEachDayTimeAvailable(person,showPersonAction);
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


	$scope.toggleAssignment = function(name,day,time) {
		var person = _.find($scope.people,function(person) {return person.name == name});
		person.availability[day][time].assigned = !person.availability[day][time].assigned;
	}

	var rerenderPeople = function() {
		hideAllPeople();
		_.each($scope.peopleToShow,showPerson);
		if($scope.showOnlyAssigned) {
			hideOnlyAssigned();
		}
	}

	$scope.$watch('people',function(){
		rerenderPeople();
	},true);

	$scope.$watch('peopleToShow',function() {
		rerenderPeople();
	},true);

	$scope.$watch('showOnlyAssigned',function() {
		rerenderPeople();
	});

}