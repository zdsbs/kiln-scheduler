'use strict';

describe('Schedule Controller', function() {
	var ctrl, scope,bob,pete;

	beforeEach(module('app'));

	beforeEach(module(function($provide) {
    	bob = {
            name:'Bob',
            availability: {
                '1/1/2013': {
                    '12-8': {preference:'ideal', assigned:false},
                    '8-4': {preference:'ideal', assigned:true},
                }
            }
        }
		pete = {
            name:'Pete',
            availability: {
                '1/1/2013': {
                    '8-4': {preference:'possible', assigned:false},
                    '4-12': {preference:'ideal', assigned:false},
                }
            }
        }
		$provide.value('dataServer', {
			shiftNeed: function() {
				return {
	                '1/1/2013': {'12-8':11,'8-4':12,'4-12':13}
	            };
			},
			getDays: function() {
				return ['1/1/2013'];
			},
			getTimes: function() {
				return ['12-8','8-4','4-12'];
			},
			getAllPeople: function() {
				return [bob,pete];
			}
		});
	}));

	beforeEach(inject(function($controller, $rootScope,dataServer) {
	    scope = $rootScope.$new();

	    ctrl = $controller('ScheduleCtlr', {
	        $scope: scope,
	        dataServer:dataServer
	    });
	}));

	describe('Model', function(){
		it('forEachDayTimeAvailable',function() {
			var spy = jasmine.createSpy('forEachDayTimeAvailable');
			ctrl.forEachDayTimeAvailable(bob,spy);
			expect(spy.calls.length).toEqual(2);
			expect(spy).toHaveBeenCalledWith(bob,'1/1/2013', '12-8');
			expect(spy).toHaveBeenCalledWith(bob,'1/1/2013', '8-4');
		});
	    it('shiftNeed initialized okay', function() {
	    	expect(scope.shiftNeed['1/1/2013']['12-8']).toBe(11);
	    	expect(scope.shiftNeed['1/1/2013']['8-4']).toBe(12);
	    });

	    it('people initialized okay',function() {
	    	expect(scope.people[0].name).toBe('Bob')
	    });

	});

	describe('View Model', function() {
		beforeEach(function() {
			scope.$digest();
		});
		it('allSelected, Bob is only person available on 1/1/2013,12-8',function() {
			
			var selectedPeople = scope.scheduleView.selectedPeople('1/1/2013','12-8');
			expect(selectedPeople[0].name).toBe('Bob');
			expect(selectedPeople[0].preference).toBe('ideal');
			expect(selectedPeople[0].assigned).toBeFalsy();

			expect(selectedPeople.length).toBe(1);
		});

		it('Bob & Pete are available for 1/1/2013, 8-4',function() {
			var selectedPeople = scope.scheduleView.selectedPeople('1/1/2013','8-4');
			expect(selectedPeople[0].name).toBe('Bob');
			expect(selectedPeople[1].name).toBe('Pete');

			expect(selectedPeople.length).toBe(2);
		});

		it('Hiding Bob on the 1/1/2013, 8-4 shift only leaves Pete',function() {
			scope.showHide(bob,false);
			scope.$digest();
			var selectedPeople = scope.scheduleView.selectedPeople('1/1/2013','8-4');
			expect(selectedPeople[0].name).toBe('Pete');
	
			expect(selectedPeople.length).toBe(1);
		})
 
		it('removing, hiding bob, removes him from the scheduleView',function() {
			scope.showHide(bob,false);
			scope.$digest();
			var selectedPeople = scope.scheduleView.selectedPeople('1/1/2013','12-8');
			expect(selectedPeople.length).toBe(0);						
		});

		it('only showing assigned people, only shows bob at 1/1/2013, 8-4',function(){ 
			scope.showOnlyAssigned = true;			
			scope.$digest();
			var selectedPeople128 = scope.scheduleView.selectedPeople('1/1/2013','12-8');
			var selectedPeople84 = scope.scheduleView.selectedPeople('1/1/2013','8-4');
			var selectedPeople412 = scope.scheduleView.selectedPeople('1/1/2013','4-12');
			expect(selectedPeople128.length).toBe(0);
			expect(selectedPeople84.length).toBe(1);
			expect(selectedPeople412.length).toBe(0);
			expect(selectedPeople84[0].name).toBe('Bob');
		});

		it('can assign a Pete to a 1/1/2013, 8-4',function() {
			scope.showOnlyAssigned = true;			
			scope.toggleAssignment('Pete','1/1/2013','8-4');
			scope.$digest();
			var selectedPeople84 = scope.scheduleView.selectedPeople('1/1/2013','8-4');
			expect(selectedPeople84.length).toBe(2);
		})

		it('assigned people count 1/1/2013,8-4',function() {
			var assignedPeopleCount = scope.assignedPeopleCount['1/1/2013']['8-4'];	
			expect(assignedPeopleCount).toBe(1);		
		});

		it('assigned people count 1/1/2013,8-4 updates after weve assigned Pete',function() {
			scope.toggleAssignment('Pete','1/1/2013','8-4');
			scope.$digest();
			var assignedPeopleCount = scope.assignedPeopleCount['1/1/2013']['8-4'];	
			expect(assignedPeopleCount).toBe(2);		
		});

	});
});