/**
 * Created by dserejo on 1/21/2015.
 */
fb = new Firebase("https://intense-fire-6623.firebaseio.com");


var todoApp = angular.module('todoApp', []);
todoApp.controller('Teste', function ($scope) {
    $scope.item = "";
});
todoApp.controller('LoginCrtl', function ($scope) {
    $scope.msg={error:""};
    $scope.login = function(user){
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
            } else {
                console.log("User account created successfully!");
            }
        });
    };
});