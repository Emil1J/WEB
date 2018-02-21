	angular.module('app',[])
	.controller('adminReviewsController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		var norev = document.getElementById('noReviews');

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
		
		$scope.SignOutFunc = function(){
			$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
			   .then(
			       function(response){
			       }, 
			       function(response){
			       }
			    );
		}
		
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
		
		$scope.GetTimeFormat = function(CommentDateTime){
			var date = CommentDateTime.split(' ')[0];
	 		var time = CommentDateTime.split(' ')[1].split(":")[0] + ":" + CommentDateTime.split(' ')[1].split(":")[1];
	 		return date + ' ' + time;
	 	}
		
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

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
		
		$scope.GiveAnswer = function(answer){
			var modal = document.getElementById('myModal');
			modal.style.display = "block";
			$scope.answer = answer;
		}
		
		$scope.FinalAnswer = function(finalanswer){
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
			},
			error: function(xhr) {
			    //Do Something to handle error
			  }
			});
			location.reload();
		}
		
		$scope.UpdateComment = function(comment){
			localStorage.setItem('ChosenComment', JSON.stringify(comment));
		}
	}]);

