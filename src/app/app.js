(function() {
  'use strict';
  angular.module('app', ['app.filters', 'app.services', 'ui.router']);

  angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.tpl.html',
        controller: 'homeCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }]);
})();

