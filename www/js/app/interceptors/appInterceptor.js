'use strict';

angular.module('mainApp').factory('appInterceptor',
		['$q', '$injector',
		 function ($q, $injector) {
		     return {
          		responseError: function(rejection) {
                	if(rejection.status == 0) {
                    	$injector.get('$state').transitionTo('home');
                	}
                	return $q.reject(rejection);
            	}
        	};
		 }]);