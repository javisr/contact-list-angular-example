(function() {
  'use strict';
  angular.module('app')
    .controller('homeCtrl', ['$scope', 'dialogs', '$log', '$rootScope', 'localStorageService', 'lodash',

      function($scope, dialogs, $log, $rootScope, localStorageService, lodash) {
        var transformingFn;
        $rootScope.$on('addNewContact', function() {
          $scope.showForm();
        });

        $scope.storedContact = localStorageService.get('contacts') || [];

        transformingFn = function(contact) {
          var formatted, addressComponents = [];

          if (contact.address !== '') {
            addressComponents.push(contact.address);
          }
          if (contact.city !== '') {
            addressComponents.push(contact.city);
          }
          if (contact.zipCode !== '') {
            addressComponents.push(contact.zipCode);
          }
          if (contact.country !== '') {
            addressComponents.push(contact.country);
          }

          formatted = {
            name: contact.name + ' ' + contact.lastName,
            email: contact.email,
            address: addressComponents.length ? addressComponents.join(', ') + '.' : ''
          };

          return formatted;
        };

        $scope.$watch('storedContact', function() {
          localStorageService.set('contacts', $scope.storedContact);
          $scope.visibleCards = lodash.map($scope.storedContact, transformingFn);
        }, true);

        $scope.showForm = function(contact, index) {
          contact = contact ? contact : {};
          var dlg = dialogs.create('app/components/form/form.tpl.html', 'formCtrl', contact);
          dlg.result.then(function(newInfo) {
            if (newInfo.id && lodash.isNumber(index)) {
              $scope.storedContact.splice(index, 1, newInfo);
            } else {
              newInfo.id = new Date().getTime();
              $scope.storedContact.push(newInfo);
            }
          }, function(message) {
            $log.info(message);
          });
        };

        $scope.editContact = function(index) {
          var contact = $scope.storedContact[index];
          $scope.showForm(contact, index);
        };
        $scope.deleteContact = function(index) {
          var dlg = dialogs.create('app/components/confirmationForm/confirmationForm.tpl.html', 'confirmFormCtrl', {}, {
            'size': 'md'
          });

          dlg.result.then(function() {
            $scope.storedContact.splice(index, 1);
          }, function() {
            $log.info('Delete canceled');
          });
        };
      }
    ]);
})();

