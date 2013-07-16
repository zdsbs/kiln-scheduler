'use strict';

function FooCtlr($scope) {

	$scope.samShifts = 


	$scope.people = [{
		"1/1/2013": {"12-8":"ideal", "4-12":"possible"},
		"1/2/2013": {"12-8":"ideal", "4-12":"ideal"}
	}];


	$scope.availability = [
		{name:"sam",day:"1/1/2013",time:"12-8",type:"possible"},
		{name:"sam",day:"1/1/2013",time:"4-12",type:"ideal"},
		{name:"sam",day:"1/2/2013",time:"12-8",type:"possible"},
		{name:"al",day:"1/1/2013",time:"4-12",type:"ideal"},
		{name:"al",day:"1/2/2013",time:"12-8",type:"possible"},
		{name:"dave",day:"1/1/2013",time:"4-12",type:"ideal"},
		{name:"dave",day:"1/2/2013",time:"8-4",type:"ideal"}
	]

	$scope.show = ["sam","dave"];

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

}