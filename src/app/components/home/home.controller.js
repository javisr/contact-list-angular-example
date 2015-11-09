(function() {
  'use strict';
  angular.module('app')
    .controller('homeCtrl', ['$scope', 'dialogs', '$log', '$rootScope', 'localStorageService', 'lodash',

      function($scope, dialogs, $log, $rootScope, localStorageService, lodash) {
        $rootScope.$on('addNewContact', function() {
          $scope.showForm();
        });

        var storedContact = localStorageService.get('contacts');

        $scope.visibleCards = storedContact || [];

        $scope.$watch('visibleCards', function() {
          localStorageService.set('contacts', $scope.visibleCards);
        }, true);

        $scope.showForm = function(contact, index) {
          contact = contact ? contact : {};
          var dlg = dialogs.create('app/components/form/form.tpl.html', 'formCtrl', contact);
          dlg.result.then(function(newInfo) {
            if (newInfo.id && lodash.isNumber(index)) {
              $scope.visibleCards.splice(index, 1, newInfo);
            } else {
              newInfo.id = new Date().getTime();
              $scope.visibleCards.push(newInfo);
            }
          }, function(message) {
            $log.info(message);
          });
        };

        $scope.editContact = function(contact, index) {
          $scope.showForm(contact, index);
        };
        $scope.deleteContact = function(index) {
          var dlg = dialogs.create('app/components/confirmationForm/confirmationForm.tpl.html', 'confirmFormCtrl',
            'xs');
          dlg.result.then(function() {
            $scope.visibleCards.splice(index, 1);
          }, function() {
            $log.info('Delete canceled');
          });
        };
      }
    ]);
})();

