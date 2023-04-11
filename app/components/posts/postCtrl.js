app.controller('postCtrl', function($scope, $http, apiService, $stateParams) {
    var postId = $stateParams.id;
  
    angular.element(document).ready(function() {
      $('.flexslider').flexslider({
        animation: "slide",
        start: function(slider) {
          $('body').removeClass('loading');
        }
      });
    });
  
  
    apiService.getPostById(postId)
      .then(function(postId) {
        $scope.data = postId.data;
      });
  });
  