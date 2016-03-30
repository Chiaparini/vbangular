angular.module('App')
	.controller('BookController', ['$scope', 'BookFactory', function($scope, BookFactory){
		
		$scope.model = 
		{
			titulo: '',
			autor: '',
			editora: '',
			paginas: ''
		};

		$scope.save = function(book){
			BookFactory.save(book);
		};
}]);