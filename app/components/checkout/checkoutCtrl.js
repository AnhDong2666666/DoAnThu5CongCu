app.controller('CheckoutCtrl', function($scope, $http, apiService, AuthService, $cookies) {
    let self = this;
    self.show = false;
    self.productUsers = [];
    self.feedBack = {};
    self.userFeedBack = JSON.parse($cookies.get('currentUser'));
    self.user = AuthService.isLoggedIn() ? JSON.parse($cookies.get('currentUser')): null;
    self.idUser = AuthService.isLoggedIn() ? JSON.parse($cookies.get('currentUser'))._id : null,
        this.init = function() {
            if (self.idUser) {
                $http.get('/api/productUsers/:' + self.idUser)
                    .then(function(response) {
                        self.productUsers = response.data;
                        console.log(self.productUsers, "self.productUsers")
                    })
                    .catch(function(data) {
                        console.log(data, "loi getProductUserById");
                    })
            }
        }

        this.Cancel = function(){
             self.feedBack = {};
        }
        this.Send = function(){
            self.feedBack.idUser = self.idUser;
            self.feedBack.username = self.userFeedBack.username;

        }
        this.onAdd = function(){
            self.show = !self.show;
        }

    this.init()

});
