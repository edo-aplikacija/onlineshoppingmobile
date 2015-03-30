'use strict';

angular.module('mainApp').factory('electronicsCategoryService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + '/electronics-category/sample-products', {}, {});
		     }
		     this.getBrands = function () {
		         return $resource(API_SERVER + 'electronics-category/search-brands', {}, {});
		     }		     
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'electronics-category/search-total-products', {}, {});		         
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'electronics-category/search-products', {}, {});
		     }

		     return this;
		 }]);