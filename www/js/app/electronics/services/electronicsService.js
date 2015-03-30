'use strict';

angular.module('mainApp').factory('electronicsService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + 'electronics/sample-products', {}, {});
		     }
             this.getProductById = function () {
                 return $resource(API_SERVER + 'electronics-product', {}, {});
             }
             this.getTotalProducts = function () {
                 return $resource(API_SERVER + 'electronics/search-total-products', {}, {});
             }
             this.getProductDataBySearch = function () {
                 return $resource(API_SERVER + 'electronics/search-products', {}, {});
             }
             this.countProducts = function () {
                 return $resource(API_SERVER + 'electronics-count', {}, {});
             }

		     return this;		     
		 }]);