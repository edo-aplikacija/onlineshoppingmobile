'use strict';

angular.module('mainApp').factory('watchesCategoryService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + '/watches-category/sample-products', {}, {});
		     }
		     this.getBrands = function () {
		         return $resource(API_SERVER + 'watches-category/search-brands', {}, {});
		     }
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'watches-category/search-total-products', {}, {});
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'watches-category/search-products', {}, {});
		     }

		     return this;
		 }]);