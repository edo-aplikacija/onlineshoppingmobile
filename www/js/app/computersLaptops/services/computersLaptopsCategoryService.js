'use strict';

angular.module('mainApp').factory('computersLaptopsCategoryService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + '/computers-laptops-category/sample-products', {}, {});
		     }
		     this.getBrands = function () {
		         return $resource(API_SERVER + 'computers-laptops-category/search-brands', {}, {});
		     }
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'computers-laptops-category/search-total-products', {}, {});
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'computers-laptops-category/search-products', {}, {});
		     }

		     return this;
		 }]);