(function() {
  'use strict';
  angular.module('app')
    .controller('homeCtrl', ['$scope', 'dialogs', '$log', '$rootScope', function($scope, dialogs, $log, $rootScope) {
      $rootScope.$on('addNewContact', function() {
        $scope.showForm();
      });

      $scope.showForm = function() {
        var dlg = dialogs.create('app/components/form/form.tpl.html', 'formCtrl', {});
        dlg.result.then(function(info) {
          $scope.info = info;
        }, function(message) {
          $log.info(message);
        });
      };
    }]);
})();

