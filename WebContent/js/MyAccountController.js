angular.module('app',[])
	.controller('myAccountController',['$scope','$http', function($scope,$http){
		var user =  JSON.parse(localStorage.getItem('loginResponse'));
		$scope.user = user;
  	   	$http.post("http://localhost:8080/BooksForAll/UserBooksServlet?Username=" + user.username)
  	   		.then(
  	   			function(response){
  	   				localStorage.setItem('userBooks', JSON.stringify(response.data.BookList));
  	   				$scope.books = response.data.BookList;
  	   			}, 
  	   			function(response){
  	   				// failure callback
  	   			}
	    );
		$scope.GetLikes = function(likes){
			var likeNames = "";
			var arrayLength = likes.length;
			for (var i = 0; i < arrayLength; i++) {
				var obj = likes[i];
				likeNames = likeNames + obj.username + "\n";
			}
			return likeNames;
		}
		
		function GetLikes(likes){
			var likeNames = "";
			var arrayLength = likes.length;
			for (var i = 0; i < arrayLength; i++) {
				var obj = likes[i];
				likeNames = likeNames + obj.username + "\n";
			}
			return likeNames;
		}
		
		$scope.LikeLogo = function(bookname){
			var booksLength = $scope.books.length;
			for (var i = 0; i < booksLength ; i++){
				var likesLength = $scope.books[i].Likes.length;
				for (var j = 0 ; j < likesLength ; j++){
					var like = $scope.books[i].Likes[j];
					if(like.bookname == bookname && like.username == user.username){
						return "./Images/Liked.png";
					}
				}
			}
			return "./Images/Like.png";
		}
			
		$scope.LikeBook = function(book){
			var queryData = {
					Username : user.username,
					Bookname : book.Name
				};
			var query = "LikeBookServlet";
		   	if(document.getElementById(book.Name).src.endsWith("/Images/Liked.png")){
				query = "DislikeBookServlet";
		   	}
			
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/" + query + "?",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: {
				    Username: user.username, 
				    Bookname: book.Name
				  },
				  success: function(response) {
					  if(response.Result == "Success"){
				    	   if(document.getElementById(book.Name).src.endsWith("/Images/Liked.png")){
								document.getElementById(book.Name).src = "./Images/Like.png";
				    	   }
				    	   else{
				    		   document.getElementById(book.Name).src = "./Images/Liked.png"
				    	   }
				    	   for(var i = 0 ; i < $scope.books.length ; i++){
				    		   if(response.Book.Name == $scope.books[i].Name){
				    			   $scope.books[i] = response.Book;
				    			   document.getElementById('LikeNum' + response.Book.Name).innerHTML = "*Liked by " + $scope.books[i].LikesNum;
				    			   document.getElementById('LikeNum' + response.Book.Name).title = GetLikes(response.Book.Likes);
				    			   localStorage.setItem('userBooks', JSON.stringify($scope.books));
				    			   break;
				    		   }
				    	   }
					  }else{
					  }
				},
					  error: function(xhr) {
					    //Do Something to handle error
					  }
					});
			}
		
		$scope.BookURL = function(book){
 			localStorage.setItem('SelectedForReadingBook', JSON.stringify(book));
			return book.URL;
		}
	}]);

