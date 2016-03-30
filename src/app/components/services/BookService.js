angular.module('App')
	.service('BookService', ['$http', function($http){
		var save = function(scope){
			return $http.post('http://localhost:8888/api/book', JSON.stringify(scope));
		}
		return{
			save: save
		};
	}])