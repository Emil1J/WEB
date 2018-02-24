angular.module('app',[])
	.controller('adminUserViewController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		$scope.user = JSON.parse(localStorage.getItem("ChosenUser"));
		var nobooks = document.getElementById('no-books');

		if($scope.user.books.length == 0){
			var table = document.getElementById('table-scroll');
			table.style.display = "none";
			nobooks.style.display = "block";
		}
		else{
			nobooks.style.display = "none";
		}
		
		$scope.unread = 0;
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet")
		   .then(
		       function(response){
		    	   var unread = 0;
		    	   $scope.UnrepliedMessages = response.data.Messages;
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
		
		$scope.SignOutFunc = function(){
			$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
			   .then(
			       function(response){
			       }, 
			       function(response){
			       }
			    );
		}
		$scope.UserClick = function(user) {
			localStorage.setItem('ChosenUser', JSON.stringify(user));
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
		
		$scope.DeleteUser = function(decision){
			if(decision == "No"){
				var modal = document.getElementById('myModal');
		        modal.style.display = "none";
		        return;
			}
			var user = JSON.parse(localStorage.getItem('ChosenUser'));
			var dataQuery = {
				    Username: user.username
			}
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/RemoveUserServlet",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: JSON.stringify(dataQuery),
				  success: function(response) {
					  
				},
					  error: function(xhr) {
					    //Do Something to handle error
					  }
					});

			window.location = "AdminUsers.html";
		}
		
		$scope.CheckIfLikes = function(username, book){
			for(var i = 0; i < book.Likes.length ; i++){
				if(username == book.Likes[i].username){
					return "Liked";
				}
			}
			return "Not liked";
		}
	}]);

