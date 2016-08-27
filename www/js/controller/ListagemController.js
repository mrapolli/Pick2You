angular.module('starter')
.controller('ListagemController',function($scope, $location, $rootScope, Scopes, FotoEscolhida, $http, $ionicLoading, $ionicPopup){

  Scopes.store('ListagemController', $scope);
  $scope.listCanSwipe = true
  $scope.addNew = false;

  $scope.voltaListagem = function() {
    Scopes.get('MainController').fotos = [];
    Scopes.get('MainController').vizualiza = [{}];
    Scopes.get('MainController').showTakePick = true;
    $location.path('/main')
  }

  $scope.enviar = function(){

    $ionicLoading.show({
      template: 'Enviando sua imagem'
    }).then(function(){
      $http.post('http://192.168.0.111:8081/persist', {'ola' : $scope.listaFotos[0].fotos[0]}).then(function() {
        console.log("sucesso");
        $ionicLoading.hide().then(function() {
          $ionicPopup.alert({
            title: 'Sucesso',
            template: 'Foto Enviada'
          });
        })
      }, function() {
        console.log('erro');
        $ionicLoading.hide().then(function() {
          $ionicPopup.alert({
            title: 'Erro',
            template: 'Erro ao enviar foto'
          });
        })
      });
      console.log('foi');
    })


  }

  $scope.enviarEscolhada = function(index) {

    var $fotoEscolhidaScope = Scopes.get('FotoController');
    console.log($fotoEscolhidaScope);
    if($fotoEscolhidaScope) {
        $fotoEscolhidaScope.fotos= $scope.listaFotos[index].fotos;
        $fotoEscolhidaScope.vizualizaFotos = $scope.listaFotos[index].palavras;
    }

    FotoEscolhida.store($scope.listaFotos[index]);
    $location.path('/fotoEscolhida');
  }
})
