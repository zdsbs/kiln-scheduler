'use strict';

/* App Module */

angular.module('app',[]).
    factory('dataServer', function () {

        return {
            getAllPeople: function() {
                var pete = {
                    name:"Pete",
                    availability: {
                        "1/1/2013": {
                            "8-4": {preference:"ideal", assigned:false},
                            "4-12": {preference:"possible", assigned:false}
                        },
                        "1/2/2013": {
                            "8-4": {preference:"ideal", assigned:false},
                            "4-12": {preference:"possible", assigned:false}
                        }

                    }
                }

                var lucy = {
                    name:"Lucy",
                    availability: {
                        "1/1/2013": {
                            "8-4": {preference:"ideal", assigned:false},
                            "4-12": {preference:"possible", assigned:false}
                        },
                        "1/2/2013": {
                            "8-4": {preference:"ideal", assigned:false},
                            "12-8": {preference:"possible", assigned:false}
                        }

                    }
                }

                var bob = {
                    name:"Bob",
                    availability: {
                        "1/1/2013": {
                            "12-8": {preference:"ideal", assigned:false}
                        },
                        "1/2/2013": {
                            "12-8": {preference:"ideal", assigned:false}
                        }
                    }
                }
                return [pete,lucy,bob];
            },
            shiftNeed: function() {
                return {
                    "1/1/2013": {"12-8":0,"8-4":1,"4-12":2},
                    "1/2/2013": {"12-8":2,"8-4":3,"4-12":3}};
            },
            getDays: function() {
                return  ["1/1/2013","1/2/2013"];
            },
            getTimes: function() {
                return ["12-8","8-4","4-12"];
            },
            get: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            put: function (recipes) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(recipes));
            }
        };
    }).
	filter('slot', function() {
    	return function(availability,day,time,show,onlyAssigned) {
    		var out = [];
    		for(var i = 0; i < availability.length; i++) {
    			var a = availability[i];
 				if(onlyAssigned && !a.shift.assigned) {
 					continue;
 				}
    			if(a.shift.day == day && a.shift.time == time && show.indexOf(a.name) != -1) {
    				out.push(a);
    			}
    		}
    		return out;
    	}
  });