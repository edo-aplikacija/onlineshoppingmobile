'use strict';

angular.module('mainApp').factory('computersLaptopsService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + 'computers-laptops/sample-products', {}, {});
		     }
		     this.getProductById = function () {
		         return $resource(API_SERVER + 'computers-laptops-product', {}, {});
		     }
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'computers-laptops/search-total-products', {}, {});
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'computers-laptops/search-products', {}, {});
		     }
		     this.countProducts = function () {
		         return $resource(API_SERVER + 'computers-laptops-count', {}, {});
		     }
		     return this;		     
		 }]);