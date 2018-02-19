	angular.module('app',[])
	.controller('adminReviewsController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/AllUnapprovedCommentsServlet?")
		   .then(
		       function(response){
		    	   $scope.comments = response.data.CommentsList;
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
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/" + choice + "CommentServlet?",
				  type: "POST", //send it through get method
				  dataType: 'json',
			  data: {
				CommentID: comment.id
			  },
			  success: function(response) {
			},
			error: function(xhr) {
			    //Do Something to handle error
			  }
			});
			location.reload();
		}
	}]);

