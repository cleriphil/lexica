'use strict';

angular.module('myApp.welcome', ['ui.router', 'firebase'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('welcome', {
    url: "/welcome",
    templateUrl: 'welcome/welcome.html',
    controller: 'WelcomeCtrl'
  });
})

.controller('WelcomeCtrl', ['$scope','CommonProp', '$firebaseArray', '$firebaseObject', function($scope, CommonProp, $firebaseArray, $firebaseObject ) {
  $scope.username = CommonProp.getUser();
  var ref = new Firebase("https://lexica.firebaseio.com/");
  $scope.lists = $firebaseArray(ref);



  $scope.editList = function(id) {
    var ref = new Firebase("https://lexica.firebaseio.com/" + id);
    $scope.listToUpdate = $firebaseObject(ref);
    $('#editModal').modal();
  }

  $scope.update = function() {
    console.log($scope.listToUpdate.$id);
    var fb = new Firebase("https://lexica.firebaseio.com/" + $scope.listToUpdate.$id);
    var list = $firebaseObject(fb);

    fb.update({
        title: $scope.listToUpdate.title,
        description: $scope.listToUpdate.description,
        emailId: $scope.listToUpdate.emailId
    },
    function(error) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("List updated successfully!");
        $('#editModal').modal('hide');
      }
    });
  };

  $scope.confirmDelete = function(id) {
    var fb = new Firebase("https://lexica.firebaseio.com/" + id);
    var list = $firebaseObject(fb);
    $scope.listToDelete = list;
    $('#deleteModal').modal();
  }

  $scope.deleteList = function() {
    var fb = new Firebase("https://lexica.firebaseio.com/" + $scope.listToDelete.$id);
    var list = $firebaseObject(fb);
    list.$remove()
    .then(function(ref) {
        $('#deleteModal').modal('hide');
    }, function(error) {
        console.log("Error:", error);
    });
  }

  $scope.logout = function(){
    CommonProp.logoutUser();
  }

}]);
