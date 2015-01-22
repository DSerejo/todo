/**
 * Created by dserejo on 1/21/2015.
 */
var todoControllers = angular.module('todoControllers', ['ngCookies']);

todoControllers.controller('HomeCtrl', ['$scope', '$http','$rootScope',"$firebase","$cookies",
    function ($scope, $http,$rootScope,$firebase,$cookies) {
        $rootScope.uid=$rootScope.uid||$cookies.todoDSauth;
        if($rootScope.uid===undefined){
            window.location.href='#/login';
            return;
        }
        $scope.fbUrl = "https://intense-fire-6623.firebaseio.com/"+$rootScope.uid+"/tasks";
        var ref = new Firebase($scope.fbUrl);
        var tree=$firebase(ref);
        $scope.tasks = $firebase(ref).$asObject();

//        $scope.tasks = sync.$asArray();
//        for(var i in $scope.tasks){
//            var task = $scope.tasks[i];
//            task.sync=$firebase(ref.child(task.$id)).$asArray();
//        }
//        $scope.addTask = function(text,date,task) {
        var getNode = function(key,task){
            var node;
            if(task.urlParent===undefined){
                node =  new Firebase($scope.fbUrl+"/"+key+'/nodes');
            }else{
                node =  new Firebase(task.urlParent+"/nodes/"+key+'/nodes');
            }
            return $firebase(node);
        };
        $scope.addTask = function(key,data,task) {
            var url;
            if(task===undefined){
                url=$scope.fbUrl;
            }
            else{
                if(task.urlParent===undefined){
                    url=$scope.fbUrl+"/"+key+'/nodes';

                }else{
                    url =task.urlParent+"/"+key+'/nodes';
                }
            }
            var node =  new Firebase(url);
            node =  $firebase(node);
            var d = new Date(data.date);
            node.$asArray().$add({text:data.text,date: d.toISOString(),urlParent:url});
    };
        $scope.removeTask =function(key,task){
            var node;
            if(task.urlParent===undefined){
                node =  new Firebase($scope.fbUrl);
            }else{
                node =  new Firebase(task.urlParent);
                $firebase(node).$remove(key);
            }
        };

    }]);
//    .directive('myRepeatDirective', function() {
//        return function(scope, element, attrs) {
//            angular.element(element).css('color','blue');
//
//        };
//    });

todoControllers.controller('LoginPageCtrl', ['$scope','$rootScope', '$routeParams',
    function($scope,$rootScope, $routeParams) {
        //$rootScope.view="templates/login.html";
//        $scope.phoneId = $routeParams.phoneId;
    }]);
todoControllers.controller('Teste', ['$scope',function ($scope) {
    $scope.item = "";
}]);
todoControllers.controller('LoginCrtl', ['$scope','$rootScope','$cookies',function ($scope,$rootScope,$cookies) {
    $scope.msg={error:""};
    var login=function(user){
        fb.authWithPassword({
            email: user.name,
            password: user.pwd
        }, function(error, authData) {
            if (error) {
                switch (error.code) {
                    case "INVALID_PASSWORD":
                        $scope.msg.error="Password is invalid or email is already in use.";
                        break;
                    default:
                        createUser(user);
                }
            } else {
                $scope.msg.error="Authenticated successfully with payload:" + JSON.stringify(authData);
                $rootScope.uid=authData.uid;
                $cookies.todoDSauth=authData.uid;
                window.location.href='#/home';
            }
            $scope.$apply();
        });
    };
    var createUser=function(user){
        fb.createUser({
            email: user.name,
            password: user.pwd
        }, function(error) {
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        $scope.msg.error="The new user account cannot be created because the email is already in use.";
                        break;
                    case "INVALID_EMAIL":
                        $scope.msg.error="The specified email is not a valid email.";
                        break;
                    default:
                        $scope.msg.error="Error creating user:" + error;
                }
                $scope.$apply();
            } else {
                login(user);
            }
        });
    };
    $scope.login = function(user){
        login(user);
    };
}]);

