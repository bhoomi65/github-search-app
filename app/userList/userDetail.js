'use strict';

angular.module('myApp.userListDetail', ['googlechart','UserListService'])

.controller('UserDetailCtrl',['$scope','$http','UserService','$state', function($scope,$http,UserService,$state) {
  var username=$state.params.userId;

  UserService.getUserDetail(username).then(function(data) {
              $scope.fullName=data.name;
              if($scope.fullName != undefined){
                $scope.firstName=$scope.fullName.split(" ")[0];
                $scope.lastName=$scope.fullName.split(" ")[1];
              }
              $scope.email=data.email;
              $scope.gitName=data.login;
              $scope.avatarUrl=data.avatar_url;
              $scope.repos_url=data.repos_url;
              UserService.getUrl($scope.repos_url).then(function(data) {
                $scope.repo1= data[0].url;
                $scope.repo2=data[1].url;
                  UserService.getLanguage($scope.repo1).then(function(data) {
                      $scope.repoOneData=data;
                      $scope.barChartObjectOne = {};
                      $scope.barChartObjectOne.type = "BarChart";
                      $scope.pieChartObjectOne = {};
                      $scope.pieChartObjectOne.type = "PieChart";
                      $scope.barChartObjectOne.options = {
                          'title':' Repository result on different Languages(In Bytes)'}
                      $scope.pieChartObjectOne.options = {
                          'title':' Repository result on different Languages(In Bytes)'}
                            for(var i in $scope.repoOneData){
                            if(i == "Ruby"){
                              $scope.rubyOne = [
                                {v: "Ruby"},
                                {v: $scope.repoOneData["Ruby"]},
                              ];
                            }else if(i== "JavaScript"){
                              $scope.javascriptOne = [
                                {v: "JavaScript"},
                                {v: $scope.repoOneData["JavaScript"]},
                              ];
                            }else if(i== "CSS"){
                              $scope.cssOne = [
                                {v: "CSS"},
                                {v: $scope.repoOneData["CSS"]},
                              ];
                            }else if(i== "HTML"){
                              $scope.htmlOne = [
                                {v: "HTML"},
                                {v: $scope.repoOneData["HTML"]},
                              ];
                            }else if(i== "XSLT"){
                              $scope.xsltOne = [
                                {v: "XSLT"},
                                {v: $scope.repoOneData["XSLT"]},
                              ];
                            }else{
                              $scope.extraOne = [
                                {v: i },
                                {v: $scope.repoOneData[i]},
                              ];
                            }
                         }
                         $scope.barChartObjectOne.data = {"cols": [
                             {id: "t", label: "languages" , type: "string"},
                             {id: "s", label: 'bytes', type: "number"}
                         ], "rows": [
                             {c: $scope.rubyOne}
                         ]};
                         $scope.pieChartObjectOne.data = {"cols": [
                             {id: "t", label: "languages" , type: "string"},
                             {id: "s", label: 'bytes', type: "number"}
                         ], "rows": [
                             {c: $scope.rubyOne}
                         ]};
                  });
                  UserService.getLanguage($scope.repo2).then(function(data) {
                     $scope.data=data;
                     $scope.barChartObject = {};
                     $scope.barChartObject.type = "BarChart";
                     $scope.barChartObject.options = {
                         'title':' Repository result on different Languages(In Bytes)'
                     };
                     $scope.pieChartObject = {};
                     $scope.pieChartObject.type = "PieChart";
                     $scope.pieChartObject.options = {
                         'title':' Repository result on different Languages(In Bytes)'
                     };
                      $scope.extra=[];
                       for(var i in $scope.data) {
                         $scope.extra.push([{
                           v : i},{
                             v: $scope.data[i]
                         }])
                         if(i == "Ruby"){
                           $scope.ruby = [
                             {v: "Ruby"},
                             {v: $scope.data["Ruby"]},
                           ];
                         }else if(i== "JavaScript"){
                           $scope.javascript = [
                             {v: "JavaScript"},
                             {v: $scope.data["JavaScript"]},
                           ];
                         }else if(i== "CSS"){
                           $scope.css = [
                             {v: "CSS"},
                             {v: $scope.data["CSS"]},
                           ];
                         }else if(i== "HTML"){
                           $scope.html = [
                             {v: "HTML"},
                             {v: $scope.data["HTML"]},
                           ];
                         }else if(i== "XSLT"){
                           $scope.xslt = [
                             {v: "XSLT"},
                             {v: $scope.data["XSLT"]},
                           ];
                         }
                      }
                      $scope.pieChartObject.data = {"cols": [
                          {id: "t", label: "languages" , type: "string"},
                          {id: "s", label: 'bytes', type: "number"}
                      ], "rows": [
                          {c: $scope.ruby},
                          {c: $scope.css},
                          {c: $scope.html},
                          {c: $scope.javascript},
                          {c: $scope.xslt},
                          {c: $scope.extra }
                      ]};
                          $scope.barChartObject.data = {"cols": [
                              {id: "t", label: "languages" , type: "string"},
                              {id: "s", label: 'bytes', type: "number"}
                          ], "rows": [
                              {c: $scope.ruby},
                              {c: $scope.css},
                              {c: $scope.html},
                              {c: $scope.javascript},
                              {c: $scope.xslt},
                              {c: $scope.extra }
                          ]};
                        });
                      });
                    });
}]);
