app.controller('Admin-categoryCtrl', function($scope, $http, shareData, apiService, AuthService, $cookies, DialogService) {
    let self = this;
    self.categoryModels = [];
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
        apiService.getCategory()
            .then(function(category) {
                self.categoryModels = category.data;
                self.categoryModels.forEach(function (category) {
                    switch (category.page_id) {
                        case 1:
                            category.page = "Điện thoại";
                            break;
                        case 2:
                            category.page = "Iphone";
                            break;
                        case 3:
                            category.page = "Tablet";
                            break;
                        case 4:
                            category.page = "Watch";
                            break;
                        case 5:
                            category.page = "Cũ giá rẻ";
                            break;
                    };
                    category.stt = i;
                    i = i +1;
                })

            })
            .catch(function(data) {
                console.log(data, "errr");
            })
    }
    this.deleteCategory = function(category) {
        if (confirm('Chắc chắn xóa?'))
            apiService.deleteCategory(category._id)
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
    this.addCategory = function() {
        shareData.setData();
        DialogService.newCategory();
    }
    this.onEdit = function(category) {
        shareData.setData(category);
        DialogService.newCategory();
    }
    window.onloadListCategory = function() {
        self.init();
    }
    this.init()
});
