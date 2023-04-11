app.controller('Admin-postProductCtrl', function($scope, $http, shareData, apiService, AuthService, $cookies, DialogService) {
    let self = this;
    self.productModels = [];
    this.onExportPDF = function(){
        $scope.$broadcast('export-pdf', [5,6]);
    }
    this.onExportDoc = function(){
        $scope.$broadcast('export-doc', [5,6]);
    }
    this.onExportExcel = function(){
        $scope.$broadcast('export-excel', [5,6]);
    }
    this.init = function() {
        var i = 1;
        apiService.getpostProduct()
            .then(function(product) {
                self.productModels = product.data;
                self.productModels.forEach(function(post){
                    switch (post.groupId) {
                        case 1:
                            post.group = "Healthy every day";
                            break;
                        case 2:
                            post.group = "Nutrition for baby";
                            break;
                        case 3:
                            post.group = "Nutrition for olders";
                            break;
                        case 4:
                            post.group = "Weight Gain";
                            break;
                        case 5:
                            post.group = "Weight Loss";
                            break;
                    };
                    post.stt = i;
                    i = i + 1;
                })

            })
            .catch(function(data) {
                console.log(data, "errr");
            })

    }
    this.deleteProduct = function(product) {
        if (confirm('Chắc chắn xóa?'))
            apiService.deletepostProduct(product._id)
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
        DialogService.newPost();
    }
    this.onEdit = function(product) {
        shareData.setData(product);
        DialogService.newPost();
    }
    window.onloadListPost = function(){
        self.init();
    }

    this.init()
});
