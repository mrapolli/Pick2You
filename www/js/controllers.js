angular.module('starter')
.controller('ListagemController',function($scope, $location, $rootScope, Scopes, FotoEscolhida){

 Scopes.store('ListagemController', $scope);


 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true
 $scope.addNew = false;



$scope.enviarEscolhada = function(index) {

    FotoEscolhida.store($scope.listaFotos[index]);
    $location.path('/fotoEscolhida');
}


 $scope.voltaListagem = function() {

    console.log('bidonmegale')
    Scopes.get('MainController').fotos = [];
    Scopes.get('MainController').vizualiza = [{}];
    console.log(Scopes.get('MainController'));



    $location.path('/main')

 }



}).controller('FotoUnicaController', function($scope, $stateParams, $location, $rootScope, Scopes, FotoEscolhida){

  $scope.goHome = function() {

    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', "initial-scale=1, maximum-scale=4, minimum-scale=0.1, user-scalable=no, width=device-width");


       $location.path('/main')
  }

  $scope.goGaleria = function() {

    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', "initial-scale=1, maximum-scale=4, minimum-scale=0.1, user-scalable=no, width=device-width");



       $location.path('/listagem');
  }


    $scope.data = {};
    $scope.data.foto = FotoEscolhida.get();


}).controller('FotoController', function($scope, $stateParams, $location, $rootScope, Scopes, FotoEscolhida){

$scope.adicionaLinha = function() {
    $scope.vizualizaFotos.unshift({valor : ''});
}


 Scopes.store('FotoController', $scope, FotoEscolhida, $location);





 $scope.goImagem = function(img) {

    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', "initial-scale=1, maximum-scale=4, minimum-scale=0.1, user-scalable=yes, width=device-width");

     FotoEscolhida.store(img)
     $location.path('/foto');
 }

  $scope.data={};
  $scope.fotos= FotoEscolhida.get().fotos;
  $scope.vizualizaFotos = FotoEscolhida.get().palavras;

});



angular.module('starter').controller('MainController', ['$scope', '$rootScope',  '$location' ,'$q', '$ionicLoading', 'Scopes', function($scope,  $rootScope , $location ,  $q, $ionicLoading, Scopes) {
  Scopes.store('MainController', $scope);
  $scope.vizualiza = [{"valor" : ''}]
  $scope.fotos = [];
  $scope.shouldShowDelete = false;
  $scope.shouldShowDeleteImage = false;



   $scope.habilitaDeleteImagem = function(){
     $scope.shouldShowDeleteImage = !$scope.shouldShowDeleteImage;
   }

   $scope.cordovaCamera = function(options) {
     var q = $q.defer();

     navigator.camera.getPicture(function(result) {
        q.resolve(result);
     }, function(err) {
        q.reject(err);
     }, options);

     return q.promise;
   }

   $scope.habilitaDelete = function() {
      $scope.shouldShowDelete = !$scope.shouldShowDelete;
   }

   $scope.removeText = function(valor) {
     $scope.vizualiza.splice(valor, 1);
   }

   $scope.removeFoto = function(valor) {
     $scope.fotos.splice(valor, 1);
   }

   $scope.enviar = function(index) {


    var listagemScope = Scopes.get('ListagemController')

    if(!listagemScope.listaFotos) {
      listagemScope.listaFotos = [];
    }

    listagemScope.listaFotos.push({palavras : $scope.vizualiza, fotos : $scope.fotos});




    console.log("abacate auzl", listagemScope.vizualizaFotos)

    $location.path("/listagem");
   }

   $scope.send = function() {
     $ionicLoading.show({
        template: 'OK, i got it'
     })

     setTimeout(function(){
        $ionicLoading.hide().then(function() {

        })
     }, 3000);
   }

  $scope.testando = function() {
      $ionicLoading.hide();
  }

  $scope.takePicture = function(){

    var options = {
        quality: 90,
        correctOrientation : true,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        allowEdit: true,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

     $scope.cordovaCamera(options).then(function(imageData) {
          $scope.fotos.push({"src" : "data:image/jpeg;base64," + imageData})
          var imagem = new Image();
          imagem.src = "data:image/jpeg;base64," + imageData;
          console.log('imagem.width',  imagem.width);
          console.log('imagem.height', imagem.height);

          var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
          var physicalScreenHeight = window.screen.height * window.devicePixelRatio;

          console.log('window.screen.width',   window.screen.width);
          console.log('window.screen.height',  window.screen.height);

          console.log('physicalScreenWidth', physicalScreenWidth)
          console.log('physicalScreenHeight', physicalScreenHeight)

          /*$ionicLoading.show({
             template: 'Relaxe, processando sua solicitação'
          })*/
     }, function(err) {
          console.log(err);
     });

  }

  $scope.adicionaLinha = function() {
      $scope.vizualiza.unshift({valor : ''});
  };

}]);



angular.module('starter').factory('Scopes', function ($rootScope) {

    var mem = {};

    return {

        store: function (key, value) {
            console.log(key)
            mem[key] = value;
        },

        get: function (key) {
            return mem[key];
        }
    };
});





angular.module('starter').factory('FotoEscolhida', function ($rootScope) {

    var mem = {};

    return {

        store: function (value) {
            mem[0] = value;
        },

        get: function () {
            return mem[0];
        }
    };
});
