app.controller('Admin-productUserCtrl', function($scope, $http, shareData, apiService, AuthService, $cookies, DialogService) {
    let self = this;
    self.productUsers = [];
    self.user = [];
    this.onExportDoc = function(){
        $scope.$broadcast('export-doc', [5]);
    }
    this.onExportExcel = function(){
        $scope.$broadcast('export-excel', [5]);
    }
    angular.element(document).ready(function() {
        $(document).ready(function() {
            $('#productUserCtrl').DataTable({
                  "serverSide": false
            });
        });
    })
    self.idUser = JSON.parse($cookies.get('currentUser'))._id;
    this.init = function() {
            apiService.getproductUsers()
                .then(function(response) {
                    self.productUsers = response.data;
                    self.productUsers.forEach(function (productUser) {
                        switch (productUser.status) {
                            case 1:
                                productUser.statusP = "Mới";
                                break;
                            case 2:
                                productUser.statusP = "Xử lý";
                                break;
                            case 3:
                                productUser.statusP = "Hoàn thành";
                                break;
                            case 4:
                                productUser.statusP = "Hủy";
                                break;
                        };
                    })
                })
                .catch(function(data) {
                    console.log(data, "loi getProductUserById");
                })     
                
    }
    this.deleteproductUsers = function(product) {
        if (confirm('Chắc chắn xóa?'))
            apiService.deleteProductUser(product._id)
            .then(function(data) {
                $.notify({
                    icon: 'fa fa-check',
                    message: 'Delete success !!!!'
                }, {
                    delay: 2,
                    timer: 300
                });
                self.init();
            })
    }

    this.addProductUser = function() {
        shareData.setData();
        DialogService.editProductUserStatus();
    }
    this.onEdit = function(product) {
        shareData.setData(product);
        DialogService.editProductUserStatus();
    }

    this.init()
});
