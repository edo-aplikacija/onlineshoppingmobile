'use strict';
/* global app: true */

var mainApp = angular.module('mainApp', [
    'ngResource',
    'ionic',
    'ui.router',
    '720kb.socialshare'

]);

// CONSTANTS
mainApp.constant('API_SERVER', 'http://localhost:8080/api/');
// HOME
mainApp.constant('HOME_TEMPLATES', 'js/app/home/views/');
mainApp.constant('ELECTRONIC_TEMPLATES', 'js/app/electronics/views/');
mainApp.constant('PET_SUPPLIES_TEMPLATES', 'js/app/petSupplies/views/');
mainApp.constant('COMPUTERS_LAPTOPS_TEMPLATES', 'js/app/computersLaptops/views/');
mainApp.constant('WATCHES_TEMPLATES', 'js/app/watches/views/');
mainApp.constant('SPORTS_NUTRITION_TEMPLATES', 'js/app/sportsNutrition/views/');
mainApp.constant('SEARCH_MENU_TEMPLATES', 'js/app/headerSearchMenu/views/');



mainApp.config(['$httpProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', 'HOME_TEMPLATES', 'ELECTRONIC_TEMPLATES', 'PET_SUPPLIES_TEMPLATES', 'COMPUTERS_LAPTOPS_TEMPLATES', 'WATCHES_TEMPLATES', 'SPORTS_NUTRITION_TEMPLATES',
                function ($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider, HOME_TEMPLATES, ELECTRONIC_TEMPLATES, PET_SUPPLIES_TEMPLATES, COMPUTERS_LAPTOPS_TEMPLATES, WATCHES_TEMPLATES, SPORTS_NUTRITION_TEMPLATES) {
              
              //$httpProvider.defaults.useXDomain = true;
                //delete $httpProvider.defaults.headers.common['X-Requested-With'];
                    
                    $httpProvider.interceptors.push('appInterceptor');

                    $urlRouterProvider.otherwise('/');

                    $stateProvider
                         // home
                         .state('home', {
                             controller: 'homeCtrl',
                             url: '/',
                             templateUrl: HOME_TEMPLATES + 'home.html',
                         })
                        // electronics
                        .state('electronics', {
                            controller: 'electronicsCtrl',
                            url: '/electronics/:title',
                            templateUrl: ELECTRONIC_TEMPLATES + 'electronics.html',
                        })
                        .state('electronicsCategory', {
                            controller: 'electronicsCategoryCtrl',
                            url: '/electronic/:category/:title',
                            templateUrl: ELECTRONIC_TEMPLATES + 'electronicsCategory.html',
                        })
                        .state('electronicsProduct', {
                            controller: 'electronicsProductCtrl',
                            url: '/electronics-product/:slug/:id',
                            templateUrl: ELECTRONIC_TEMPLATES + 'electronicsProduct.html',
                        })
                        // pet supplies
                        .state('petSupplies', {
                            controller: 'petSuppliesCtrl',
                            url: '/pet-supplies/:title',
                            templateUrl: PET_SUPPLIES_TEMPLATES + 'petSupplies.html',
                        })
                        .state('petSuppliesCategory', {
                            controller: 'petSuppliesCategoryCtrl',
                            url: '/pet-supply/:category/:title',
                            templateUrl: PET_SUPPLIES_TEMPLATES + 'petSuppliesCategory.html',
                        })
                        .state('petSuppliesProduct', {
                            controller: 'petSuppliesProductCtrl',
                            url: '/pet-supplies-product/:slug/:id',
                            templateUrl: PET_SUPPLIES_TEMPLATES + 'petSuppliesProduct.html',
                        })
                        // computers laptops
                        .state('computersLaptops', {
                            controller: 'computersLaptopsCtrl',
                            url: '/computers-laptops/:title',
                            templateUrl: COMPUTERS_LAPTOPS_TEMPLATES + 'computersLaptops.html',
                        })
                        .state('computersLaptopsCategory', {
                            controller: 'computersLaptopsCategoryCtrl',
                            url: '/computer-laptop/:category/:title',
                            templateUrl: COMPUTERS_LAPTOPS_TEMPLATES + 'computersLaptopsCategory.html',
                        })
                        .state('computersLaptopsProduct', {
                            controller: 'computersLaptopsProductCtrl',
                            url: '/computers-laptops-product/:slug/:id',
                            templateUrl: COMPUTERS_LAPTOPS_TEMPLATES + 'computersLaptopsProduct.html',
                        })
                        // watches
                        .state('watches', {
                            controller: 'watchesCtrl',
                            url: '/watches/:title',
                            templateUrl: WATCHES_TEMPLATES + 'watches.html',
                        })
                        .state('watchesCategory', {
                            controller: 'watchesCategoryCtrl',
                            url: '/watch/:category/:title',
                            templateUrl: WATCHES_TEMPLATES + 'watchesCategory.html',
                        })
                        .state('watchesProduct', {
                            controller: 'watchesProductCtrl',
                            url: '/watches-product/:slug/:id',
                            templateUrl: WATCHES_TEMPLATES + 'watchesProduct.html',
                        })
                        // sports nutrition
                        .state('sportsNutrition', {
                            controller: 'sportsNutritionCtrl',
                            url: '/sports-nutrition/:title',
                            templateUrl: SPORTS_NUTRITION_TEMPLATES + 'sportsNutrition.html',
                        })
                        .state('sportsNutritionCategory', {
                            controller: 'sportsNutritionCategoryCtrl',
                            url: '/sport-nutrition/:category/:title',
                            templateUrl: SPORTS_NUTRITION_TEMPLATES + 'sportsNutritionCategory.html',
                        })
                        .state('sportsNutritionProduct', {
                            controller: 'sportsNutritionProductCtrl',
                            url: '/sports-nutrition-product/:slug/:id',
                            templateUrl: SPORTS_NUTRITION_TEMPLATES + 'sportsNutritionProduct.html',
                        });
                        

                }]);

mainApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
