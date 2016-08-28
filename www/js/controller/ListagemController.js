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


  $scope.enviar = function(){



    $ionicLoading.show({
      template: 'Enviando sua imagem'
    }).then(function(){

      var imagem = new Image();
      imagem.src = $scope.listaFotos[0].fotos[0].realImage;

      var c = document.createElement('canvas');
      var ctx = c.getContext("2d");

     var imgWidth  = imagem.width;
     var imgHeight = imagem.height;


     c.width   = imgWidth;
     c.height  = imgHeight;

     ctx.width  = imgWidth;
     ctx.height = imgHeight;

     imagem.setAttribute('crossOrigin', '');
     //ctx.drawImage(imagem, 0, 0, imgWidth, imgHeight);
     ctx.drawImage(imagem, 0, 0, imgWidth, imgHeight);

     //ctx.putImageData($scope.contrastImage(ctx.getImageData(0, 0, imgWidth, imgHeight), 70), 0,0);
     ctx.putImageData($scope.contrastImage(ctx.getImageData(0, 0, imgWidth, imgHeight), 70), 0,0);

     console.log('abdon',c.toDataURL("image/jpeg", 1))

      $http.post('http://192.168.0.10:8081/persist', {'ola' : c.toDataURL("image/jpeg", 0.5)}).then(function() {
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
