app.service('shareData',function () {
  this.data ={};
  this.getData = function () {
       return this.data;
  }
  this.setData = function (t) {
    this.data = t;
  }
  this.userlog =[];
})
