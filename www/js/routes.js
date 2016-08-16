angular.module('starter')
.config(function($stateProvider,$urlRouterProvider){


 //$urlRouterProvider.otherwise('listagem'); 

$urlRouterProvider.otherwise('main'); 

$stateProvider

.state('listagem',{
	url:'/listagem',
	templateUrl : 'Templates/listagem.html',
	controler : 'ListagemController'
})



.state('scroll=""', {
	url:'/fotoEscolhida',
	templateUrl : 'Templates/fotoEscolhida.html',
	controller : 'FotoController'
})

.state('main',{
	url:'/main',
	templateUrl : 'Templates/main.html',
	controler : 'MainController'
})

});