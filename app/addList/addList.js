'use strict';

angular.module('myApp.addList', ['ui.router', 'firebase'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('addList', {
        url: "/addList",
        templateUrl: 'addList/addList.html',
        controller: 'AddListCtrl'
    });
})

.controller('AddListCtrl', ['$scope', '$state', '$firebaseObject', 'CommonProp', function($scope, $state, $firebaseObject, CommonProp) {

  if(!CommonProp.getUser()){
    $state.go('login');
  }


  $scope.addList = function() {
    var title = $scope.list.title;
    var description = $scope.list.description;
    var emailId = CommonProp.getUser();
    var ref = new Firebase("https://art-app.firebaseio.com");
    var listsRef = ref.child("lists");

    listsRef.push().set({
      title: title,
      description: description,
      emailId: emailId
    },
    function(error) {
      if (error) {
        console.log("Error:", error);
      } else {
        $state.go('welcome');
        console.log("List set successfully!");
      }
    });
  }

  $scope.logout = function(){
      CommonProp.logoutUser();
  }

}]);
