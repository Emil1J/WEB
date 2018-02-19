angular.module('app',[])
	.controller('myAccountController',['$scope','$http', function($scope,$http){
		var user =  JSON.parse(localStorage.getItem('loginResponse'));
		$scope.user = user;
  	   	$http.post("http://localhost:8080/BooksForAll/UserBooksServlet?Username=" + user.username)
  	   		.then(
  	   			function(response){
  	   				localStorage.setItem('userBooks', JSON.stringify(response.data.BookList));
  	   				$scope.books = response.data.BookList;
  	   				user.books = $scope.books;
  	   				localStorage.setItem('loginResponse', JSON.stringify(user));
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
						return "../../Images/Liked.png";
					}
				}
			}
			return "../../Images/Like.png";
		}
			
		$scope.LikeBook = function(book){
			var queryData = {
					Username : user.username,
					Bookname : book.Name
				};
			var query = "LikeBookServlet";
		   	if(document.getElementById(book.Name).src.endsWith("Liked.png")){
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
				    	   if(document.getElementById(book.Name).src.endsWith("Liked.png")){
								document.getElementById(book.Name).src = "../../Images/Like.png";
				    	   }
				    	   else{
				    		   document.getElementById(book.Name).src = "../../Images/Liked.png"
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

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks the button, open the modal 
		$scope.MyButtonFunc = function(book) {
			localStorage.setItem('ChosenBook', JSON.stringify(book));
			var modal = document.getElementById('myModal');
		    modal.style.display = "block";
		}

		// When the user clicks on <span> (x), close the modal
		$scope.MyModalFunc = function() {
			var modal = document.getElementById('myModal');
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('myModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
		
		$scope.OpenBook = function(scroll){
			var book = JSON.parse(localStorage.getItem('ChosenBook'));
			localStorage.setItem('ScrollBook', scroll);
			window.location = book.URL;
		}
	}]);

