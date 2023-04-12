function Controller($scope) {
  let self = this;
  angular.element(document).ready(function() {
    $('.flexslider').flexslider({
      animation: "slide",
      start: function(slider) {
        $('body').removeClass('loading');
      }
    });
  });
  $scope.title ="Healthy every day";
  $scope.menu = [{
      "name": "Điện thoại",
      "id": "1"
    },{
      "name": "Máy tính bảng",
      "id": 2
    }, {
      "name": "Laptop",
      "id": 3
    }, {
      "name": "Máy đọc sách",
      "id": 4
    }, {
      "name": "Máy ảnh",
      "id": 5
    }, {
      "name": "PC",
      "id": 6
    }, {
      "name": "Hot",
      "id": 7
    }]
  $scope.clickB=function (i) {
    $scope.title = i;
    console.log($scope.title);
  }
}

  app.component('sideBar', {
    templateUrl: "app/shared/sidebar/sidebarView.html",
    controller: Controller,
    controllerAs: 'sidebarCtrl'
  })
