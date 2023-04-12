app.controller('Admin-postCtrl', function($scope, $http, shareData, apiService, AuthService, $cookies, DialogService) {
    let self = this;
    self.postModels = [];
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
        apiService.getPost()
            .then(function(post) {
                self.postModels = post.data;
                self.postModels.forEach(function (post) {
                    switch (post.status) {
                        case 1:
                            post.statusPost = "Hiển thị";
                            break;
                        case 2:
                            post.statusPost = "Không hiển thị";
                            break;
                    };
                    post.stt = i;
                    i = i +1;
                })

            })
            .catch(function(data) {
                console.log(data, "errr");
            })
    }
    this.deletePost = function(post) {
        if (confirm('Chắc chắn xóa?'))
            apiService.deletePost(post._id)
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
    this.addPost = function() {
        shareData.setData();
        DialogService.newPost();
    }
    this.onEdit = function(post) {
        shareData.setData(post);
        DialogService.newPost();
    }
    window.onloadListPost = function() {
        self.init();
    }
    this.init()
});
