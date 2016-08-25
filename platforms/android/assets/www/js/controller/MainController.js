angular.module('starter').controller('MainController', ['$scope', '$rootScope',  '$location' ,'$q', '$ionicLoading', 'Scopes', '$ionicPopup',
 function($scope,  $rootScope , $location ,  $q, $ionicLoading, Scopes, $ionicPopup) {
  Scopes.store('MainController', $scope);

  $scope.vizualiza = [{'nome' : '', 'valor' : ''}]
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

     if($scope.fotos.length == 0) {
       var alertPopup = $ionicPopup.alert({
         title: 'Erro',
         template: 'Tire uma foto Vacilonidus'
       });
       return;
     }

     if($scope.vizualiza.length == 0) {
       var alertPopup = $ionicPopup.alert({
         title: 'Erro',
         template: 'Ao menos uma palavra'
       });
       return;
     }

     var popup = false;
     for(var i = 0; i < $scope.vizualiza.length; i++) {
         var item = $scope.vizualiza[i];

         console.log(item);
         console.log(item.nome);

         if(item.nome == '') {
             console.log('não entrei?')
             popup = true;
         }
         if(item.valor == '') {
             popup = true;
         }
     }

     if(popup) {
         var alertPopup = $ionicPopup.alert({
           title: 'Erro',
           template: 'Nada em branco'
         });
         return;
     }

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
      var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
      var physicalScreenHeight = window.screen.height * window.devicePixelRatio;

    }, function(err) {
      console.log(err);
    });
  }


  $scope.adicionaLinha = function() {
    $scope.vizualiza.unshift({'nome' : '', 'valor' : ''});
  };
}]);
