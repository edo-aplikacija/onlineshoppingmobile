'use strict';

angular.module('mainApp').controller('homeCtrl',
['$scope', '$state', '$timeout', 'electronicsService', 'computersLaptopsService', 'watchesService', 'sportsNutritionService', 'petSuppliesService',
	function ($scope, $state, $timeout, electronicsService, computersLaptopsService, watchesService, sportsNutritionService, petSuppliesService) {
	   	
	    // INIT DATA
	    $scope.homeSearchText = '';
	    $scope.newHomeSeachText = '';

	    $scope.electronicsSearchResult = undefined;
	    $scope.computersLaptopsSearchResult = undefined;
	    $scope.watchesSearchResult = undefined;
	    $scope.sportsNutritionSearchResult = undefined;
	    $scope.petSuppliesSearchResult = undefined;
	    
	    $scope.updateHomeSeachText = function (data) {
	        $scope.newHomeSeachText = data;       
	    }

	    var timeoutPromise;
	    var delayInMs = 1000;
	    $scope.$watch('newHomeSeachText', function (newHomeSeachText) {
	        $scope.electronicsSearchResult = undefined;
	        $scope.computersLaptopsSearchResult = undefined;
	        $scope.watchesSearchResult = undefined;
	        $scope.sportsNutritionSearchResult = undefined;
	        $scope.petSuppliesSearchResult = undefined;
	        $timeout.cancel(timeoutPromise);
	        if (newHomeSeachText.length > 2) {
	            timeoutPromise = $timeout(function () {
	                loadElectronicsData(newHomeSeachText);
	                loadComputersLaptopsData(newHomeSeachText);
	                loadWatchesData(newHomeSeachText);
	                loadSportsNutritionData(newHomeSeachText);
	                loadPetSuppliesData(newHomeSeachText);
	            }, delayInMs);
	        }
	    }, true);

	    var loadElectronicsData = function (searchtext) {
	        electronicsService.countProducts().get({ searchtext: searchtext }).$promise.then(
                function (response) {
                    // success
                    if (response.data > 1) {
                        $scope.electronicsSearchResult = response.data;
                    }
                }
            );
	    }
	    var loadComputersLaptopsData = function (searchtext) {
	        computersLaptopsService.countProducts().get({ searchtext: searchtext }).$promise.then(
                function (response) {
                    // success
                    if (response.data > 1) {
                        $scope.computersLaptopsSearchResult = response.data;
                    }
                }
            );
	    }
	    var loadWatchesData = function (searchtext) {
	        watchesService.countProducts().get({ searchtext: searchtext }).$promise.then(
                function (response) {
                    // success
                    if (response.data > 1) {
                        $scope.watchesSearchResult = response.data;
                    }
                }
            );
	    }
	    var loadSportsNutritionData = function (searchtext) {
	        sportsNutritionService.countProducts().get({ searchtext: searchtext }).$promise.then(
                function (response) {
                    // success
                    if (response.data > 1) {
                        $scope.sportsNutritionSearchResult = response.data;
                    }
                }
            );
	    }
	    var loadPetSuppliesData = function (searchtext) {
	        petSuppliesService.countProducts().get({ searchtext: searchtext }).$promise.then(
                function (response) {
                    // success
                    if (response.data > 1) {
                        $scope.petSuppliesSearchResult = response.data;
                    }
                }
            );
	    }
		 		 
	}]);