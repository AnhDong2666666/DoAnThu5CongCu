app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider

        .state('home', {
            url: '',
            views: {
                "": {
                    templateUrl: 'app/homeView.html'
                }
            }
        })
        .state('home.index', {
            url: "/",
            views: {
                "": {
                    templateUrl: 'app/components/index/indexView.html',
                    controller: 'indexCtrl',
                }
            },
            access: true
        })
        .state('home.phone', {
            url: "/phone",
            views: {
                "": {
                    templateUrl: 'app/components/phone/phoneView.html',
                    controller: 'phoneCtrl',
                }
            },
            access: true
        })
        .state('home.phonecate', {
            url: "/phone/category/:id",
            views: {
                "": {
                    templateUrl: 'app/components/phone/phoneCateView.html',
                    controller: 'phoneCateCtrl',
                }
            },
            access: true
        })
        .state('home.iphone', {
            url: "/iphone",
            views: {
                "": {
                    templateUrl: 'app/components/iphone/iphoneView.html',
                    controller: 'iphoneCtrl',
                }
            },
            access: true
        })
        .state('home.iphonecate', {
            url: "/iphone/category/:id",
            views: {
                "": {
                    templateUrl: 'app/components/iphone/iphoneCateView.html',
                    controller: 'iphoneCateCtrl',
                }
            },
            access: true
        })
        .state('home.tablet', {
            url: "/tablet",
            views: {
                "": {
                    templateUrl: 'app/components/tablet/tabletView.html',
                    controller: 'tabletCtrl',
                }
            },
            access: true
        })
        .state('home.tabletcate', {
            url: "/tablet/category/:id",
            views: {
                "": {
                    templateUrl: 'app/components/tablet/tabletCateView.html',
                    controller: 'tabletCateCtrl',
                }
            },
            access: true
        })
        .state('home.watch', {
            url: "/watch",
            views: {
                "": {
                    templateUrl: 'app/components/watch/watchView.html',
                    controller: 'watchCtrl',
                }
            },
            access: true
        })
        .state('home.watchcate', {
            url: "/watch/category/:id",
            views: {
                "": {
                    templateUrl: 'app/components/watch/watchCateView.html',
                    controller: 'watchCateCtrl',
                }
            },
            access: true
        })
        .state('home.posts', {
            url: "/posts",
            views: {
                "": {
                    templateUrl: 'app/components/posts/postsView.html',
                    controller: 'postsCtrl',
                }
            },
            access: true
        })
        .state('home.post', {
            url: "/post/:id",
            views: {
                "": {
                    templateUrl: 'app/components/posts/postView.html',
                    controller: 'postCtrl',
                }
            },
            access: true
        })
        .state('home.product', {
            url: "/product/:id",
            views: {
                "": {
                    templateUrl: 'app/components/product/productView.html',
                    controller: 'productCtrl'
                }
            }

        })
        .state('home.add-product', {
            url: "/add-product",
            views: {
                "": {
                    templateUrl: 'app/components/nutrition/add-productView.html',
                    controller: 'NutritionCtrl',

                }

            },
            access: false
        })
        .state('home.checkout', {
            url: "/checkout",
            views: {
                "": {
                    templateUrl: 'app/components/checkout/checkoutView.html',
                    controller: 'CheckoutCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false
        })

        .state('admin', {
            url: '/admin',
            views: {
                "": {
                    templateUrl: 'app/admin/adminView.html',
                    controller: 'AdminCtrl',
                    controllerAs:'$ctrl'
                }
            },
            redirectTo: 'admin.product',
            access: true
        })
        .state('admin.product', {
            url: "/list-product",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-product/admin-productView.html',
                    controller: 'Admin-prodctCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('admin.post', {
            url: "/list-post",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-post/admin-postView.html',
                    controller: 'Admin-postCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('admin.category', {
            url: "/list-category",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-category/admin-categoryView.html',
                    controller: 'Admin-categoryCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('admin.user', {
            url: "/list-user",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-user/admin-userView.html',
                    controller: 'Admin-userCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('admin.userbyproduct', {
            url: "/product-by-user",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-productUser/admin-productUserView.html',
                    controller: 'Admin-productUserCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('admin.posts', {
            url: "/list-posts",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-postProduct/admin-postProductView.html',
                    controller: 'Admin-postProductCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('error', {
            url: "/error",
            templateUrl: 'assests/html/error.html'
        })

        
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('');
})
