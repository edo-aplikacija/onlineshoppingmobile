'use strict';

angular.module('mainApp').controller('computersLaptopsCtrl',
['$scope', '$state', '$stateParams', '$rootScope', '$ionicScrollDelegate', 'computersLaptopsService',
	function ($scope, $state, $stateParams, $rootScope, $ionicScrollDelegate, computersLaptopsService) {

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
	    $scope.copyOfMenu = [];
	    // =============================================================================
	    // LOAD TOTAL PRODUCTS
	    var loadTotalProducts = function (searchtext, minPrice, maxPrice) {
	        var form = {
	            'searchtext': searchtext,
	            'minPrice': minPrice,
	            'maxPrice': maxPrice
	        }
	        computersLaptopsService.getTotalProducts().get(form).$promise.then(
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
	        computersLaptopsService.getProductDataBySearch().get(form).$promise.then(
                function (response) {
                    // success
                    $scope.loading = false;
                    if (response.data.length > 0) {
                        $scope.noResult = false;
                        var metaTitle = 'Online Shopping Hub | Computers Laptops ' + $stateParams.title;
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
	    $scope.copyOfMenu['eventName'] = $state.current.name;
	    $scope.copyOfMenu['searchtext'] = $stateParams.title;
	    $scope.copyOfMenu['orderby'] = 'salesrank';
	    $scope.copyOfMenu['allowedSubcategories'] = [];
	    $scope.copyOfMenu['allowedBrands'] = [];
	    $scope.copyOfMenu['minPrice'] = null;
	    $scope.copyOfMenu['maxPrice'] = null;
	    $scope.copyOfMenu['selectedSubcategory'] = [];
	    $scope.copyOfMenu['selectedBrands'] = [];
        $scope.$on('$ionicView.enter', function() {
            $scope.$emit('updateSearchMenu', $scope.copyOfMenu);
        });	    
	    // =============================================================================
	    // ADVANCED SEARCH MENU EVENT
	    $rootScope.$on($state.current.name, function (e, searchdata, minPrice, maxPrice) {
	    	loadTotalProducts(searchdata.searchtext, minPrice, maxPrice);
	    	loadProducts(searchdata.searchtext, searchdata.orderby, minPrice, maxPrice, 1);
	    	$scope.currentPage = 1;
	    	$scope.changedSearchText = searchdata.searchtext;
	    	$scope.changedOrderby = searchdata.orderby;
	    	$scope.changedMinPrice = minPrice;
	    	$scope.changedMaxPrice = maxPrice;
	    	scrollMainToTop();
	    	$scope.copyOfMenu = angular.copy(searchdata);
	    	$scope.copyOfMenu['eventName'] = $state.current.name;	 	
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