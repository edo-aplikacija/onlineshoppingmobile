'use strict';

angular.module('mainApp').controller('computersLaptopsCategoryCtrl',
['$scope', '$state', '$stateParams', '$rootScope', '$ionicScrollDelegate', 'computersLaptopsCategoryService',
	function ($scope, $state, $stateParams, $rootScope, $ionicScrollDelegate, computersLaptopsCategoryService) {

	    // CATEGORY
	    var findCategory = function () {
	        var category = '';
	        var allowedCatLength = allowedCategories.length;
	        for (var i = 0; i < allowedCatLength; i++) {
	            if (allowedCategories[i].slug === $stateParams.category) {
	                category = allowedCategories[i].name;
	            }
	        }
	        return category;
	    }
	    var allowedCategories = [
            { slug: 'laptops', name: 'Laptops' },
            { slug: 'deskops', name: 'Deskops' },
            { slug: 'monitors', name: 'Monitors' },
            { slug: 'printers', name: 'Printers' },
            { slug: 'external-hard-drives', name: 'External Hard Drives' },
            { slug: 'usb-flash-drives', name: 'USB Flash Drives' },
            { slug: 'routers', name: 'Routers' },
            { slug: 'scanners', name: 'Scanners' },
            { slug: 'tablets', name: 'Tablets' },
            { slug: 'webcams', name: 'Webcams' }
	    ];
	    var MAIN_CATEGORY = findCategory();
	    if (MAIN_CATEGORY === '') {
	        $state.go('computersLaptops')
	    } else {
	        // INIT DATA
	        // =============================================================================
	        $scope.products = [];
	        $scope.currentPage = 1;
	        $scope.totalProducts = 0;
	        $scope.loading = false;
	        $scope.noResult = false;

	        $scope.changedSearchText = $stateParams.title;
	        $scope.changedOrderby = 'salesrank';
	        $scope.changedBrands = [];
	        $scope.changedMinPrice = undefined;
	        $scope.changedMaxPrice = undefined;
	        $scope.copyOfMenu = [];
	        // =============================================================================
	        // LOAD TOTAL PRODUCTS
	        var loadTotalProducts = function (searchtext, brands, minPrice, maxPrice) {
	            var form = {
	                'searchtext': searchtext,
	                'category': MAIN_CATEGORY,
	                'brands': brands,
	                'minPrice': minPrice,
	                'maxPrice': maxPrice
	            }
	            computersLaptopsCategoryService.getTotalProducts().save(form).$promise.then(
                    function (response) {
                        // success
                        $scope.totalProducts = response.data;
                    }
                    );
	        }
	        // LOAD PRODUCTS
	        var loadProducts = function (searchtext, brands, orderby, minPrice, maxPrice, page) {
	            $scope.loading = true;
	            $scope.noResult = false;
	            var form = {
	                'searchtext': searchtext,
	                'category': MAIN_CATEGORY,
	                'brands': brands,
	                'orderby': orderby,
	                'minPrice': minPrice,
	                'maxPrice': maxPrice,
	                'page': page
	            }
	            computersLaptopsCategoryService.getProductDataBySearch().save(form).$promise.then(
                    function (response) {
                        // success
                        $scope.loading = false;
                        if (response.data.length > 0) {
                            $scope.noResult = false;
                            var metaTitle = 'Online Shopping Hub | ' + MAIN_CATEGORY + ' ' + $stateParams.title;
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
	        // LOAD BRANDS
	        var loadBrands = function () {
	            computersLaptopsCategoryService.getBrands().get({ 'category': MAIN_CATEGORY }).$promise.then(
                    function (response) {
                        // success
                        if (response.data.length > 0) {
                            var searchData = [];
                            $scope.copyOfMenu['eventName'] = $state.current.name;
                        	$scope.copyOfMenu['searchtext'] = $stateParams.title;
                        	$scope.copyOfMenu['orderby'] = 'salesrank';
                        	$scope.copyOfMenu['allowedSubcategories'] = [];
                        	$scope.copyOfMenu['allowedBrands'] = response.data;
                        	$scope.copyOfMenu['minPrice'] = null;
                        	$scope.copyOfMenu['maxPrice'] = null;
                        	$scope.copyOfMenu['selectedSubcategory'] = [];
                        	$scope.copyOfMenu['selectedBrands'] = [];
                            $scope.$emit('updateSearchMenu', $scope.copyOfMenu);
                        }
                    }
                    );
	        }
	        // ADVANCED SEARCH MENU EVENT
	        $rootScope.$on($state.current.name, function (e, searchdata, minPrice, maxPrice) {
	        	loadTotalProducts(searchdata.searchtext, searchdata.selectedBrands, minPrice, maxPrice);
	        	loadProducts(searchdata.searchtext, searchdata.selectedBrands, searchdata.orderby, minPrice, maxPrice, 1);
	        	$scope.currentPage = 1;
	        	$scope.changedSearchText = searchdata.searchtext;
	        	$scope.changedOrderby = searchdata.orderby;
	        	$scope.changedBrands = searchdata.selectedBrands;
	        	$scope.changedMinPrice = minPrice;
	        	$scope.changedMaxPrice = maxPrice;
	        	scrollMainToTop();
	        	$scope.copyOfMenu = angular.copy(searchdata);
	    		$scope.copyOfMenu['eventName'] = $state.current.name;	
	        });
	        // =============================================================================
	        // LOAD INIT DATA
	        $scope.$on('$ionicView.enter', function() {
	        	if($scope.copyOfMenu) {
	        		 $scope.$emit('updateSearchMenu', $scope.copyOfMenu);
	        	}
	        });
	        loadTotalProducts($scope.changedSearchText, [], '', '');
	        loadProducts($scope.changedSearchText, [], $scope.changedOrderby, '', '', 1);
	        loadBrands();       
	        // =============================================================================
	        // PAGINATION
	        $scope.loadNewPage = function () {        	
	        	$scope.currentPage++;
	        	loadProducts($scope.changedSearchText, $scope.changedSubcategories, $scope.changedBrands, $scope.changedOrderby, $scope.changedMinPrice, $scope.changedMaxPrice, $scope.currentPage);
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
	    }
	}]);