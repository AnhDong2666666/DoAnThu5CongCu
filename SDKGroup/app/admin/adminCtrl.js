app.controller('AdminCtrl', function($scope, $http, apiService, AuthService, $cookies) {
    let self = this;
    self.productUsers = [];
    self.idUser = AuthService.isLoggedIn() ? JSON.parse($cookies.get('currentUser'))._id : null,
        this.init = function() {
            self.Admin = JSON.parse($cookies.get('currentUser'));
        }
    angular.element(document).ready(function() {
        $(document).ready(function() {
            $('#product').DataTable({
                retrieve: true,
                paging: true
            });
        });
    })
    this.init()
});
