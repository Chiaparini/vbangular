angular.module('App')
	.factory('BookFactory', ['BookService', function(BookService){
		Book = {
			save: function(scope){
				BookService.save(scope).then(function(response){
				
				});
			}
		};

		return Book;
	}])