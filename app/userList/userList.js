'use strict';
angular.module('myApp.userList', ['UserListService'])
.controller('UserListCtrl',['$scope','$http','UserService', function($scope,$http,UserService) {
  $scope.getSearchResult=function(){
    UserService.list($scope.query).then(function(data) {
                  $scope.userData = data.items;
              });
   }
}]);
