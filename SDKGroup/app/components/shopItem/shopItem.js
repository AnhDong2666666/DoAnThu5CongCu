var moduleName = 'shopItem';
var componentName = moduleName;

angular.module(moduleName, [])
  .component(componentName, {
    templateUrl: componentTemplateFileName(moduleName, componentName),
    controller: Controller,
    controllerAs: '$ctrl',
    bindings: {
      id: "<",
      name: "<",
      offer: "<",
      img: "<",
      tag: "<",
      calo: "<"
    }
  });

function Controller($http, $scope) {
  var self = this;

}

function componentTemplateFileName(moduleName, componentName) {
  return 'app/components/' + moduleName + "/" + componentName + ".html"
}
