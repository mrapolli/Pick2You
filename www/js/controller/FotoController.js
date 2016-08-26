angular.module('starter')
.controller('FotoController', function($scope, $stateParams, $location, $rootScope, Scopes, FotoEscolhida){

  $scope.data={};
  $scope.fotos= FotoEscolhida.get().fotos;
  $scope.vizualizaFotos = FotoEscolhida.get().palavras;
  Scopes.store('FotoController', $scope, FotoEscolhida, $location);

  $scope.adicionaLinha = function() {
    $scope.vizualizaFotos.unshift({valor : ''});
  }

  $scope.voltaListagem = function() {

    console.log('que merda é essa');
    Scopes.get('MainController').fotos = [];
    Scopes.get('MainController').vizualiza = [{}];
    Scopes.get('MainController').showTakePick = true;
    $location.path('/main')
  }

  $scope.goImagem = function(img) {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', "initial-scale=1, maximum-scale=4, minimum-scale=0.1, user-scalable=yes, width=device-width");
    FotoEscolhida.store(img)
    $location.path('/foto');
  }

});
