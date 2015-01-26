todoControllers.controller('LoginCrtl', ['$scope','$rootScope','$cookies',function ($scope,$rootScope,$cookies) {
    $scope.msg={error:""};
    $scope.resizing_=function(){
        var colors=['#ffa800','#00a800','#ffff00'];
        var loginContainer = $('.login-container');
        //loginContainer.height(window.innerHeight*0.6);
        loginContainer.css('top',(window.innerHeight-$('.menu').height()-loginContainer.height())/2);
        //var divs=loginContainer.find('div');
        //divs.height(loginContainer.height()/3);
        //var i =0;
        //divs.each(function(){
        //    $(this).css('background',colors[i]);
        //    i++;
        //});
    };
    $scope.resizing_();
    $( window ).resize(function() {$scope.resizing_();});


    var login=function(user){
        fb.authWithPassword({
            email: user.name+'@denny.com',
            password: user.pwd
        }, function(error, authData) {
            if (error) {
                switch (error.code) {
                    case "INVALID_PASSWORD":
                        $scope.msg.error="Password is invalid or username is already in use.";
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
                        $scope.msg.error="The new user account cannot be created because the username is already in use.";
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

