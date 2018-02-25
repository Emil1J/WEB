angular.module('app',[])
	.controller('ebooksController', ['$scope','$http', function($scope,$http){
		
		//Controller variables.
		var user = JSON.parse(localStorage.getItem('loginResponse'));

		//Hide the review messages.
		document.getElementById("HelpMeSuccess").style.display = "none";
		document.getElementById("HelpMeError").style.display = "none";

		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
			.then(function (response){
				if(response.data.Result == "Failure"){
					window.location = "../../Login.html";
				}
			},function(xhr){
		});
		
		//Get all books in order to show them to the user.
		$http.post("http://localhost:8080/BooksForAll/AllBooksServlet")
		   .then(
		       function(response){
		    	   $scope.books = response.data.BookList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		//Once a user clicks on view book. Open the bookview page.
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="BookView.html";
		}
		
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

		//Purchase a book. Open the relevant page.
		$scope.PurchaseBook = function(book){
			localStorage.setItem('purchaseBook', JSON.stringify(book));
			window.location="Purchase.html";
		}
		
		//Check if the user already has purchased this book.
		$scope.PurchaseCheck = function(book){
			var books = JSON.parse(localStorage.getItem('loginResponse')).books;
			for(var i=0 ; i< books.length ; i++){
				if(books[i].Name == book.Name){
					document.getElementById(book.Name + "PButton").disabled = true;
					return "Already Purchased";
				}
			}
			return "Purchase";
		}
		
		//Open the help me modal.
		$scope.HelpMeButton = function(){
			var modal = document.getElementById('HelpMeModal');
			modal.style.display = "block";
		}

		// When the user clicks on X or close, close the modal
		$scope.CloseHelpMeModal = function() {
			var modal = document.getElementById('HelpMeModal');
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('HelpMeModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}

		//Submit the help me message.
		$scope.Submit = function(){
			var message = document.getElementById("TextAreaHelp").value;
			var subject = $('#MessageSubject option:selected').text();
			if(message == ""){
				$("#HelpMeError").show().delay(3000).fadeOut();
				return;
			}
			var queryData = {
					Username: user.username, 
				    Message: message,
				    Subject: subject
			}
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/NewUserMessageServlet",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: JSON.stringify(queryData),
				  success: function(response) {
						$("#HelpMeSuccess").show().delay(3000).fadeOut();
						document.getElementById("TextAreaHelp").value = "";
				},
					  error: function(xhr) {
					    //Do Something to handle error
					  }
					});
		}
	}]);