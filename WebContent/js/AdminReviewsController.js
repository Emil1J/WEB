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
		
		$scope.CommentAnswerModal = function(comment){
			localStorage.setItem('ChosenComment', JSON.stringify(comment));
			var modal = document.getElementById('myModal');
		    modal.style.display = "block";
		}
		
		$("tbody").on("click", "tr", function(e) {     
			  $(this)
			     .toggleClass("selected")
			     .siblings(".selected")
			         .removeClass("selected");
			});
		

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
		
		$scope.GiveAnswer = function(answer){
			localStorage.setItem('Answer', answer);
		}
	}]);

