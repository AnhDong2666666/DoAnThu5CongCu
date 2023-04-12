var moduleName = 'shopList';
var componentName = moduleName;

angular.module(moduleName, [])
  .component(componentName, {
    templateUrl: componentTemplateFileName(moduleName, componentName),
    controller: Controller,
    controllerAs: '$ctrl'
  });

function Controller($http) {
  var self = this;
   $http.get('app/components/data.json')
      .then(function(res) {
      self.shopList = res.data;
      });
}

function componentTemplateFileName(moduleName, componentName) {
  return 'app/components/' + moduleName + "/" + componentName + ".html"
}
