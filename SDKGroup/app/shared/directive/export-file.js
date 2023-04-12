app.directive('exportTable', function() {
    return {
        restrict: 'AC',
        link: function($scope, element, attr) {
            $scope.$on('export-pdf', function(e, d) {
                element.tableExport({
                    type: 'pdf',
                    escape: 'false',
                    ignoreColumn:d
                });
            });
            $scope.$on('export-excel', function(e, d) {
                element.tableExport({
                    type: 'excel',
                    escape: false,
                    ignoreColumn:d
                });
            });
            $scope.$on('export-doc', function(e, d) {
                element.tableExport({
                    type: 'doc',
                    escape: false,
                    ignoreColumn:d
                });
            });
        }
    }

});
