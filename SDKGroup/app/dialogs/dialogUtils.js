app.filter('sumPro', function() {
        return function(data, key) {
            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }
            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i][key] == null || data[i][key] == '' || data[i][key] == 'undefined') {
                    data[i][key] = 0;
                }
                sum += parseInt(data[i][key]);
            }
            return sum;
        };
    })
    .service('DialogService', DialogUtils);

function DialogUtils(ModalService, $http, $timeout, apiService, shareData, $location, AuthService, shareData, $rootScope,$cookies, $routeParams, uploadService) {
    let myDialogs = new Object();
    myDialogs.newCart = function() {
        function ModalController(close) {
            window.new = this;
            var self = this;
            self.productUsers = {
                "idUser": AuthService.isLoggedIn() ? JSON.parse($cookies.get('currentUser'))._id : null,
                "product": [],
                "username": AuthService.isLoggedIn() ? JSON.parse($cookies.get('currentUser')).username: null,
                "phone": AuthService.isLoggedIn() ? JSON.parse($cookies.get('currentUser')).phone: null,
                "address": AuthService.isLoggedIn() ? JSON.parse($cookies.get('currentUser')).address: null
            }
            AuthService.getUserStatus();
            // console.log(AuthService.isLoggedIn());;
            // if(apiService.listProducts.length){
            //     for (var i = 1; i < apiService.listProducts.length; i++) {
            //       for (var y = 0; y < i; y++) {
            //         if (apiService.listProducts[i]._id == apiService.listProducts[y]._id) {
            //             console.log(apiService.listProducts[i],"apiService.listProducts[i]");
            //           for (var k = i; k < apiService.listProducts.length; k++) {
            //             apiService.listProducts[k] = apiService.listProducts[k + 1]
            //             apiService.listProducts.length = apiService.listProducts.length - 1;
            //             i = i - 1;
            //           }
            //         }
            //       }
            //     }
                this.data = apiService.listProducts;
            // };
            self.data.forEach(function(data) {
                data.amount = 1;
                if (data.sum == 0 || !data.sum) {
                    data.sum = data.price;
                }
            })
            this.delProduct = function(id) {
                for (i in self.data) {
                    if (self.data[i]._id == id) {
                        self.data.splice(i, 1);
                        self.init();
                    }
            }
            }
            this.myChange = function(da) {
                da.qty = da.amount;
                da.sum = da.amount * da.price;
                self.init();
            }
            this.init = function() {
                AuthService.getUserStatus().then(function() {
                    self.getUserStatus = AuthService.isLoggedIn();
                });
                // console.log(self.productUsers.idUser, "self.productUsers.idUser");
            }
            this.init();


            this.saveProducUser = function() {
                self.productUsers.product = self.data;
                self.productUsers.user = JSON.parse($cookies.get('currentUser'));
                if (AuthService.isLoggedIn()) {
                    apiService.addProductUser(self.productUsers)
                        .then(function(response) {
                            self.data = [];
                            apiService.listProducts = [];
                            $.notify({
                                icon: 'fa fa-check',
                                message: 'Save success !!!!'
                            }, {
                                delay: 2,
                                timer: 200
                            });
                            $timeout(function() {
                                $location.path('/checkout');
                            }, 200);

                        })
                        .catch(function(data) {
                            $.notify({
                                icon: 'exclamation-triangle',
                                message: 'Save error !!!!'
                            }, {
                                delay: 2,
                                timer: 200
                            });
                            console.log(data);
                        });
                } else {
                    myDialogs.login();
                }

            }

        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/modal-cart/cartView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.login = function() {
        function ModalController(close) {
            var self = this;
            this.register = function() {
                myDialogs.register();
            }

            this.login = function() {
                self.error = false;
                self.disabled = true;
                AuthService.uerLogin = self.user;
                self.checkuser = function() {
                    self.error = false;
                }
                AuthService.login(self.user)
                    // handle success
                    .then(function(data) {
                        console.log(AuthService.checkUser(), "AuthService");
                        AuthService.getUserStatus();
                        self.disabled = false;
                        window.location.href = '/';
                    })
                    // handle error
                    .catch(function(data) {
                        console.log(data, "loginsai roi");
                        AuthService.getUserStatus();
                        self.error = true;
                        self.errorMessage = "Invalid username and/or password";
                        self.disabled = false;
                        self.user = {};
                    });

            };


        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/authentication/login/loginView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                console.log(data, "dialog,data");
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.register = function() {
        function ModalController(close) {
            var self = this;
            self.errorMessage = "User Exists Error!";
            this.login = function() {
                myDialogs.login();
            }

            //check if user is already exist
            this.checkuser = function() {
                apiService.getUser()
                    .then(function(user) {
                        self.users = user.data;
                        var a = self.users;
                        for (var i = 0; i < a.length; i++) {
                            if (self.registerForm.username == a[i].username) {
                                self.error = true;
                            } else {
                                self.error = false;
                                for (var i = 0; i < a.length; i++) {
                                    if (self.registerForm.username == a[i].username) {
                                        self.error = true;
                                    }
                                }
                            }

                        }

                    })
            }
            self.modalClose = "modal";
            this.register = function() {
                self.error = false;
                self.disabled = true;
                AuthService.register(self.registerForm)
                    .then(function() {
                        self.disabled = false;
                        self.user = {};
                        // angular.element(document).ready(function() {
                        //     $("#modalCloses").click();
                        // })

                        AuthService.getUserStatus();
                        self.disabled = false;
                        window.location.href = '/';
                    })
                    // handle error
                    .catch(function() {
                        console.log(AuthService.errors);
                        self.error = true;
                        self.errorMessage = "Something went wrong!";
                        self.disabled = false;
                        self.user = {};
                    });

            };
        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/authentication/register/registerView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.newProduct = function() {
        function ModalController(close) {
            window.new = this;
            var self = this;
            apiService.getCategory()
            .then(function(category) {
                self.categories = category.data;

            })
            .catch(function(data) {
                console.log(data, "errr");
            })
            self.productModel = shareData.getData() ? shareData.getData() : {};
            this.addProduct = function() {
                if (self.image) {
                    console.log(self.image, "self.avatar");
                    var formData = new FormData();
                    formData.append('file', self.image);
                    uploadService.uploadImage(formData)
                        .then((rs) => {
                            self.productModel.img = rs.data.content;
                            console.log(self.productModel.img, "self.productModel.img")
                            var onSave = undefined;
                            if (self.productModel._id == undefined || self.productModel._id == 0){
                                onSave = apiService.addProduct;
                            }
                            else {
                                onSave = apiService.editProduct;
                            }
                            onSave(self.productModel).then(function(data) {
                                    self.productModel = {};
                                    $.notify({
                                        icon: 'fa fa-check',
                                        message: 'Update success !!!!'
                                    }, {
                                        delay: 2,
                                        timer: 200
                                    });
                                    onloadListProduct();
                                    $location.path('/admin/list-product');
                                })
                                .catch(function(data) {
                                    console.log(data, "addProduct")
                                })
                        }).catch((err) => {
                            console.log("upload avatar fail", err);
                        })
                } else {
                    self.productModel.img = 'uploads/imgs/1582873184295_iphoneX.jpg';
                    var onSave = undefined;
                    if (self.productModel._id == undefined || self.productModel._id == 0){
                        onSave = apiService.addProduct;
                    }
                    else {
                        onSave = apiService.editProduct;
                    }
                    onSave(self.productModel).then(function(data) {
                            self.productModel = {};
                            $.notify({
                                icon: 'fa fa-check',
                                message: 'Update success !!!!'
                            }, {
                                delay: 2,
                                timer: 200
                            });
                            onloadListProduct();
                            $location.path('/admin/list-product');
                        })
                        .catch(function(data) {
                            console.log(data, "addProduct")
                        })
                }
            }


        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/modal-addProduct/addProductView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.editProductUserStatus = function() {
        function ModalController(close) {
            window.new = this;
            var self = this;
            this.statusP = [{
                "name": "Mới",
                "id": 1
            },
            {
                "name": "Xử lý",
                "id": 2
            },
            {
                "name": "Hoàn thành",
                "id": 3
            },
            {
                "name": "Hủy",
                "id": 4
            }];
            self.productUserModel = shareData.getData() ? shareData.getData() : {};
            this.editProductUser = function() {
                apiService.editProductUser(self.productUserModel).then(function(data) {
                        self.productUserModel = {};
                        $.notify({
                            icon: 'fa fa-check',
                            message: 'Update success !!!'
                        }, {
                            delay: 2,
                            timer: 200
                        });
                    })
                    .catch(function(data) {
                        console.log(data, "addProductUser")
                    })
            }


        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/modal-addProductUser/addProductUserView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }

    myDialogs.newCategory = function() {
        function ModalController(close) {
            window.new = this;
            var self = this;
            this.pages = [{
                "name": "Điện thoại",
                "id": 1
            },
            {
                "name": "Iphone",
                "id": 2
            },
            {
                "name": "Tablet",
                "id": 3
            },
            {
                "name": "Watch",
                "id": 4
            }, {
                "name": "Cũ giá rẻ",
                "id": 5
            }];
            self.categoryModel = shareData.getData() ? shareData.getData() : {};
            this.addCategory = function() {
                var onSave = undefined;
                if (self.categoryModel._id == undefined || self.categoryModel._id == 0){
                    onSave = apiService.addCategory;
                }
                else {
                    onSave = apiService.editCategory;
                }
                onSave(self.categoryModel).then(function(data) {
                        self.categoryModel = {};
                        $.notify({
                            icon: 'fa fa-check',
                            message: 'Update success !!!'
                        }, {
                            delay: 2,
                            timer: 200
                        });
                        onloadListProduct();
                        $location.path('/admin/list-category');
                    })
                    .catch(function(data) {
                        console.log(data, "addCategory")
                    })
            }


        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/modal-addCategory/addCategoryView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.newPost = function() {
        function ModalController(close) {
            window.new = this;
            var self = this;
            this.statusPost = [{
                    "name": "Hiển thị",
                    "id": 1
                },
                {
                    "name": "Không hiển thị",
                    "id": 2
                }
            ]
            self.postModel = shareData.getData() ? shareData.getData() : {};
            this.addPost = function() {
                if (self.image2) {
                    console.log(self.image2, "self.avatar");
                    var formData = new FormData();
                    formData.append('file', self.image2);
                    uploadService.uploadImage(formData)
                        .then((rs) => {
                            self.postModel.img = rs.data.content;
                            console.log(self.postModel.img, "self.postModel.img")
                            var onSave = undefined;
                            if (self.postModel._id == undefined || self.postModel._id == 0)
                                onSave = apiService.addPost;
                            else {
                                onSave = apiService.editPost;
                            }
                        
                            onSave(self.postModel).then(function(data) {
                                    self.postModel = {};
                                    $.notify({
                                        icon: 'fa fa-check',
                                        message: 'Update success !!!!'
                                    }, {
                                        delay: 2,
                                        timer: 200
                                    });
                                    onloadListPost();
                                    $location.path('/admin/list-post');
                                })
                                .catch(function(data) {
                                    console.log(data, "addPost")
                                })
                        }).catch((err) => {
                            console.log("upload image fail", err);
                        })
                } else {
                    if (self.postModel._id == undefined || self.postModel._id == 0)
                        onSave = apiService.addPost;
                    else {
                        onSave = apiService.editPost;
                    }
                    onSave(self.postModel).then(function(data) {
                            self.postModel = {};
                            $.notify({
                                icon: 'fa fa-check',
                                message: 'Update success !!!!'
                            }, {
                                delay: 2,
                                timer: 200
                            });
                             onloadListPost();
                        })
                        .catch(function(data) {
                            console.log(data, "addPost")
                        })
                }
            }


        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/modal-addPost/addPostView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    return myDialogs;
}
