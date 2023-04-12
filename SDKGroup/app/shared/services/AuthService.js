app.service('AuthService', ['$q', '$timeout', '$http','$rootScope','$cookies',
  function($q, $timeout, $http,$rootScope,$cookies) {
    var uerLogin = {};
    var user = null;
    var users = [];
    // return available functions for use in the controllers
    function isLoggedIn() {
      if (user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('api/user/status')
        .then(function(res) {
          if (res.data) {
            user = res.data.status;
          } else {
            user = false;
          }
        })
        .catch(function(data) {
          user = false;
        });
    }
    function checkUser(){
          return users;
    }
    function login(user) {

      var deferred = $q.defer();
      $http.post('api/user/login', {
          username: user.username,
          password: user.password
        })
        .then(function(response) {
          if (response.status === 200 && response.status) {
              console.log(response,"response");
              // $http.defaults.headers.common['x-access-token'] =  res.access_token;
              // $cookies.putObject('globals',$rootScope.globals);

             $cookies.put('currentUser', JSON.stringify(response.data.user));
             console.log('userC');
             console.log(JSON.parse($cookies.get('currentUser')));
             users = response.data.user;
             // checkUser();
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        .catch(function(response) {
          errors = response.data.err.name;
          user = false;
          deferred.reject();
        });
      return deferred.promise;

    }

    function logout() {
      var deferred = $q.defer();
      $http.get('api/user/logout')
        .then(function(data) {
          user = false;
          deferred.resolve();
        })
        .catch(function(data) {
          user = false;
          deferred.reject();
        });
      return deferred.promise;
    }

    var errors = "";
    function register(user) {
      console.log(user,"sdsd")
      var deferred = $q.defer();
      $http.post('api/user/register', {
          username: user.username,
          password: user.password,
          name: user.name,
          phone: user.phone,
          address: user.address
        })
        .then(function(response) {
            console.log(response,'register')
          if (response.status === 200 && response.status) {
              $cookies.put('currentUser', JSON.stringify(response.data.account));
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        .catch(function(response) {
            console.log(response);
          errors = response.data.err.name;
          console.log(errors);
          deferred.reject();
        });

      return deferred.promise;

    }
    return ({
      errors:errors,
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      uerLogin:uerLogin,
      checkUser:checkUser
    });

  }
]);
