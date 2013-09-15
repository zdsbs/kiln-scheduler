'use strict';

/* App Module */

angular.module('app',[]).
    factory('dataServer', function () {
        var PEOPLE_ID = 'kiln-scheduler-people';
        var initialPeople = [
                {
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
                },
                {
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
                },
                {
                    name:"Bob",
                    availability: {
                        "1/1/2013": {
                            "12-8": {preference:"ideal", assigned:false}
                        },
                        "1/2/2013": {
                            "12-8": {preference:"ideal", assigned:false}
                        }
                    }
                }];
        return {
            getAllPeople: function() {
                var people = JSON.parse(localStorage.getItem(PEOPLE_ID) || '[]');
                if (people.length == 0) {
                    this.setPeople(initialPeople);
                    people = initialPeople;
                }
                return people;
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
            setPeople:function(people) {
                console.log("setPeople");
                localStorage.setItem(PEOPLE_ID, JSON.stringify(people));
            },
            addPerson:function(person) {
                this.setPeople(this.getAllPeople().push(person));
            }
        };
    }).
    config(['$routeProvider',function($routeProvider){
        $routeProvider.
            when('/schedule/:kilnId',{controller:ScheduleCtlr, templateUrl:'schedule.html'});
    }]);