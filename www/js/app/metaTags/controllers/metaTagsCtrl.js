'use strict';

angular.module('mainApp').controller('metaTagsCtrl',
['$scope', '$state', '$filter', '$rootScope', 
	function ($scope, $state, $filter, $rootScope) {	    
	    // max 55 char
	    var defaultTitle = 'Online Shopping Hub | Right place for online shopping';
	    $scope.title = defaultTitle;
	    // max 115 char
	    var defaultDescription = 'Right place for online shopping. We have products from electronics, computers, laptops, watches, sports nutrition.';
	    var descriptionAddOnText = 'Right place for online shopping.';
	    $scope.description = defaultDescription;;
	    // image
	    var defaultImage = 'http://www.online-shopping-hub.com/content/images/electronics/tv-video.jpg';
	    $scope.image = defaultImage;
	    
	    var defaultUrl = 'http://www.online-shopping-hub.com';
	    $scope.metaUrl = defaultUrl;

	    var updateDescription = function (data) {
	        if (data.length > 115) {
	            var cutData = $filter('limitTo')(data, 115);
	            $scope.description = removeHtmlTags(cutData);
	        } else if (data.length < 50) {
	            $scope.description = removeHtmlTags(data) + descriptionAddOnText;
	        } else if (data !== '') {
	            $scope.description = removeHtmlTags(data);
	        }
	    }

	    var updateTitle = function (data) {
	        if (data.length > 55) {
	            $scope.title = $filter('limitTo')(data, 55);
	        } else if (data !== '') {
	            $scope.title = data;
	        }
	    }

	    var updateImage = function (data) {
	        if (data) {
	            $scope.image = data;
	        }
	    }
	    
	    var updateUrl = function (data) {
	        if (data) {
	            $scope.metaUrl = data;
	        }
	    }

	    var removeHtmlTags = function (data) {
	        return String(data).replace(/<[^>]+>/gm, '');
	    }

	    $rootScope.$on('updateMetaTitle', function (e, data) {
	        updateTitle(data);
	    });

	    $rootScope.$on('updateMetaDescription', function (e, data) {
	        updateDescription(data);
	    });

	    $rootScope.$on('updateMetaImage', function (e, data) {
	        updateImage(data);
	    });
	    
	    $rootScope.$on('updateMetaUrl', function (e, data) {
	        updateUrl(data);
	    });

	}]);