'use strict';

angular.module('mainApp').controller('sportsNutritionCtrl',
['$scope', '$state', '$stateParams', '$rootScope', '$ionicScrollDelegate', 'sportsNutritionService',
	function ($scope, $state, $stateParams, $rootScope, $ionicScrollDelegate, sportsNutritionService) {

	    // INIT DATA
	    // =============================================================================
	    $scope.products = [];
	    $scope.currentPage = 1;
	    $scope.totalProducts = 0;
	    $scope.loading = false;
	    $scope.noResult = false;

	    $scope.changedSearchText = $stateParams.title;
	    $scope.changedOrderby = 'salesrank';
	    $scope.changedMinPrice = undefined;
	    $scope.changedMaxPrice = undefined;
	    // =============================================================================
	    // LOAD TOTAL PRODUCTS
	    var loadTotalProducts = function (searchtext, minPrice, maxPrice) {
	        var form = {
	            'searchtext': searchtext,
	            'minPrice': minPrice,
	            'maxPrice': maxPrice
	        }
	        sportsNutritionService.getTotalProducts().get(form).$promise.then(
                function (response) {
                    // success
                    $scope.totalProducts = response.data;
                }
                );
	    }
	    // LOAD PRODUCTS
	    var loadProducts = function (searchtext, orderby, minPrice, maxPrice, page) {
	        $scope.loading = true;
	        $scope.noResult = false;
	        var form = {
	            'searchtext': searchtext,
	            'orderby': orderby,
	            'minPrice': minPrice,
	            'maxPrice': maxPrice,
	            'page': page
	        }
	        sportsNutritionService.getProductDataBySearch().get(form).$promise.then(
                function (response) {
                    // success
                    $scope.loading = false;
                    if (response.data.length > 0) {
                        $scope.noResult = false;
                        var metaTitle = 'Online Shopping Hub | Sports Nutrition ' + $stateParams.title;
                        updateMetaTitle(metaTitle);
                        if (response.data[0].editorialreviews[0]) {
                            var metaDescription = response.data[0].editorialreviews[0];
                            updateMetaDescription(metaDescription);
                        } else if (response.data[0].features[0]) {
                            var metaDescription = response.data[0].features[0];
                            updateMetaDescription(metaDescription);
                        }
                        updateMetaImage(response.data[0].images[0])
                    } else {
                        $scope.noResult = true;
                    }
                    if ($scope.currentPage === 1) {
                        	$scope.products = response.data;
                    } else {
                        for (var i = 0; i < response.data.length; i++) {
                        	$scope.products.push(response.data[i]);
                        }
                    }
                }
                );
	    }
	    // =============================================================================
	    // LOAD INIT DATA 
	    loadTotalProducts($scope.changedSearchText, '', '');
	    loadProducts($scope.changedSearchText, $scope.changedOrderby, '', '', 1);
	    // =============================================================================
	    var searchData = [];
	    searchData['eventName'] = $state.current.name;
	    searchData['searchText'] = $stateParams.title;
	    searchData['allowedSubcategories'] = [];
	    searchData['allowedBrands'] = [];
	    $scope.$emit('updateSearchMenu', searchData);
	    // =============================================================================
	    // ADVANCED SEARCH MENU EVENT
	    $rootScope.$on($state.current.name, function (e, searchtext, orderby, subcategories, brands, minPrice, maxPrice) {
	    	loadTotalProducts(searchtext, minPrice, maxPrice);
	    	loadProducts(searchtext, orderby, minPrice, maxPrice, 1);
	    	$scope.currentPage = 1;
	    	$scope.changedSearchText = searchtext;
	    	$scope.changedOrderby = orderby;
	    	$scope.changedMinPrice = minPrice;
	    	$scope.changedMaxPrice = maxPrice;
	    	scrollMainToTop();
	    });
	    // =============================================================================
	    // PAGINATION
	    $scope.loadNewPage = function () {        	
	    	$scope.currentPage++;
	    	loadProducts($scope.changedSearchText, $scope.changedOrderby, $scope.changedMinPrice, $scope.changedMaxPrice, $scope.currentPage);
	    }
	    // =============================================================================
	    // META TAGS
	    var updateMetaTitle = function (data) {
	        $scope.$emit('updateMetaTitle', data);
	    }

	    var updateMetaDescription = function (data) {
	        $scope.$emit('updateMetaDescription', data);
	    }

	    var updateMetaImage = function (data) {
	        $scope.$emit('updateMetaImage', data);
	    }
	    // =============================================================================
	    // HELPER METHODS
	    // =============================================================================	    
	    $scope.calculateDiscount = function (price, oldPrice) {
	        if (oldPrice && oldPrice > price) {
	            return parseInt((1 - (price / oldPrice)) * 100) + '% OFF';
	        } else {
	            return undefined;
	        }
	    }
	    $scope.formatPrice = function (data) {
	        var result = (data / 100).toFixed(2);
	        return '$' + result;
	    }
	    $scope.formatOldPrice = function (price, oldprice) {
	        if (oldprice && oldprice > price) {
	            var result = (oldprice / 100).toFixed(2);
	            return '$' + result;
	        } else {
	            return undefined;
	        }
	    }
	    $scope.removeHtmlTags = function (data) {
	        if (data) {
	            return String(data).replace(/<[^>]+>/gm, '');
	        }
	    }
	    var scrollMainToTop = function() {
	        $ionicScrollDelegate.$getByHandle('search-top').scrollTop();
	    };

	}]);