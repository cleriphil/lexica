'use strict';

angular.module('myApp', [
  'ui.router',
  'myApp.login',
  'myApp.register',
  'myApp.welcome',
  'myApp.addAuction',
  'firebase'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/welcome");
});


// add otherwise route?
