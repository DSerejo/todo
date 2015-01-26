/**
 * Created by dserejo on 1/21/2015.
 */
var postitColors=[
        {class:"grasshopper",name:"Grasshopper",color:"b8f397"},
        {class:"summersky",name:"Summer Sky",color:"85c7fd"},
        {class:"postit",name:"Post-it",color:"fef495"},
        {class:"pinkwine",name:"Pink Wine",color:"fd8b96"},
        {class:"cloudymorning",name:"Couldy Morning",color:"f1f1f0"},
        {class:"charcoal",name:"Charcoal",color:"5c5c5c"},
        {class:"fourhundredtwenty",name:"420",color:"a9ed83"},
        {class:"wintersky",name:"Winter Sky",color:"70baf7"},
        {class:"beer",name:"Beer",color:"f9ec80"},
        {class:"brickwall",name:"Brick Wall",color:"f77681"},
        {class:"smokey",name:"Smokey",color:"e9e9e8"},
        {class:"blackgranit",name:"Black Granit",color:"404040"},
        {class:"stpatrick",name:"St.Patrick",color:"98d575"},
        {class:"mediterranean",name:"Mediterranean",color:"63a8df"},
        {class:"sandstorm",name:"Sand Storm",color:"e0d673"},
        {class:"redlightdistrict",name:"Redlight District",color:"cc6069"},
        {class:"nystreet",name:"NY Street",color:"c0c0bf"},
        {class:"samourai",name:"Samouraï",color:"343434"},
    ];





var todoControllers = angular.module('todoControllers', ['ngCookies']);
todoControllers.controller('PostItCtrl',['$scope',function($scope){

}]);
todoControllers.filter('myFilter',function () {
    return function(items,checked){
        testelala = items;
        var filtered = {};
       // if(checked=="All"){
        //    return items;
        //}

        for(var k=0;k<items.length ;k++){
            var i=items[k];
            var c = i.checked||false;
            var key = i.$id;
            if(checked=="All"){

                filtered[key]=i;
            }
            if(checked=="Active"&&!c){
                filtered[key]=i;
            }
            if(checked=="Completed"&&c){
                filtered[key]=i;
            }
        }
        return filtered;



    };
});
todoControllers.controller('FiltrosCtrl',['$scope',function($scope){

}]);

var iniciaFiltro=function($scope){
    $scope.filters=[
        {
            'filterId': 0,
            'text': 'All'
        },
        {
            'filterId': 1,
            'text': 'Active'
        },
        {
            'filterId': 2,
            'text': 'Completed'
        },
        {    'filterId': 3,
            'text': 'Delayed'
        }
    ];

};
todoControllers.controller('HomeCtrl', ['$scope', '$http','$rootScope',"$firebase","$cookies",
    function ($scope, $http,$rootScope,$firebase,$cookies) {
        iniciaFiltro($scope);
        $scope.currentColor= {class:"postit",name:"Post-it",color:"fef495"};
        $scope.postitColors=postitColors;
        $rootScope.adding=false;
        $rootScope.newTask={
            text:"",
            title:""
        };
        $rootScope.filter={'filterId': 0,'text': 'All'};
        $rootScope.editing=false;
        $rootScope.c_Task={};
        $scope.fbbaseUrl = "https://intense-fire-6623.firebaseio.com/";
        var ref = new Firebase($scope.fbbaseUrl);
        var authData = ref.getAuth();
        if (authData) {
            $rootScope.uid = authData.uid;
        }
        if($rootScope.uid===undefined){
            window.location.href='#/login';
            return;
        }
        $scope.fbUrl = "https://intense-fire-6623.firebaseio.com/"+$rootScope.uid+"/tasks";
        ref = new Firebase($scope.fbUrl);
        var tree=$firebase(ref);
        $scope.tasksArray= $firebase(ref).$asArray();
        $scope.tasks = $firebase(ref).$asObject();
        $scope.selected = 0;
        $scope.select= function(index) {
            $scope.selected = index;
            $rootScope.filter.text = $scope.filters[index].text;
        };
        $scope.checkTask= function(key,task){
            task.checked=task.checked||false;
            task.checked=!task.checked;
            $scope.editTask(key,task);
        };
        $scope.editTask= function(key,task){
            $scope.tasks[key] = task;
            $scope.tasks.$save(key);
        };
        $scope.addTask = function(key,data,task) {
            var d = data.date===undefined?new Date(): new Date(data.date);
            data.date=d;
            $scope.tasksArray.$add(data);
            //$scope.tasks.$add();
        };
        $scope.currentTask = function(key,task){
            $rootScope.c_Task = {};
            $rootScope.c_Task.key=key;
            $rootScope.c_Task.task=task;
            $scope.c_Task={};
            $scope.c_Task.key=key;
            $scope.c_Task.task=task;
            if($rootScope.adding){
                $rootScope.adding=true;
                $rootScope.newTask.text=task.text;
                $rootScope.newTask.title=task.title;
                //$('[name="newTask"]').val(task.text);
                //$('[name="newTaskTitle"]').val(task.title);
            }
            //$scope.editTask(key,task);
        };
        $scope.removeCTask =function(){
            $scope.removeTask($scope.c_Task.key,$scope.c_Task.task);
        };
        $scope.removeTask =function(key,task){
            $scope.tasksArray.$remove($scope.tasksArray.$indexFor(key));
            $rootScope.c_Task={};
            $scope.c_Task={};
            //$scope.tasks.$remove(key);
        };
        $scope.countChars=function(newTask){
            //$scope.newTask=newTask;
            return 140-newTask.length;
        };
        $scope.countTitleChars=function(newTaskTitle){
            //$scope.newTaskTitle=newTaskTitle;
            return 30-newTaskTitle.length;
        };
        $scope.toggleTaskForm=function(key,task){
            if($rootScope.adding){
                $('#addTaskForm').css('transform','translate(0,-100%)');
            }else{
                $('#addTaskForm').css('transform','translate(0,0)');
            }
            $rootScope.adding=!$rootScope.adding;
            if(task!==undefined){
                $scope.currentTask(key,task);
                $rootScope.editing=true;
            }

        };
        $scope.submit=function(){
            var task={text: $rootScope.newTask.text,
                title:$rootScope.newTask.title,
                color:'#'+$scope.currentColor.color
            };
            if($rootScope.editing)
            {
                var t=$rootScope.c_Task.task;
                t.text=task.text;
                t.title=task.title;
                t.color=task.color;
                $scope.editTask($rootScope.c_Task.key,t);
            }
            else{
                $scope.addTask('',task);
            }

            $rootScope.editing=false;
            $scope.toggleTaskForm();
        };
        $scope.changeCurrentColor=function(color){
            $scope.currentColor=color;
            $('#addTaskForm').css('background','#'+color.color);
        };

    }]);
//    .directive('myRepeatDirective', function() {
//        return function(scope, element, attrs) {
//            angular.element(element).scss('color','blue');
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
