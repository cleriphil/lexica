'use strict';

angular.module('myApp.login', ['ui.router', 'firebase'])

// Declared route
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('login', {
    url: "/login",
    templateUrl: "login/login.html",
    controller: 'LoginCtrl'
    });
})

.controller('LoginCtrl', ['$scope','$state','CommonProp','$firebaseAuth',function($scope,$state,CommonProp,$firebaseAuth) {
    $scope.SignIn = function(event) {
      event.preventDefault();  // To prevent form refresh
      login.loading = true;
      var username = $scope.user.email;
      var password = $scope.user.password;
      loginObj.$authWithPassword({
        email: username,
        password: password
      })
    .then(function(user) {
      //Success callback
      console.log('Authentication successful');
      login.loading = false;
      CommonProp.setUser(user.password.email);
      $state.go('welcome');
    }, function(error) {
      //Failure callback
      login.loading = false;
      console.log('Authentication failure');
    });
  }
  var firebaseObj = new Firebase("https://lexica.firebaseio.com/");
  var loginObj = $firebaseAuth(firebaseObj);

  loginObj.$onAuth(function(authData) {
      if(authData){
          CommonProp.setUser(authData.password.email);
          $state.go('welcome');
      }
   });

  var login = {};
  $scope.login = login;
}])

.service('CommonProp', ['$state', '$firebaseAuth', function($state, $firebaseAuth) {
  var user = '';

  var firebaseObj = new Firebase("https://lexica.firebaseio.com/");
  var loginObj = $firebaseAuth(firebaseObj);

  return {
    getUser: function() {
      if(user == ''){
          user = localStorage.getItem('userEmail');
      }
      return user;
    },
    setUser: function(value) {
      localStorage.setItem("userEmail", value);
      user = value;
    },
    logoutUser:function(){
      loginObj.$unauth();
      user='';
      localStorage.removeItem('userEmail');
      $state.go('login');
    }
  };


}])

.directive('laddaLoading', [
  function() {
    return {
      link: function(scope, element, attrs) {
        var Ladda = window.Ladda;
        var ladda = Ladda.create(element[0]);
        // Watching login.loading for change
        scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
          // Based on the value start and stop the indicator
          if (newVal) {
              ladda.start();
          } else {
              ladda.stop();
          }
        });
      }
    };
  }
]);
