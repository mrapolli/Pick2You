angular.module('starter').controller('MainController', ['$scope', '$rootScope',  '$location' ,'$q', '$ionicLoading', 'Scopes', '$ionicPopup',
 function($scope,  $rootScope , $location ,  $q, $ionicLoading, Scopes, $ionicPopup) {
  Scopes.store('MainController', $scope);

  $scope.vizualiza = [{'nome' : '', 'valor' : ''}]
  $scope.fotos = [];
  $scope.shouldShowDelete = false;
  $scope.shouldShowDeleteImage = false;
  $scope.showTakePick = true;

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


  $scope.removeText = function(valor) {
    $scope.vizualiza.splice(valor, 1);
  }

  $scope.removeFoto = function(valor) {
    $scope.fotos.splice(valor, 1);
  }

  $scope.enviar = function(index) {
/*
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

      if(item.nome.trim() == '') {
        popup = true;
      }
      if(item.valor.trim() == '') {
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
*/
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

  $scope.goGaleria = function() {

    var listagemScope = Scopes.get('ListagemController')

    if(!listagemScope.listaFotos) {
      $ionicPopup.alert({
        title: 'Erro',
        template: 'Galeria Vazia jão'
      });
      return;
    }
    $location.path('/listagem')

  }

  $scope.takePicture = function(){

    var options = {
      quality: 25,
      correctOrientation : true,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: true,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };


    $scope.cordovaCamera(options).then(function(imageData) {

      $scope.showTakePick = false;

      var imagem = new Image();
      imagem.src = "data:image/jpeg;base64," + imageData;


      var c = document.createElement('canvas');
      var ctx = c.getContext("2d");

     var imgWidth  = imagem.width;
     var imgHeight = imagem.height;

     c.width   = imgWidth;
     c.height  = imgHeight;

     ctx.width  = imgWidth;
     ctx.height = imgHeight;


     imagem.setAttribute('crossOrigin', '');
     ctx.drawImage(imagem, 0, 0, imgWidth, imgHeight);

     ctx.putImageData($scope.contrastImage(ctx.getImageData(0, 0, imgWidth, imgHeight), 70), 0,0);
     $scope.fotos.push({"src" : c.toDataURL("image/jpeg", 0.5)});


    }, function(err) {
      console.log(err);
    });
  }



  $scope.contrastImage = function(imageData, contrast) {
     var data = imageData.data;
     var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

     for(var i=0;i<data.length;i+=4)
     {
         data[i] = factor * (data[i] - 128) + 128;
         data[i+1] = factor * (data[i+1] - 128) + 128;
         data[i+2] = factor * (data[i+2] - 128) + 128;
     }
     return imageData;
   }





  $scope.adicionaLinha = function() {
    $scope.vizualiza.unshift({'nome' : '', 'valor' : ''});
  };
}]);
