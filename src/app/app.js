(function() {
  'use strict';
  angular.module('app', ['app.filters', 'app.services', 'ui.router', 'dialogs.main', 'ui.bootstrap.tpls', 'ngAnimate']);

  angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          nav: {
            templateUrl: 'app/components/nav/nav.tpl.html',
            controller: 'homeNavCtrl'
          },
          content: {
            templateUrl: 'app/components/home/home.tpl.html',
            controller: 'homeCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  }]);
})();

