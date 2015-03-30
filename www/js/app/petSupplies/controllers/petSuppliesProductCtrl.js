'use strict';

angular.module('mainApp').controller('petSuppliesProductCtrl',
['$scope', '$state', '$stateParams', '$sce', '$window', '$ionicHistory', '$ionicModal', '$ionicSlideBoxDelegate', 'petSuppliesService',
	function ($scope, $state, $stateParams, $sce, $window, $ionicHistory, $ionicModal, $ionicSlideBoxDelegate, petSuppliesService) {

	    // LOAD PRODUCT
	    // =============================================================================
	    var loadProduct = function () {
	        petSuppliesService.getProductById().get({ 'id': $stateParams.id }).$promise.then(
                function (response) {
                    // success
                    if (response.data.length > 0) {
                        console.log(response.data[0]);
                        $scope.productData = response.data[0];
                        $scope.selectedImage = response.data[0].images[0];

                        updateMetaTitle($scope.productData.title);

                        if ($scope.productData.editorialreviews[0]) {
                            updateMetaDescription($scope.productData.editorialreviews[0]);
                        } else if ($scope.productData.features[0]) {
                            updateMetaDescription($scope.productData.features[0]);
                        }

                        updateMetaImage($scope.productData.images[0]);
                        var adsIframePartOne = '//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&MarketPlace=US&Operation=GetAdHtml&TemplateId=SrchWdgt&region=US&marketplace=amazon&tracking_id=onlshohub-20&auto_complete=true&search_type=search_widget&link_id=53OY4Z7ZRKR4TFUC&width=1186&height=390&default_search_category=PetSupplies&default_search_key=';
                        var adsIframePartTwo = '&widgetId=__mobileAssociatesSearchWidget_adunit_0&default_category_html=Pet%20Supplies&default_category_value=pets&default_category_search=PetSupplies&theme=light&bg_color=FFFFFF&isresponsive=true';
                        $scope.adsIframeSrc = $sce.trustAsResourceUrl(adsIframePartOne + $scope.productData.brand + adsIframePartTwo);

                    } else {
                        $state.go('petSupplies');
                    }
                },
                function () {
                    // error
                    $state.go('petSupplies');
                }
                );
	    }
	    loadProduct();
	    // META TAGS
	    // =============================================================================
	    var updateMetaTitle = function (data) {
	        $scope.$emit('updateMetaTitle', data);
	    }
	    var updateMetaDescription = function (data) {
	        $scope.$emit('updateMetaDescription', data);
	    }
	    var updateMetaImage = function (data) {
	        $scope.$emit('updateMetaImage', data);
	    }
	    // IMAGE SLIDER
	    // =============================================================================
	    $ionicModal.fromTemplateUrl('js/app/imageSlider/imageSlider.html', {
	    	scope: $scope,
	    	animation: 'slide-in-up'
	    }).then(function(modal) {
	    	$scope.modal = modal;
	    });
	     
	    $scope.openModal = function(index) {
	    	$scope.imageToOpen = index;
	    	$scope.modal.show();			
	    	$ionicSlideBoxDelegate.update();
	    };
	     
	    $scope.closeModal = function() {
	    	$scope.modal.remove();
	    	$ionicModal.fromTemplateUrl('js/app/imageSlider/imageSlider.html', {
	    		scope: $scope,
	    		animation: 'slide-in-up'
	    	}).then(function(modal) {
	    		$scope.modal = modal;
	    	});
	    };	     
	    $scope.next = function() {
	    	$ionicSlideBoxDelegate.next();
	    };
	    $scope.previous = function() {
	    	$ionicSlideBoxDelegate.previous();
	    };
	    $scope.slideChanged = function(index) {
	    	$scope.slideIndex = index;
	    };
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
	    $scope.editorialText = function (html) {
	        return $sce.trustAsHtml(html);
	    };
	    $scope.buyButton = function (url) {
	        $window.open(url);
	    };

	}]);