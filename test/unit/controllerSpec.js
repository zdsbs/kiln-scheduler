'use strict';



/* jasmine specs for controllers go here */
describe('Schedule controllers', function() {

  describe('FooCtlr', function(){

	var ctrl, scope;

	beforeEach(inject(function($controller, $rootScope) {
	    scope = $rootScope.$new();
	    ctrl = $controller('FooCtlr', {
	        $scope: scope
	    });
	}));


    it('should create "phones" model with 3 phones', function() {
    	expect(scope.schedule.length).toBe(2);
    });

    it('should foo',function() {
	   	console.log("pre digest");
		scope.$digest();
		// scope.schedule.push("a");
		console.log(scope.schedule);
		scope.$digest();
		scope.schedule[1].shifts[0].need = 2;
    	console.log("COUNDT: " + scope.count);
		scope.$digest();
		scope.$digest();
		scope.$digest();
    	console.log("COUNDT: " + scope.count);
    });
  });
});