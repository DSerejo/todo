/**
 * Created by dserejo on 1/21/2015.
 */

fb = new Firebase("https://intense-fire-6623.firebaseio.com");

var todoApp = angular.module('todoApp', ['todoControllers','ngRoute',"firebase"]);
todoApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginPageCtrl'
            }).
            when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }).
            otherwise({
                redirectTo: '/login'
            });

    }]);


