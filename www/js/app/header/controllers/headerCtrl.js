'use strict';

angular.module('mainApp').controller('headerCtrl',
['$scope', '$state', '$filter', '$rootScope', '$ionicHistory', '$ionicSideMenuDelegate',
	function ($scope, $state, $filter, $rootScope, $ionicHistory, $ionicSideMenuDelegate) {

    // INIT DATA
    // =============================================================================
    $scope.showBackButton = false;
    $scope.showSearchMenu = false;
    $scope.mainTitle = 'Online Shopping Hub';
    $scope.searchData = {
        searchText: '', 
        orderby: 'salesrank',
        allowedSubcategories: [],
        allowedBrands: [],
        minPrice: null,
        maxPrice: null,
        selectedSubcategory: [],
        selectedBrands: []
    };   	  	   
    // EVENTS
    // =============================================================================
    $rootScope.$on('updateSearchMenu', function (e, data) {
        updateSearchMenu(data);
    });
    $scope.$watch(function () { return $ionicHistory.backView() }, function (obj) {
        if (obj !== null) {
            var state = $state.current.name;
            if (state === 'electronicsProduct' || state === 'petSuppliesProduct' || state === 'computersLaptopsProduct' || state === 'watchesProduct' || state === 'sportsNutritionProduct') {
                $scope.showBackButton = true;
            } else {
                $scope.showBackButton = false;
            }
        } else {
            $scope.showBackButton = false;
        }
    });
    $scope.$watch(function () { return $state.current.name }, function (state) {
        if (state === 'home' || state === 'electronicsProduct' || state === 'petSuppliesProduct' || state === 'computersLaptopsProduct' || state === 'watchesProduct' || state === 'sportsNutritionProduct') {
            $scope.showSearchMenu = false;
        } else {
            $scope.showSearchMenu = true;
        }
    
    });
    // NAV BACK BUTTON
    // =============================================================================
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
    // LEFT MENU
    // =============================================================================
    $scope.showHeaderMenuLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
    // SEARCH MENU
    // =============================================================================
    var updateSearchMenu = function (data) {
      $scope.eventName = data.eventName;
      $scope.searchData.searchText = data.searchtext;
      $scope.searchData.orderby = data.orderby;
      $scope.searchData.allowedSubcategories = data.allowedSubcategories;
      $scope.searchData.allowedBrands = data.allowedBrands;
      $scope.searchData.minPrice = data.minPrice;
      $scope.searchData.maxPrice = data.maxPrice;
      $scope.searchData.selectedSubcategory = data.selectedSubcategory;
      $scope.searchData.selectedBrands = data.selectedBrands;
    }
    // SUBCATEGORY 
    $scope.checkedSubcategory = function (subcategory) {
        if ($scope.searchData.selectedSubcategory.indexOf(subcategory) < 0) {
            $scope.searchData.selectedSubcategory.push(subcategory);
        } else {
            var lenOfSelSubcategories = $scope.selectedSubcategory.length;
            for (var i = 0; i < lenOfSelSubcategories; i++) {
                if ($scope.searchData.selectedSubcategory[i] === subcategory)
                    $scope.searchData.selectedSubcategory.splice(i, 1);
            }
        }
    }
    // BRAND
    $scope.checkedBrand = function (brand) {
        if ($scope.searchData.selectedBrands.indexOf(brand) < 0) {
            $scope.searchData.selectedBrands.push(brand);
        } else {
            var lenOfSelBrands = $scope.searchData.selectedBrands.length;
            for (var i = 0; i < lenOfSelBrands; i++) {
                if ($scope.searchData.selectedBrands[i] === brand)
                    $scope.searchData.selectedBrands.splice(i, 1);
            }
        }
    }
    // GO SEARCH PRODUCTS
    $scope.searchProducts = function (minPrice, maxPrice) {
        if (minPrice === null && maxPrice === null) {
            $scope.searchError = undefined;
            minPrice = '';
            maxPrice = '';
            $scope.$emit($scope.eventName, $scope.searchData, minPrice, maxPrice);
        } else if (minPrice === undefined || maxPrice === undefined) {
            $scope.searchError = "Oops! Enter valid numbers.";
        } else if (minPrice === null || maxPrice === null) {
            if (minPrice !== null) {
                 minPrice = parseInt((minPrice) * 100);
            } else {
                minPrice = '';
            }
            if (maxPrice !== null) {
                maxPrice = parseInt((maxPrice) * 100);
            } else {
                maxPrice = '';
            }
            $scope.searchError = undefined;
            $scope.$emit($scope.eventName, $scope.searchData, minPrice, maxPrice);
        }
        else if (minPrice >= maxPrice) {
            $scope.searchError = "Oops! Min price shouldn't be greater or equal to max price.";
        } else {
            $scope.searchError = undefined;
            minPrice = parseInt((minPrice) * 100);
            maxPrice = parseInt((maxPrice) * 100);
            $scope.$emit($scope.eventName, $scope.searchData, minPrice, maxPrice);
        }        
    }
    // RESET SEARCH 
    $scope.resetProducts = function () {
        angular.forEach($scope.searchData.allowedSubcategories, function (subcategory) {
            subcategory.selected = false;
        });
        angular.forEach($scope.searchData.allowedBrands, function (brand) {
            brand.selected = false;
        });
        $scope.searchData.searchText = '';
        $scope.searchData.orderby = 'salesrank';
        $scope.searchData.minPrice = null;
        $scope.searchData.maxPrice = null;
        $scope.$emit($scope.eventName, $scope.searchData, $scope.searchData.minPrice, $scope.searchData.maxPrice);
    }
    // TOGGLE 
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
    }
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    }  


	}]);