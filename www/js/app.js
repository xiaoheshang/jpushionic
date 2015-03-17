// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var jpushdemo=angular.module('starter', ['ionic']);

jpushdemo.run(function($ionicPlatform,$state,jpushService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }



    //推送初始化
    var setTagsWithAliasCallback=function(event){
      window.alert('result code:'+event.resultCode+' tags:'+event.tags+' alias:'+event.alias);
    }
    var openNotificationInAndroidCallback=function(data){
      var json=data;
      window.alert(json);
      if(typeof data === 'string'){
        json=JSON.parse(data);
      }
      var id=json.extras['cn.jpush.android.EXTRA'].id;
      //window.alert(id);
      $state.go('detail',{id:id});
    }
    var config={
      stac:setTagsWithAliasCallback,
      oniac:openNotificationInAndroidCallback
    };
    
    jpushService.init(config);

    //启动极光推送服务
    //window.plugins.jPushPlugin.init();
    //window.plugins.jPushPlugin.setDebugMode(true);
  });

  window.onerror = function(msg, url, line) {  
   var idx = url.lastIndexOf("/");  
   if(idx > -1) {  
    url = url.substring(idx+1);  
   }  
   alert("ERROR in " + url + " (line #" + line + "): " + msg);  
   return false;  
  };
})

jpushdemo.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  $stateProvider.state('main',{
    url:'/main?url',
    views:{
      'mainContainer':{
        templateUrl: "templates/main.html",
        controller:'mainCtrl'
      }
    }
  }).state('list',{
    url:'/list',
    views:{
      'mainContainer':{
        templateUrl:'templates/list.html',
        controller:'listCtrl'
      }
    }
  }).state('detail',{
    url:'/detail?id',
    views:{
      'mainContainer':{
        templateUrl:'templates/detail.html',
        controller:'detailCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/main')
}])
