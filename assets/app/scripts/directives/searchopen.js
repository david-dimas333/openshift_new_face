'use strict';

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/

angular
    .module('openshiftConsole')
    .service('NavSearch', function() {
   
    var navbarFormSelector = 'form.navbar-form';

    function toggle() {
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
    }

    function dismiss() {
      $(navbarFormSelector)
        .removeClass('open') // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('') // Empty input
        ;
    }

    ////////////////
    this.toggle = toggle;
    this.dismiss = dismiss;
});

    
//
// Controller definition
// 

// angular
//     .module('openshiftConsole')
//     .controller('searchOpenController',['$scope', '$element', 'NavSearch', function ($scope, $element, NavSearch){
//         $element
//         .on('click', function (e) { e.stopPropagation(); })
//         .on('click', NavSearch.toggle);
//     }])
//     .controller('searchDismissController',['$scope', '$element', 'NavSearch', function ($scope, $element, NavSearch){
//         var inputSelector = '.navbar-form input[type="text"]';

//         $(inputSelector)
//           .on('click', function (e) { e.stopPropagation(); })
//           .on('keyup', function(e) {
//             if (e.keyCode === 27){ // ESC
//               NavSearch.dismiss();
//             }
//           });
          
//         // click anywhere closes the search
//         $(document).on('click', NavSearch.dismiss);
//         // dismissable options
//         $element
//           .on('click', function (e) { e.stopPropagation(); })
//           .on('click', NavSearch.dismiss);
//     }]);
//
// Controller definition
// 


var searchOpenController = function ($scope, $element, NavSearch) {
  $element
    .on('click', function (e) { e.stopPropagation(); })
    .on('click', NavSearch.toggle);
};
searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];

var searchDismissController = function($scope, $element, NavSearch) {
  
  var inputSelector = '.navbar-form input[type="text"]';

  $(inputSelector)
    .on('click', function (e) { e.stopPropagation(); })
    .on('keyup', function(e) {
        if (e.keyCode === 27){ // ESC
            NavSearch.dismiss();
        }
    });
    
  // click anywhere closes the search
  $(document).on('click', NavSearch.dismiss);
  // dismissable options
  $element
    .on('click', function (e) { e.stopPropagation(); })
    .on('click', NavSearch.dismiss);
};
searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];


//
// directives definition
// 

angular
    .module('openshiftConsole')
    .directive('searchOpen', function () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    })
    .directive('searchDismiss', function () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    });