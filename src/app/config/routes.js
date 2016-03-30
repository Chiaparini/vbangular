angular.module('App')
	.config(['$stateProvider', '$urlRouterProvider' ,function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home',
			{
				url:'/',
				templateUrl: 'home.html',
				controller: 'MainController'
			})
			.state('second',
			{
				url:'/second',
				templateUrl: 'second.html',
				controller: 'SecondController'
			})
			.state('book-insert',
			{
				url:'/book',
				templateUrl: 'book-form.html',
				controller: 'BookController'
			});
	}])