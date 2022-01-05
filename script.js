angular.module("marvelApi", []);
angular.module("marvelApi").controller("marvelApiCtrl", function ($scope, $http) {

  // Arrys utilizados nas funções
  $scope.itensQuadrinhos = []
  $scope.quadrinhosArray = []
  $scope.quadrinhosInfo = []

  $scope.imagePath = 'assets/angular-material-assets/img/washedout.png';
  $scope.heroiId;
  $scope.mostrarLimparQuadrinhos = false
  $scope.naoEncontrado = true
  $scope.app = "Marvel Api";

  $scope.pesquisarHeroi = function (heroi) {
    if (heroi == undefined) return

    heroiName = '&name=' + heroi.nome;
    const apiKey = '&apikey=e310420c2c151aed139b9a85d557f030';
    const hash = '&hash=c68771660709d8e5655903aba47eab3cedef9768';
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?';

    $http.get(baseUrl + heroiName + apiKey + hash).then(function (response) {

      if (response.data.data.total) {
      } else {
        $scope.naoEncontrado = false;
      }
      response.data.data.results.forEach((element) => {

        element.id != $scope.heroiId ? $scope.limparQuadrinhos() : '';

        $scope.heroiId = element.id
        $scope.naoEncontrado = true;
        $scope.heroiName = element.name
        $scope.heroiDesc = element.description
        console.log(element, '-----element----');

        if (element.thumbnail.path != 'IMAGE_NOT_AVAIL' & element.thumbnail.extension != 'IMAGE_NOT_AVAIL') {
          $scope.heroiImg = element.thumbnail.path + '/portrait_xlarge' + '.' + element.thumbnail.extension
        } else { $scope.heroiImg = false }

      })

    }, function (err) {
      console.log(err);
    });
  };


  $scope.pesquisarQuadrinhos = function (quadrinhos) {

    const apiKey = '?apikey=e310420c2c151aed139b9a85d557f030';
    const hash = '&hash=c68771660709d8e5655903aba47eab3cedef9768';
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';

    $http.get(baseUrl + $scope.heroiId + apiKey + hash)
      .then(function (response) {

        // $scope.quadrinhosArray = response.data.data.results[0].series.items

        response.data.data.total ? '' : $scope.naoEncontrado = false;

        response.data.data.results.forEach((element) => {
          $scope.itensQuadrinhos.push(element)
          $scope._quadrinhos = element
          $scope.naoEncontrado = true;
          $scope.mostrarLimparQuadrinhos = true;
          $scope.quadrinhoDesc = element.description
          // $scope.quadrinhoImg = element.thumbnail.path + '/portrait_xlarge' + '.' + element.thumbnail.extension
        })

      }, function (err) {
        console.log(err);
      });

    $http.get(baseUrl + $scope.heroiId + '/comics' + apiKey + hash)
      .then((response) => {
        console.log(response, '----response quadrinhos----');
        response.data.data.results.forEach((element) => {
          console.log(element.title, '---- element----');

          $scope.quadrinhoImg = element.images
          // console.log($scope.quadrinhoImg, '---- $scope.quadrinhoImg DENTRO----');
          // console.log($scope.quadrinhoImg[0].path, '---- $scope.quadrinhoImg IMAGES----');
          // $scope.quadrinhoImg = element.title
          $scope.quadrinhoImg = {img: $scope.quadrinhoImg[0].path + '/portrait_xlarge' + '.' + $scope.quadrinhoImg[0].extension, title: element.title}
          $scope.quadrinhosInfo.push($scope.quadrinhoImg)

          console.log($scope.quadrinhosInfo, '---- IMAGES final----');
          // console.log($scope.quadrinhosInfo, '----$scope.quadrinhosInfo  DENTRO----');


        })
      }, err => {
        console.log(err);
      })
    // console.log($scope.quadrinhosInfo, '----$scope.quadrinhosInfo----');

    // $scope.quadrinhoImg.images.forEach((elementImg) => {

    // console.log($scope.quadrinhoImg.images ,'---- IMAGES final----');

    // })
    // console.log($scope.quadrinhoImgsponse,'---- $scope.quadrinhoImg FORA----');

  };


  $scope.limparInput = function (heroi) {
    heroi.nome = null
    $scope.heroiImg = null
    $scope.heroiName = null
    $scope.heroiDesc = null
    $scope.naoEncontrado = true;
    $scope.mostrarLimparQuadrinhos = false
  }
  $scope.limparQuadrinhos = function (heroi) {
    $scope.mostrarLimparQuadrinhos = false
  }

});



