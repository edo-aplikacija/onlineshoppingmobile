'use strict';

angular.module('mainApp').factory('petSuppliesSubcategoryService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + '/pet-supplies-subcategory/sample-products', {}, {});
		     }
		     return this;
		 }]);