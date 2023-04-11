app.service('uploadService', upload);
function upload ($http) {
    var uploadFile = function(file) {
        return $http.post('/upload/file', file, {
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined,
                "Authorization": 'anhdong'
            }
        });
    }
    var uploadImage = function(image) {
        return $http.post('/upload/image', image, {
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined,
                "Authorization": 'anhdong'
            }
        });
    }
    var uploadAvatar = function(avatar) {
        console.log(avatar,"avatar");
        return $http.post('/upload/avatar', avatar,{
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined,
                "Authorization": 'anhdong'
            }
        });
    }
    return {
        uploadFile: uploadFile,
        uploadImage: uploadImage,
        uploadAvatar: uploadAvatar
    }
}
