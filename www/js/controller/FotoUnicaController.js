angular.module('starter')
.controller('FotoUnicaController', function($scope, $stateParams, $location, $rootScope, Scopes, FotoEscolhida){
  $scope.goHome = function() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', "initial-scale=1, maximum-scale=4, minimum-scale=0.1, user-scalable=no, width=device-width");
    $location.path('/main')
  }

  $scope.voltaListagem = function() {
    console.log('que merda é essa');
    Scopes.get('MainController').fotos = [];
    Scopes.get('MainController').vizualiza = [{}];
    Scopes.get('MainController').showTakePick = true;
    $location.path('/main')
  }

  $scope.goGaleria = function() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', "initial-scale=1, maximum-scale=4, minimum-scale=0.1, user-scalable=no, width=device-width");
    $location.path('/listagem');
  }

  $scope.data = {};
  $scope.data.foto = FotoEscolhida.get();
})
