'use strict';

var app=angular.module('myApp', [
  'ui.router',
  'googlechart',
  'myApp.userList',
  'myApp.userListDetail'
]);

app.config([ '$locationProvider','$urlRouterProvider','$stateProvider', function( $locationProvider,$urlRouterProvider, $stateProvider) {
 $locationProvider.hashPrefix('!');
 $stateProvider.state('userList', {
     url: '/userList',
     templateUrl: 'userList/userList.html',
     controller: 'UserListCtrl'
   });
  $stateProvider.state('userListDetail', {
      url: '/:userId',
      templateUrl: 'userList/userDetail.html',
      controller: 'UserDetailCtrl'
    });
  $urlRouterProvider.otherwise('/userList');
}]);

angular.module('UserListService',[]).service('UserService',['$http',function($http) {
var service={
    list: function(query) {
      return   $http.get("https://api.github.com/search/users", {params:{"q":query , "order": "asc"}}).then(resp => resp.data);
    },
    getUserDetail: function(username) {
      return   $http.get("https://api.github.com/users/"+username).then(resp => resp.data);
    },
    getUrl: function(repoUrl) {
      return   $http.get(repoUrl).then(resp => resp.data);
    },
    getLanguage: function(url){
      return $http.get(url+"/languages").then(resp => resp.data);
    }
}
return service;
}]);
