angular.module('starter')
.controller('ListagemController',function($scope, $location, $rootScope, Scopes, FotoEscolhida){

  Scopes.store('ListagemController', $scope);
  $scope.listCanSwipe = true
  $scope.addNew = false;

  $scope.voltaListagem = function() {
    Scopes.get('MainController').fotos = [];
    Scopes.get('MainController').vizualiza = [{}];
    Scopes.get('MainController').showTakePick = true;
    $location.path('/main')
  }

  $scope.enviarEscolhada = function(index) {
    FotoEscolhida.store($scope.listaFotos[index]);
    $location.path('/fotoEscolhida');
  }
})
