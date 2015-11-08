(function() {
  'use strict';
  angular.module('app')
    .controller('homeNavCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
      $scope.newContact = function() {
        $rootScope.$emit('addNewContact');
      };
    }]);
})();

