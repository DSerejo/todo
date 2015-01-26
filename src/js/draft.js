/**
 * Created by Denny on 24/01/2015.
 */
//$scope.addTask = function(key,data,task) {
//    var url;
//    if(task===undefined){
//        url=$scope.fbUrl;
//    }
//    else{
//        if(task.urlParent===undefined){
//            url=$scope.fbUrl+"/"+key+'/nodes';
//
//        }else{
//            url =task.urlParent+"/"+key+'/nodes';
//        }
//    }
//    var node =  new Firebase(url);
//    node =  $firebase(node);
//    var d = new Date(data.date);
//    node.$asArray().$add({title:data.title,text:data.text,date: d.toISOString(),urlParent:url});
//};
//$scope.removeTask =function(key,task){
//    var node;
//    if(task.urlParent===undefined){
//        node =  new Firebase($scope.fbUrl);
//    }else{
//        node =  new Firebase(task.urlParent);
//        $firebase(node).$remove(key);
//    }
//};