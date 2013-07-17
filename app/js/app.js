'use strict';

/* App Module */

angular.module('app',[]).
	filter('slot', function() {
    	return function(availability,day,time,show,onlyAssigned) {
    		var out = [];
    		for(var i = 0; i < availability.length; i++) {
    			var a = availability[i];
 				if(onlyAssigned && !a.assigned) {
 					continue;
 				}
    			if(a.day == day && a.time == time && show.indexOf(a.name) != -1) {
    				out.push(a);
    			}
    		}
    		return out;
    	}
  });