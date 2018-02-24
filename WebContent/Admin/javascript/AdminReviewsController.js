	angular.module('app',[])
	.controller('adminReviewsController',['$scope','$http', function($scope,$http){
	
		//Controller variables.
		var norev = document.getElementById('noReviews');

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
		    		   document.getElementById("TabMessages").innerText = "Messages (" + $scope.unread + ")";
		    	   }
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		//Get all the unapproved reviews that need to be reviewed by the admin in order to display them.
		$http.post("http://localhost:8080/BooksForAll/AllUnapprovedCommentsServlet")
		   .then(
		       function(response){
		    	   $scope.comments = response.data.CommentsList;
		    	   if($scope.comments == null || $scope.comments.length == 0){
		    		   norev.style.display = "block";
		    	   }else{
		    		   norev.style.display = "none";
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
		$scope.GetTimeFormat = function(CommentDateTime){
			var date = CommentDateTime.split(' ')[0];
	 		var time = CommentDateTime.split(' ')[1].split(":")[0] + ":" + CommentDateTime.split(' ')[1].split(":")[1];
	 		return date + ' ' + time;
	 	}
		
		//When the user clicks on X, close the modal
		$scope.MyModalFunc = function() {
			var modal = document.getElementById('myModal');
		    modal.style.display = "none";
		}

		//When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('myModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
		
		//When the user clicks on an answer, save it and open the modal.
		$scope.GiveAnswer = function(answer){
			var modal = document.getElementById('myModal');
			modal.style.display = "block";
			$scope.answer = answer;
		}
		
		//When the user answers in the modal, delete the review or accept it.
		$scope.FinalAnswer = function(finalanswer,acr){
			if(finalanswer == "No"){
				var modal = document.getElementById('myModal');
				modal.style.display = "none";
				return;
			}
			var comment = JSON.parse(localStorage.getItem('ChosenComment'));
			var choice = "Approve";
			if($scope.answer == 'Decline'){
				choice = "Unapprove";
			}
			if($scope.comments.length == 1){
				norev.style.display = "block";
			}else{
	    		norev.style.display = "none";
	    	}			
			var dataQuery = {
					ID: comment.id
			}
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/" + choice + "CommentServlet",
				  type: "POST", //send it through get method
				  dataType: 'json',
			  data: JSON.stringify(dataQuery),
			  success: function(response) {
				  for(var i = 0; i < $scope.comments.length ; i++){
					  if($scope.comments[i].id == comment.id){
						  $scope.comments.splice(i, 1);
						  break;
					  }
				  }
				  var modal = document.getElementById('myModal');
				  modal.style.display = "none";
				  location.reload();
			  },
			error: function(xhr) {
			    //Do Something to handle error
			  }
			});
		}
		
		//When the user clicks on a comment, update the chosen comment in the storage.
		$scope.UpdateComment = function(comment){
			localStorage.setItem('ChosenComment', JSON.stringify(comment));
		}
	}]);

