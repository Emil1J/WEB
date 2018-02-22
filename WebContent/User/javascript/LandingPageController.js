angular.module('app',[])
	.controller('homePageController', ['$scope','$http', function($scope,$http){
	$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
		},function(xhr){
	});
		var user = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.welcomename = user.username;
		$http.post("http://localhost:8080/BooksForAll/TopFiveBooksServlet")
		.then(function (response){
			$scope.mostLikedBooks = response.data.BookList;
	},function(xhr){
	});
		
	$scope.welcomename = user.username;
	$http.post("http://localhost:8080/BooksForAll/TopFivePurchasedBooksServlet")
		.then(function (response){
			$scope.mostPurchasedBooks = response.data.BookList;
	},function(xhr){
	});
	
	document.getElementById("HelpMeSuccess").style.display = "none";
	document.getElementById("HelpMeError").style.display = "none";
	
	$scope.viewBook = function(book){
		localStorage.setItem('viewBook', JSON.stringify(book));
		window.location="BookView.html";
	}
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	$scope.MyButtonFunc = function(book) {
		localStorage.setItem('ChosenBook', JSON.stringify(book));
		var modal = document.getElementById('HelpMeModal');
	    modal.style.display = "block";
	}
	
	$scope.SignOutFunc = function(){
		$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
		   .then(
		       function(response){
		       }, 
		       function(response){
		       }
		    );
	}

	// When the user clicks on <span> (x), close the modal
	$scope.MyModalFunc = function() {
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
	
	$scope.HelpMeButton = function(){
		var modal = document.getElementById('HelpMeModal');
		modal.style.display = "block";
	}
	
	$scope.Cancel = function(){
		var modal = document.getElementById('HelpMeModal');
		modal.style.display = "none";
	}
	
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

