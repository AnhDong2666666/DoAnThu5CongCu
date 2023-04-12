app.controller('loginCtrl', function($scope, $http, apiService) {
  window.apps = this;
  let self = this;
  $scope.addUser= function(){
    console.log($scope.user);
    $http.post('/api/user/login', $scope.user).then(function(response){
      // window.location='/';
    });
  }

});
