angular.module('app',[])
	.controller('adminBookViewController',function($scope,$http){
		
		//Controller variables.
		var viewBook = JSON.parse(localStorage.getItem('viewBook'));
		var seeReviewsBtn = document.getElementById("collapseReviewBtn");
		var noReviewsLabel = document.getElementById("noReviewsLab");

		//HTML scope variables.
		$scope.bookname = viewBook.Name;
		$scope.bookauthor = viewBook.Author;
		$scope.bookcover = viewBook.Photo;
		$scope.bookdesc = viewBook.Description;
		$scope.bookcomments = viewBook.Comments;
		$scope.bookprice = viewBook.Price;
		$scope.Likes = viewBook.Likes;
		$scope.likesNum = viewBook.LikesNum;
		
		//Check whether there are comments or not to show or hide the relevant data.
		if($scope.bookcomments.length == 0){
			seeReviewsBtn.style.display = "none";
		}else{
			seeReviewsBtn.style.display = "block";
			noReviewsLabel.style.display = "none";
		}
		
		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});

		//Get the admin's unreplied messages to check how many are unread in order to initialize navigation bar messages.
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet")
		   .then(
		       function(response){
		    	   $scope.UnrepliedMessages = response.data.Messages;
		    	   var unread = 0;
		    	   for(var i = 0; i < $scope.UnrepliedMessages.length ; i++){
		    		   if($scope.UnrepliedMessages[i].adminread == 0){
		    			   unread++;
		    		   }
		    	   }
		    	   $scope.unread = unread;
		    	   if($scope.unread != 0){
		    		   document.getElementById("TabMessages").innerHTML = "Messages (" + $scope.unread + ")";
		    	   }
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		//Sign out and end session.
		$scope.SignOutFunc = function(){
			$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
			   .then(
			       function(response){
			       }, 
			       function(response){
			       }
			    );
		}
		
		//Get date format from timestamp.
		$scope.GetDateFormat = function(CommentDateTime){
			var date = CommentDateTime.split(' ')[0];
 		   var time = CommentDateTime.split(' ')[1].split(":")[0] + ":" + CommentDateTime.split(' ')[1].split(":")[1];
 		   return date + ' at ' + time;
		}
		 
		//Once user clicks on comment image or name, or click on like nickname, he'll be redirected to the user's page.
		$scope.viewUser = function(user){
			var dataQuery = {
				    Username: user
			}
			$.ajax({
				url: "http://localhost:8080/BooksForAll/UserServlet",
				type: "POST", //send it through get method
				dataType: 'json',
			    data: JSON.stringify(dataQuery),
			    success: function(response) {
			    if(response.Result == "Success"){
				localStorage.setItem("ChosenUser", JSON.stringify(response.User));
							  window.location = "AdminUserView.html";
						  }

					  },
					  error: function(xhr) {
					    //Do Something to handle error
					  }
					});
			}
});

