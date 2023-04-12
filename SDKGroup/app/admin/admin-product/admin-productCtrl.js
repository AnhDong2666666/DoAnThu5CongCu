app.controller('Admin-prodctCtrl', function($scope, $http, shareData, apiService, AuthService, $cookies, DialogService) {
    let self = this;
    self.productModels = [];
    this.onExportPDF = function(){
        $scope.$broadcast('export-pdf', [6,7]);
    }
    this.onExportDoc = function(){
        $scope.$broadcast('export-doc', [6,7]);
    }
    this.onExportExcel = function(){
        $scope.$broadcast('export-excel', [6,7]);
    }
    this.init = function() {
        var i = 1;
        apiService.getProduct()
            .then(function(product) {
                self.productModels = product.data;
                self.productModels.forEach(function (product) {
                    if(Array.isArray(product.category_id) && product.category_id.length){
                        apiService.getCategoryById(product.category_id[0]).then(function(category){
                            product.category = category.data;
                        })
                    }
                    // switch (product.groupId) {
                    //     case 1:
                    //         product.group = "Healthy every day";
                    //         break;
                    //     case 2:
                    //         product.group = "Nutrition for baby";
                    //         break;
                    //     case 3:
                    //         product.group = "Nutrition for olders";
                    //         break;
                    //     case 4:
                    //         product.group = "Weight Gain";
                    //         break;
                    //     case 5:
                    //         product.group = "Weight Loss";
                    //         break;
                    // };
                    product.stt = i;
                    i = i +1;
                })

            })
            .catch(function(data) {
                console.log(data, "errr");
            })
    }
    this.deleteProduct = function(product) {
        if (confirm('Chắc chắn xóa?'))
            apiService.deleteProduct(product._id)
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
    this.addProduct = function() {
        shareData.setData();
        DialogService.newProduct();
    }
    this.onEdit = function(product) {
        shareData.setData(product);
        DialogService.newProduct();
    }
    window.onloadListProduct = function() {
        self.init();
    }
    this.init()
});
