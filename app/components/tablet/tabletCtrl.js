app.controller('tabletCtrl', function($scope, $http, apiService) {
  window.apps = this;
  let self = this;
  this.list = [];
  self.page = 3;


  angular.element(document).ready(function() {
    $('.flexslider').flexslider({
      animation: "slide",
      start: function(slider) {
        $('body').removeClass('loading');
      }
    });
  });
  
  apiService.getCategoryByPageId(self.page).then(function(category){
    $scope.categories = category.data;
    // console.log($scope.categories)
    apiService.getProductByCategory(category.data[0]._id)
    .then(function(product) {
      $scope.data = product.data;
      // console.log('product', product.data);
      $scope.addShop = function(id) {
        let pro = $scope.data.find(p => {
          return p._id == id;
        })
        apiService.listProducts.push(pro);
        $.notify({
          icon: 'fa fa-check',
          message: 'Đã thêm ' + pro.name + ' vào giỏ hàng'
        },{
           delay: 2,
           timer: 150
        });
        localStorage.setItem("qty", apiService.listProducts.length);
        document.getElementById("cart-qty").innerHTML = localStorage.getItem("qty");
        // console.log(apiService.listProducts);
        for (var i = 1; i < apiService.listProducts.length; i++) {
          for (var y = 0; y < i; y++) {
            if (apiService.listProducts[i]._id == apiService.listProducts[y]._id) {
              for (var k = i; k < apiService.listProducts.length; k++) {
                apiService.listProducts[k] = apiService.listProducts[k + 1]
                apiService.listProducts.length = apiService.listProducts.length - 1;
                i = i - 1;
              }
            }
          }
        }

      }

    });
  })
});
