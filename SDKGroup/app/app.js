let app = angular.module('meanApp', ['angularModalService','ui.router','shopList','shopItem','ngCookies','cp.ngConfirm','ngRoute', 'ngFileUpload','datatables','ngResource','ngJsonExportExcel']);
app.run(run);

run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$state','$stateParams','DialogService','AuthService'];
function run($rootScope, $location, $cookies, $http, $state,$stateParams,DialogService,AuthService,$cookies) {
   
    // $rootScope.globals = $cookies.get('currentUser') || {};
  
    $rootScope.$on('$locationChangeStart', function (event, next, current,toState) {

        if ($state.current.access == false && AuthService.isLoggedIn() == false) {
            $state.go('home');
            $location.path('/');
            DialogService.login();
        }
        // $('div').remove('.modal-backdrop');
        var loggedIn = $rootScope.globals;
    });
}

// app.config(['$provide', '$httpProvider', function($provide, $httpProvider) {

//                 $provide.factory('unauthorisedInterceptor', ['$q', '$cookies',
//                     function($q, $cookies) {
//                         return {
//                             'responseError': function(rejection) {
//                                 if (rejection.status === 401) {
//                                     $cookies.remove('globals');
//                                     window.location.href = '/login';
//                                 }

//                                 return $q.reject(rejection);
//                             }
//                         };
//                     }
//                 ]);
//     $httpProvider.interceptors.push('unauthorisedInterceptor');
// }])
