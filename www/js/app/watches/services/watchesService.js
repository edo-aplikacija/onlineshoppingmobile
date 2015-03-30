'use strict';

angular.module('mainApp').factory('watchesService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + 'watches/sample-products', {}, {});
		     }
		     this.getProductById = function () {
		         return $resource(API_SERVER + 'watches-product', {}, {});
		     }
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'watches/search-total-products', {}, {});
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'watches/search-products', {}, {});
		     }
		     this.countProducts = function () {
		         return $resource(API_SERVER + 'watches-count', {}, {});
		     }
		     return this;		     
		 }]);