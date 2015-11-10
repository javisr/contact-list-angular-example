(function() {
  'use strict';
  angular.module('app')
    .controller('confirmFormCtrl', [
      '$scope', '$modalInstance',
      function($scope, $modalInstance) {
        $scope.cancel = function() {
          $modalInstance.dismiss('canceled');
        };
        $scope.continue = function() {
          $modalInstance.close();
        };
      }
    ]);
})();

