angular.module('app',[])
	.controller('bookViewController',function($scope,$http){
		
		//Controller variables.
		var viewBook = JSON.parse(localStorage.getItem('viewBook'));
		var user = JSON.parse(localStorage.getItem('loginResponse'));
		var counter = 0;
		var reviewField = document.getElementById("reviewField");
		var infoMsg = document.getElementById("infoMsg");
		var purchaseBtn = document.getElementById("purchase");
		var reviewBtn = document.getElementById("collapseReviewBtn");
		var readBtn = document.getElementById("read");
		var input = document.getElementById("review");
		var books = JSON.parse(localStorage.getItem('loginResponse')).books;
		var purchased = "False";

		//HTML scope variables.
		$scope.book = viewBook;
		$scope.username = user.username;
		$scope.bookname = viewBook.Name;
		$scope.bookauthor = viewBook.Author;
		$scope.bookcover = viewBook.Photo;
		$scope.bookdesc = viewBook.Description;
		$scope.bookcomments = viewBook.Comments;
		$scope.bookprice = viewBook.Price;
		$scope.Likes = viewBook.Likes;
		$scope.likesNum = viewBook.LikesNum;
		
		//Hide the review messages.
		document.getElementById("HelpMeSuccess").style.display = "none";
		document.getElementById("HelpMeError").style.display = "none";
		infoMsg.style.display = "none";

		//Check if the user purchased this book.
		if(typeof books !== 'undefined'){
			for(var i=0 ; i< books.length ; i++){
				if(books[i].Name == viewBook.Name){
					purchased = "True";
				}
			}
		}
		
		//Initialize page data according to book being purchased or not.
		if(purchased == "False"){
			reviewField.style.display = "none";
			purchaseBtn.style.display = "block";
			readBtn.style.display = "none";
		}else{
			reviewField.style.display = "block";
			purchaseBtn.style.display = "none";
			readBtn.style.display = "block";
		}

		//Check if there are any reviews. Initialize page data accordingly.
		if($scope.bookcomments.length == 0){
			reviewBtn.style.display = "none";
		}else{
			if(purchased != "False")
				reviewBtn.style.display = "block";
		}
		
		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
			.then(function (response){
				if(response.data.Result == "Failure"){
					window.location = "../../Login.html";
				}
			},function(xhr){
		});
		
		//Once a user submits a review, update him and sent the comment for approval.
		$scope.SubmitReview = function(){
			$("#infoMsg").show().delay(3000).fadeOut();
			var data = {
					Username : $scope.username,
					Bookname : $scope.bookname,
					Description : input.value
			}
	    	$http.post("http://localhost:8080/BooksForAll/CommentBookServlet", data)
			   .then(
			       function(response){
			    	   document.getElementById("review").value = "";
			       }, 
			       function(response){
			       }
			    );
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
		
		//Submit review on enter key.
		input.addEventListener("keyup", function(event) {
		    event.preventDefault();
		    if (event.keyCode === 13) {
		    	$scope.SubmitReview();
		    }
		});
		
		//Open the read book modal that checks if the user wants to continue from where he stopped.
		$scope.ReadBook = function(book) {
			localStorage.setItem('ChosenBook', JSON.stringify(book));
			var modal = document.getElementById('ContinueInBook');
		    modal.style.display = "block";
		}
		
		//Close the above modal by clicking on X.
		$scope.CloseContinueInBook = function() {
			var modal = document.getElementById('ContinueInBook');
		    modal.style.display = "none";
		}
		
		//Purchase a new book by redirecting to the purchase page.
		$scope.PurchaseBook = function(book){
			localStorage.setItem('purchaseBook', JSON.stringify(book));
			window.location="Purchase.html";
		}
		
		//Get date format from timestamp.
		$scope.GetDateFormat = function(CommentDateTime){
			var date = CommentDateTime.split(' ')[0];
 		   var time = CommentDateTime.split(' ')[1].split(":")[0] + ":" + CommentDateTime.split(' ')[1].split(":")[1];
 		   return date + ' at ' + time;
		}
		 
		
		$scope.HelpMeButton = function(){
			var modal = document.getElementById('HelpMeModal');
			modal.style.display = "block";
		}

		//When the user clicks on X, close the modal
		$scope.CloseHelpMeModal = function() {
			var modal = document.getElementById('HelpMeModal');
		    modal.style.display = "none";
		}

		//When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('HelpMeModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
		
		//When the user clicks on help me, open the relevant modal.
		$scope.HelpMeButton = function(){
			var modal = document.getElementById('HelpMeModal');
			modal.style.display = "block";
		}
		
		//Submit new help me message.
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
			
		//Open the book for the user.
		$scope.OpenBook = function(scroll){
			var book = JSON.parse(localStorage.getItem('ChosenBook'));
			localStorage.setItem('ScrollBook', scroll);
			window.location = book.URL;
		}
});

