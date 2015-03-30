'use strict';

angular.module('mainApp').controller('electronicsCategoryCtrl',
['$scope', '$state', '$stateParams', '$rootScope', '$ionicScrollDelegate', 'electronicsCategoryService',
	function ($scope, $state, $stateParams, $rootScope, $ionicScrollDelegate, electronicsCategoryService) {

	    // CATEGORY
	    var findCategory = function () {
	        var category = '';
	        var allowedCatLength = allowedCategories.length;
	        for (var i = 0; i < allowedCatLength; i++) {
	            if (allowedCategories[i].slug === $stateParams.category) {
	                category = allowedCategories[i].name;
	                $scope.allowedSubcategories = allowedCategories[i].subcategories;
	            }
	        }
	        return category;
	    }
	    var allowedCategories = [
            {
                slug: 'cell-phones', name: 'Cell Phones', subcategories: [
                  { name: 'Unlocked Cell Phones', searchName: 'Unlocked' },
                  { name: 'No Contract Cell Phones', searchName: 'No Contract' }
                ]
            },
            {
                slug: 'cell-phones-accessories', name: 'Cell Phones Accessories', subcategories: [
                    { name: 'Accessory Kits', searchName: 'Accessory Kits' },
                    { name: 'Audio Adapters', searchName: 'Audio Adapters' },
                    { name: 'Batteries', searchName: 'Batteries' },
                    { name: 'Bluetooth Headsets', searchName: 'Bluetooth Headsets' },
                    { name: 'Car Accessories', searchName: 'Car Accessories' },
                    { name: 'Chargers', searchName: 'Chargers' },
                    { name: 'Corded Headsets', searchName: 'Corded Headsets' },
                    { name: 'MicroSD Cards', searchName: 'MicroSD Cards' },
                    { name: 'Portable Speakers', searchName: 'Portable Speakers' },
                    { name: 'Signal Boosters', searchName: 'Signal Boosters' },
                    { name: 'Smart Watches', searchName: 'Smart Watches' },
                ]
            },
            {
                slug: 'tv-video', name: 'TV Video', subcategories: [
                    { name: 'LED LCD', searchName: 'LED LCD' },
                    { name: 'Plasma', searchName: 'Plasma' },
                    { name: 'TV DVD Combos', searchName: 'TV DVD Combos' },
                    { name: 'Projectors', searchName: 'Projectors' },
                    { name: 'Video Glasses', searchName: 'Video Glasses' },
                    { name: 'HD DVD Players', searchName: 'HD DVD Players' },
                    { name: 'DVD Players Recorders', searchName: 'DVD Players Recorders' },
                    { name: 'Blu-Ray Players Recorders', searchName: 'Blu-Ray Players Recorders' },
                ]
            },
            {
                slug: 'photo-camera', name: 'Photo Camera', subcategories: [
                    { name: 'Digital Cameras', searchName: 'Digital Cameras' },
                    { name: 'Camcorders', searchName: 'Camcorders' },
                    { name: 'Camcorder Lenses', searchName: 'Camcorder Lenses' },
                    { name: 'Projectors', searchName: 'Projectors' },
                    { name: 'Surveillance Cameras', searchName: 'Surveillance Cameras' },
                    { name: 'Printers Scanners', searchName: 'Printers Scanners' },
                    { name: 'Flashes', searchName: 'Flashes' },
                ]
            },
            {
                slug: 'home-audio', name: 'Home Audio', subcategories: [
                    { name: 'Compact Radios Stereos', searchName: 'Compact Radios Stereos' },
                    { name: 'Portable MP3 Audio Docks', searchName: 'Portable MP3 Audio Docks' },
                    { name: 'Wireless Streaming Audio Systems', searchName: 'Wireless Streaming Audio Systems' },
                    { name: 'Speakers', searchName: 'Speakers' },
                ]
            },
            {
                slug: 'gps', name: 'GPS', subcategories: [
                    { name: 'Trucking', searchName: 'Trucking' },
                    { name: 'Marine', searchName: 'Marine' },
                    { name: 'Car', searchName: 'Car' },
                ]
            }
	    ];
	    var MAIN_CATEGORY = findCategory();
	    if (MAIN_CATEGORY === '') {
	        $state.go('electronics')
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
	        $scope.changedSubcategories = [];
	        $scope.changedBrands = [];
	        $scope.changedMinPrice = undefined;
	        $scope.changedMaxPrice = undefined;
	        $scope.copyOfMenu = [];
	        // =============================================================================
	        // LOAD TOTAL PRODUCTS
	        var loadTotalProducts = function (searchtext, subcategory, brands, minPrice, maxPrice) {
	            var form = {
	                'searchtext': searchtext,
	                'category': MAIN_CATEGORY,
	                'subcategory': subcategory,
	                'brands': brands,
	                'minPrice': minPrice,
	                'maxPrice': maxPrice
	            }	            
	            electronicsCategoryService.getTotalProducts().save(form).$promise.then(
                    function (response) {
                        // success
                        $scope.totalProducts = response.data;
                    }
                    );
	        }
	        // LOAD PRODUCTS
	        var loadProducts = function (searchtext, subcategory, brands, orderby, minPrice, maxPrice, page) {
	            $scope.loading = true;
	            $scope.noResult = false;
	            var form = {
	                'searchtext': searchtext,
	                'category': MAIN_CATEGORY,
	                'subcategory': subcategory,
	                'brands': brands,
	                'orderby': orderby,
	                'minPrice': minPrice,
	                'maxPrice': maxPrice,
                    'page': page
	            }
	            electronicsCategoryService.getProductDataBySearch().save(form).$promise.then(
                    function (response) {
                        // success
                        $scope.loading = false;
                        if (response.data.length > 0) {
                            $scope.noResult = false;
                            $scope.categoryTitle = MAIN_CATEGORY;
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
	            electronicsCategoryService.getBrands().get({ 'category': MAIN_CATEGORY }).$promise.then(
                    function (response) {
                        // success
                        if (response.data.length > 0) {                       	
                        	$scope.copyOfMenu['eventName'] = $state.current.name;
                        	$scope.copyOfMenu['searchtext'] = $stateParams.title;
                        	$scope.copyOfMenu['orderby'] = 'salesrank';
                        	$scope.copyOfMenu['allowedSubcategories'] = $scope.allowedSubcategories;
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
	        // =============================================================================
	        // LOAD INIT DATA
	        $scope.$on('$ionicView.enter', function() {
	        	if($scope.copyOfMenu) {
	        		 $scope.$emit('updateSearchMenu', $scope.copyOfMenu);
	        	}
	        });
	        loadTotalProducts($scope.changedSearchText, [], [], '', '');
	        loadProducts($scope.changedSearchText, [], [], $scope.changedOrderby, '', '', 1);
	        loadBrands();
	        // ADVANCED SEARCH MENU EVENT
	        $rootScope.$on($state.current.name, function (e, searchdata, minPrice, maxPrice) {
	        	loadTotalProducts(searchdata.searchtext, searchdata.selectedSubcategory, searchdata.selectedBrands, minPrice, maxPrice);
	        	loadProducts(searchdata.searchtext, searchdata.selectedSubcategory, searchdata.selectedBrands, searchdata.orderby, minPrice, maxPrice, 1);
	        	$scope.currentPage = 1;
	        	$scope.changedSearchText = searchdata.searchtext;
	        	$scope.changedOrderby = searchdata.orderby;
	        	$scope.changedSubcategories = searchdata.selectedSubcategory;
	        	$scope.changedBrands = searchdata.selectedBrands;
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