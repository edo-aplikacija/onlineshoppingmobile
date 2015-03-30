'use strict';

angular.module('mainApp').factory('electronicsSubcategoryService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + '/electronics-subcategory/sample-products', {}, {});
		     }
		     return this;
		 }]);