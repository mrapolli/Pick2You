// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {

    console.log("ESTOU PASSANDO POR AKI MEU POVO  ")

    $ionicPlatform.registerBackButtonAction(function () {

    var confirmPopup = $ionicPopup.confirm({
        title: 'Saida',
        template: 'Tem certeza que deseja sair da aplicação?'
    });

   confirmPopup.then(function(res) {
     if(res) {
        navigator.app.exitApp();
     }
   });


      return false;


    }, 100);


    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
