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

    console.log('$scope.fotos', $scope.fotos);
    listagemScope.listaFotos.push({palavras : $scope.vizualiza, fotos : $scope.fotos});
    console.log("abacate auzl", listagemScope.vizualizaFotos)
    $location.path("/listagem");

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
      quality: 75,
      correctOrientation : true,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: true,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };


    $scope.cordovaCamera(options).then(function(imageData) {

      $ionicLoading.show({
        template: 'Enviando sua imagem'
      }).then(function(){
        $scope.showTakePick = false;
        var imagem = new Image();
        imagem.src = "data:image/jpeg;base64," + imageData;

        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");

       var imgWidth  = imagem.width;
       var imgHeight = imagem.height;

       var newHeight = (500 * imagem.height) / imagem.width;

       c.width   = 500;
       c.height  = newHeight;

       ctx.width  = 500;
       ctx.height = newHeight;

       imagem.setAttribute('crossOrigin', '');
       //ctx.drawImage(imagem, 0, 0, imgWidth, imgHeight);
       ctx.drawImage(imagem, 0, 0, 500, newHeight);

       //ctx.putImageData($scope.contrastImage(ctx.getImageData(0, 0, imgWidth, imgHeight), 70), 0,0);
       ctx.putImageData($scope.contrastImage(ctx.getImageData(0, 0, 500, newHeight), 70), 0,0);

       $scope.fotos.push({"src" : c.toDataURL("image/jpeg", 0.4), 'realImage' : "data:image/jpeg;base64," + imageData});
       $ionicLoading.hide();

      });


     /*$scope.fotos.push({"src" : "data:image/jpeg;base64," + imageData});*/

    }, function(err) {
      console.log(err);
    });
  }

  $scope.reduzirImagem = function(cv, scale) {
    if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
    var sqScale = scale * scale; // square scale = area of source pixel within target
    var sw = cv.width; // source image width
    var sh = cv.height; // source image height
    var tw = Math.floor(sw * scale); // target image width
    var th = Math.floor(sh * scale); // target image height
    var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
    var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
    var tX = 0, tY = 0; // rounded tx, ty
    var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
    // weight is weight of current source point within target.
    // next weight is weight of current source point within next target's point.
    var crossX = false; // does scaled px cross its current px right border ?
    var crossY = false; // does scaled px cross its current px bottom border ?
    var sBuffer = cv.getContext('2d').
    getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
    var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
    var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b
    /* untested !
    var sA = 0;  //source alpha  */

    for (sy = 0; sy < sh; sy++) {
        ty = sy * scale; // y src position within target
        tY = 0 | ty;     // rounded : target pixel's y
        yIndex = 3 * tY * tw;  // line index within target array
        crossY = (tY != (0 | ty + scale));
        if (crossY) { // if pixel is crossing botton target pixel
            wy = (tY + 1 - ty); // weight of point within target pixel
            nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
        }
        for (sx = 0; sx < sw; sx++, sIndex += 4) {
            tx = sx * scale; // x src position within target
            tX = 0 |  tx;    // rounded : target pixel's x
            tIndex = yIndex + tX * 3; // target pixel index within target array
            crossX = (tX != (0 | tx + scale));
            if (crossX) { // if pixel is crossing target pixel's right
                wx = (tX + 1 - tx); // weight of point within target pixel
                nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
            }
            sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
            sG = sBuffer[sIndex + 1];
            sB = sBuffer[sIndex + 2];

            /* !! untested : handling alpha !!
               sA = sBuffer[sIndex + 3];
               if (!sA) continue;
               if (sA != 0xFF) {
                   sR = (sR * sA) >> 8;  // or use /256 instead ??
                   sG = (sG * sA) >> 8;
                   sB = (sB * sA) >> 8;
               }
            */
            if (!crossX && !crossY) { // pixel does not cross
                // just add components weighted by squared scale.
                tBuffer[tIndex    ] += sR * sqScale;
                tBuffer[tIndex + 1] += sG * sqScale;
                tBuffer[tIndex + 2] += sB * sqScale;
            } else if (crossX && !crossY) { // cross on X only
                w = wx * scale;
                // add weighted component for current px
                tBuffer[tIndex    ] += sR * w;
                tBuffer[tIndex + 1] += sG * w;
                tBuffer[tIndex + 2] += sB * w;
                // add weighted component for next (tX+1) px
                nw = nwx * scale
                tBuffer[tIndex + 3] += sR * nw;
                tBuffer[tIndex + 4] += sG * nw;
                tBuffer[tIndex + 5] += sB * nw;
            } else if (crossY && !crossX) { // cross on Y only
                w = wy * scale;
                // add weighted component for current px
                tBuffer[tIndex    ] += sR * w;
                tBuffer[tIndex + 1] += sG * w;
                tBuffer[tIndex + 2] += sB * w;
                // add weighted component for next (tY+1) px
                nw = nwy * scale
                tBuffer[tIndex + 3 * tw    ] += sR * nw;
                tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                tBuffer[tIndex + 3 * tw + 2] += sB * nw;
            } else { // crosses both x and y : four target points involved
                // add weighted component for current px
                w = wx * wy;
                tBuffer[tIndex    ] += sR * w;
                tBuffer[tIndex + 1] += sG * w;
                tBuffer[tIndex + 2] += sB * w;
                // for tX + 1; tY px
                nw = nwx * wy;
                tBuffer[tIndex + 3] += sR * nw;
                tBuffer[tIndex + 4] += sG * nw;
                tBuffer[tIndex + 5] += sB * nw;
                // for tX ; tY + 1 px
                nw = wx * nwy;
                tBuffer[tIndex + 3 * tw    ] += sR * nw;
                tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                // for tX + 1 ; tY +1 px
                nw = nwx * nwy;
                tBuffer[tIndex + 3 * tw + 3] += sR * nw;
                tBuffer[tIndex + 3 * tw + 4] += sG * nw;
                tBuffer[tIndex + 3 * tw + 5] += sB * nw;
            }
        } // end for sx
    } // end for sy

    // create result canvas
    var resCV = document.createElement('canvas');
    resCV.width = tw;
    resCV.height = th;
    var resCtx = resCV.getContext('2d');
    var imgRes = resCtx.getImageData(0, 0, tw, th);
    var tByteBuffer = imgRes.data;
    // convert float32 array into a UInt8Clamped Array
    var pxIndex = 0; //
    for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
        tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
        tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
        tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
        tByteBuffer[tIndex + 3] = 255;
    }
    // writing result to canvas.
    resCtx.putImageData(imgRes, 0, 0);
    return resCV;
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
