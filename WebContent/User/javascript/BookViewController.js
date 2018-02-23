angular.module('app',[])
	.controller('bookViewController',function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
		},function(xhr){
	});
		var viewBook = JSON.parse(localStorage.getItem('viewBook'));
		var user = JSON.parse(localStorage.getItem('loginResponse'));
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
		var purchased = "False";
		document.getElementById("HelpMeSuccess").style.display = "none";
		document.getElementById("HelpMeError").style.display = "none";

		var books = JSON.parse(localStorage.getItem('loginResponse')).books;
		for(var i=0 ; i<books.length ; i++){
			if(books[i].Name == viewBook.Name){
				purchased = "True";
			}
		}
		
		var counter = 0;
		var x = document.getElementById("reviewField");
		var y = document.getElementById("infoMsg");
		var z = document.getElementById("purchase");
		var w = document.getElementById("collapseReviewBtn");
		y.style.display = "none";
		var input = document.getElementById("review");
		
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
		
		$scope.SignOutFunc = function(){
			$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
			   .then(
			       function(response){
			       }, 
			       function(response){
			       }
			    );
		}
		
		$scope.GetLikes = function(likes){
			var likeNames = "";
			var arrayLength = likes.length;
			for (var i = 0; i < arrayLength; i++) {
				var obj = likes[i]
				likeNames = likeNames + obj.nickname + "\n"
			}
			return likeNames;
		}
		
		input.addEventListener("keyup", function(event) {
		    event.preventDefault();
		    if (event.keyCode === 13) {
		    	$scope.SubmitReview();
		    }
		});
		
		if(purchased == "False"){
		    x.style.display = "none";
		    z.style.display = "block";
		    w.style.display = "none";
		}else{
			 x.style.display = "block";
			 z.style.display = "none";
			 w.style.display = "block";
		}
		
		$scope.MyButtonFunc = function(book) {
			localStorage.setItem('ChosenBook', JSON.stringify(book));
			var modal = document.getElementById('myModal');
		    modal.style.display = "block";
		}
		
		$scope.MyModalFunc = function() {
			var modal = document.getElementById('myModal');
		    modal.style.display = "none";
		}
		
		
		
		$scope.PurchaseBook = function(book){
			localStorage.setItem('purchaseBook', JSON.stringify(book));
			window.location="Purchase.html";
		}
		
		$scope.GetDateFormat = function(CommentDateTime){
			var date = CommentDateTime.split(' ')[0];
 		   var time = CommentDateTime.split(' ')[1].split(":")[0] + ":" + CommentDateTime.split(' ')[1].split(":")[1];
 		   return date + ' at ' + time;
		}
		 
		 $scope.HelpMeButton = function(){
				var modal = document.getElementById('HelpMeModal');
				modal.style.display = "block";
			}

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];

			// When the user clicks on <span> (x), close the modal
			$scope.MyModalFunc2 = function() {
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
			
			$scope.OpenBook = function(scroll){
				var book = JSON.parse(localStorage.getItem('ChosenBook'));
				localStorage.setItem('ScrollBook', scroll);
				window.location = book.URL;
			}
});

