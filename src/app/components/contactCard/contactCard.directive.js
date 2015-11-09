(function() {
  'use strict';
  var ddo = function() {
    return {
      scope: {
        'info': '=',
        'edit': '&',
        'delete': '&',
        'index': '='
      },
      templateUrl: '/app/components/contactCard/contactCard.tpl.html',
      replace: true
    };
  };

  angular.module('app')
    .directive('contactCard', ddo);
})();

