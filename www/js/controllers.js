angular.module('starter')
.controller('ListagemController',function($scope, $location, $rootScope){

$scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true
 
	$scope.listaDeFotos=
	[
		{"nome" : "Carla" , "listaPalavras" :[{"valor":"111111", "label" : "Cpf"}, {"valor":"27852056800", "label" : "RG"}]},
		{"nome" : "Foto2" , "listaPalavras" :[{"valor":"111111", "label" : "Cpf"}, {"valor":"27852056800", "label" : "RG"}]}
	];


	$scope.mudaRota = function(index){
     $rootScope.fotoEscolhida= $scope.listaDeFotos[index];
     $location.path("/fotoEscolhida");

     };


});

angular.module('starter').controller('FotoController', function($scope, $stateParams , $rootScope){

  	$scope.data={};
	$scope.fotoEscolhida = $rootScope.fotoEscolhida;
	
	$scope.adicionar = function(){

      $scope.fotoEscolhida.listaPalavras.push({valor : $scope.data.nome, label: $scope.data.palavra})
      $scope.data.nome="";
	  $scope.data.palavra="";
     };

});



angular.module('starter').controller('MainController', ['$scope', '$q', '$ionicLoading', function($scope, $q, $ionicLoading) {

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

   $scope.enviar = function() {
     $ionicLoading.show({
        template: 'Relaxe, processando sua solicitação'
     })
       setTimeout(function(){
          $ionicLoading.hide().then(function() {
              $scope.vizualiza = [{"valor" : ''}]
              $scope.fotos = [];
          })
       }, 3000);

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
      $scope.vizualiza.push({valor : ''});
  };

}]);
