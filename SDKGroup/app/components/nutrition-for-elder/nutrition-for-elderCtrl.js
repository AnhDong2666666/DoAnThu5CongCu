app.controller('nutrition-for-elderCtrl', function($scope, $http, apiService) {
  window.apps = this;
  let self = this;
  self.groupId = 2;
  apiService.getpostProductByGroup(self.groupId)
    .then(function(product) {
      $scope.dataPost = product.data;
      console.log('dataPost', product);
    })
    apiService.getProductByGroup(self.groupId)
      .then(function(product) {
        $scope.dataProduct = product.data;
        console.log('dataProduct', product.data);
        $scope.addShop = function(id) {
          let pro = $scope.dataProduct.find(p => {
            return p._id == id;
          })
          apiService.listProducts.push(pro);
          $.notify({
            icon: 'fa fa-check',
            message: 'Add ' + pro.name + ' to the menu'
          },{
             delay: 2,
             timer: 150
          });
          console.log(apiService.listProducts);
          if(apiService.listProducts.length){
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
        }

      })

});
