angular.module('app',[])
	.controller('homePageController', ['$scope','$http', function($scope,$http){
	
	//Initialize local variables.
	var user = JSON.parse(localStorage.getItem('loginResponse'));
	
	//Initialize HTML variables.
	$scope.welcomename = user.username;

	//Hide messages.
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
	
	//Get top five liked books.
	$http.post("http://localhost:8080/BooksForAll/TopFiveBooksServlet")
		.then(function (response){
			$scope.mostLikedBooks = response.data.BookList;
		},function(xhr){
	});
		
	//Get top five purchased books.
	$http.post("http://localhost:8080/BooksForAll/TopFivePurchasedBooksServlet")
		.then(function (response){
			$scope.mostPurchasedBooks = response.data.BookList;
		},function(xhr){
	});
	
	//Once a user clicks on a book, open the relevant book view page.
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
	
	//Open the modal upon click on help me.
	$scope.HelpMeButton = function(){
		var modal = document.getElementById('HelpMeModal');
		modal.style.display = "block";
	}
	
	//Submit message.
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

