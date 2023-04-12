app.service('apiService', ApiService);

function ApiService($http, $window) {
    var defaultImage = "../../assests/images/2.png";

    // Product Service
    var getProduct = function() {
        return $http.get('/api/products', {});
    }
    var getProductById = function(id) {
        return $http.get('/api/products/'+ id);
    }
    var getProductByCategory = function(categoryId) {
        return $http.get('/api/products/category/'+ categoryId);
    }
    var addProduct = function(product) {
        return $http.post('/api/products', product);
    }
    var editProduct = function(product) {
        var id = product._id;
        return $http.put('/api/products/:'+id, product);
    }
    var deleteProduct = function(id) {
        return $http.delete('/api/products/:'+ id);
    }

    //Post Service
    var getPost = function() {
        return $http.get('/api/posts', {});
    }
    var getPostById = function(id) {
        return $http.get('/api/posts/'+ id);
    }
    var addPost = function(post) {
        return $http.post('/api/posts', post);
    }
    var editPost = function(post) {
        var id = post._id;
        return $http.put('/api/posts/:'+id, post);
    }
    var deletePost = function(id) {
        return $http.delete('/api/posts/:'+ id);
    }

    //Category Service
    var getCategory = function() {
        return $http.get('/api/categories', {});
    }

    var getCategoryById = function(id) {
        return $http.get('/api/categories/'+id, {});
    }

    var getCategoryByPageId = function(pageId) {
        return $http.get('/api/categories/page/'+pageId, {});
    }

    var addCategory = function(category) {
        return $http.post('/api/categories', category);
    }
    var editCategory = function(category) {
        var id = category._id;
        return $http.put('/api/categories/:'+id, category);
    }
    var deleteCategory = function(id) {
        return $http.delete('/api/categories/:'+ id);
    }

    var getpostProduct = function() {
        return $http.get('/api/postproduct', {});
    }
    var getpostProductByGroup = function(id) {
        return $http.get('/api/postproduct/:'+ id);
    }
    var addpostProduct = function(product) {
        return $http.post('/api/postproduct', product);
    }
    var editpostProduct = function(product) {
        var id = product._id;
        return $http.put('/api/postproduct/:'+id, product);
    }
    var deletepostProduct = function(id) {
        return $http.delete('/api/postproduct/:'+ id);
    }

    //User Service
    var getUser = function() {
        return $http.get('/api/user', {});
    }

    var getUserById = function(id){
        return $http.get('/api/user/'+ id);
    }

    var deleteUser = function(id) {
        return $http.delete('/api/user/:'+ id);
    }
    var getproductUsers = function() {
        return $http.get('/api/productUsers', {});
    }
    var addProductUser = function(product) {
        return $http.post('/api/productUsers/',product);
    }

    var editProductUser = function(product) {
        var id = product._id;
        return $http.put('/api/productUsers/:'+id, product);
    }

    var deleteProductUser = function(id) {
        return $http.delete('/api/productUsers/:'+ id);
    }
    var getProductUserById = function(idUser) {
        console.log(idUser,"idUser");
        return $http.get('/api/productUsers/:'+ idUser);

    }
    var getProductUserById = function(idUser) {
        console.log(idUser,"idUser");
        return $http.get('/api/productUsers/:'+ idUser);

    }
    var uploadAvatar = function(avatar) {
        console.log(avatar,"avatar");
        return $http.post('/upload', avatar,{
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined,
                "Authorization": 'halinh'
            }
        });
    }

    var getNutrition = function() {
        return $http.get('/api/nutrition', {
        });
    }
    var getNutritionForElder = function() {
        return $http.get('/api/nutrition-for-elder', {
        });
    }
   

    var listProducts = [];
    var product = {};

    return {
        uploadAvatar: uploadAvatar,
        getUser: getUser,
        getUserById : getUserById,
        listProducts: listProducts,
        product: product,
        addProduct:addProduct,
        addPost: addPost,
        addCategory: addCategory,
        defaultImage: defaultImage,

        getProduct: getProduct,
        getPost: getPost,
        getCategory: getCategory,
        getproductUsers:getproductUsers,
        addProductUser:addProductUser,

        getCategoryById: getCategoryById,
        
        //Edit
        editProduct: editProduct,
        editPost: editPost,
        editCategory: editCategory,
        editProductUser: editProductUser,
        
        //Delete
        deleteProduct:deleteProduct,
        deletePost: deletePost,
        deleteCategory:deleteCategory,
        deleteUser:deleteUser,
        deleteProductUser:deleteProductUser,
        
        getNutrition:getNutrition,
        getNutritionForElder:getNutritionForElder,
   
        getpostProduct:getpostProduct,
        addpostProduct:addpostProduct,
        deletepostProduct: deletepostProduct,
        editpostProduct: editpostProduct,
        getProductById:getProductById,
        getProductByCategory: getProductByCategory,
        getPostById: getPostById,
        getCategoryByPageId: getCategoryByPageId,
        getpostProductByGroup :getpostProductByGroup 

    }
}
