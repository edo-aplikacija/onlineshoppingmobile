'use strict';

angular.module('mainApp').factory('petSuppliesService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + 'pet-supplies/sample-products', {}, {});
		     }
		     this.getProductById = function () {
		         return $resource(API_SERVER + 'pet-supplies-product', {}, {});
		     }
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'pet-supplies/search-total-products', {}, {});
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'pet-supplies/search-products', {}, {});
		     }
		     this.countProducts = function () {
		         return $resource(API_SERVER + 'pet-supplies-count', {}, {});
		     }
		     return this;		     
		 }]);