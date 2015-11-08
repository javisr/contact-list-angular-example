(function() {
  'use strict';
  angular.module('app')
    .controller('formCtrl', [
      '$scope', '$modalInstance', 'data',
      function($scope, $modalInstance, data) {
        $scope.info = {
          name: '', //reqired
          lastName: '', //required
          email: '', //required + valid
          address: '',
          city: '',
          zipCode: '', // /^\d{5}$/
          country: ''
        };
        if (data) {
          angular.extend($scope.info, data);
        }

        $scope.cancel = function() {
          $modalInstance.dismiss('Form canceled');
        };

        $scope.save = function() {
          $modalInstance.close($scope.info);
        };
      }
    ]);
})();

