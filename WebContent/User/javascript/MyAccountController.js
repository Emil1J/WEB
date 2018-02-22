angular.module('app',[])
	.controller('myAccountController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
		},function(xhr){
	});
		var user =  JSON.parse(localStorage.getItem('loginResponse'));
		$scope.user = user;
		var dataQuery = {
				Username : user.username
		}
  	   	$http.post("http://localhost:8080/BooksForAll/UserBooksServlet", dataQuery)
  	   		.then(
  	   			function(response){
  	   				localStorage.setItem('userBooks', JSON.stringify(response.data.BookList));
  	   				$scope.books = response.data.BookList;
  	   				user.books = $scope.books;
  	   				localStorage.setItem('loginResponse', JSON.stringify(user));
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

		$http.post("http://localhost:8080/BooksForAll/AllUserMessagesServlet", dataQuery)
	   		.then(
	   			function(response){
	   				var newmsgs = 0;
	   				$scope.AllMessages = response.data.Messages;
	   				$scope.RepliedMsgs = [];
	   				$scope.SentMsgs = [];
	   				for(var i = 0; i < $scope.AllMessages.length ; i++){
	   					var current = $scope.AllMessages[i];
	   					if(current.adminreply == 1){
	   						if(current.userread == 0){
		   						newmsgs++;
		   					}
	   						$scope.RepliedMsgs.push(current);
	   					}
	   					else{
	   						$scope.SentMsgs.push(current);
	   					}
	   				}
	   				$scope.NewMsgs = newmsgs;
	   				if($scope.NewMsgs != 0){
	   					document.getElementById("UserMessagesButton").innerHTML = "Messages (" + $scope.NewMsgs + ")";
	   					document.getElementById("NewMessages").innerHTML = "Messages (" + $scope.NewMsgs + ")";
	   				}
	   			}, 
	   			function(response){
	   				// failure callback
	   			}
	   	);

		function reloadMessages(){
			$http.post("http://localhost:8080/BooksForAll/AllUserMessagesServlet", dataQuery)
	   		.then(
	   			function(response){
	   				var newmsgs = 0;
	   				$scope.AllMessages = response.data.Messages;
	   				$scope.RepliedMsgs = [];
	   				$scope.SentMsgs = [];
	   				for(var i = 0; i < $scope.AllMessages.length ; i++){
	   					var current = $scope.AllMessages[i];
	   					if(current.adminreply == 1){
	   						if(current.userread == 0){
		   						newmsgs++;
		   					}
	   						$scope.RepliedMsgs.push(current);
	   					}
	   					else{
	   						$scope.SentMsgs.push(current);
	   					}
	   				}
	   				$scope.NewMsgs = newmsgs;
	   				if($scope.NewMsgs != 0){
	   					document.getElementById("UserMessagesButton").innerHTML = "Messages (" + $scope.NewMsgs + ")";
	   					document.getElementById("NewMessages").innerHTML = "Messages (" + $scope.NewMsgs + ")";
	   				}
	   			}, 
	   			function(response){
	   				// failure callback
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
				var obj = likes[i];
				likeNames = likeNames + obj.username + "\n";
			}
			return likeNames;
		}
		
		function GetLikes(likes){
			var likeNames = "";
			var arrayLength = likes.length;
			for (var i = 0; i < arrayLength; i++) {
				var obj = likes[i];
				likeNames = likeNames + obj.username + "\n";
			}
			return likeNames;
		}
		
		$scope.LikeLogo = function(bookname){
			var booksLength = $scope.books.length;
			for (var i = 0; i < booksLength ; i++){
				var likesLength = $scope.books[i].Likes.length;
				for (var j = 0 ; j < likesLength ; j++){
					var like = $scope.books[i].Likes[j];
					if(like.bookname == bookname && like.username == user.username){
						return "../../Images/Liked.png";
					}
				}
			}
			return "../../Images/Like.png";
		}
			
		$scope.LikeBook = function(book){
			var queryData = {
					Username : user.username,
					Bookname : book.Name
				};
			var query = "LikeBookServlet";
		   	if(document.getElementById(book.Name).src.endsWith("Liked.png")){
				query = "DislikeBookServlet";
		   	}
			
		   	var queryData = {
				    Username: user.username, 
				    Bookname: book.Name
				  };
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/" + query,
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: JSON.stringify(queryData),
				  success: function(response) {
					  if(response.Result == "Success"){
				    	   if(document.getElementById(book.Name).src.endsWith("Liked.png")){
								document.getElementById(book.Name).src = "../../Images/Like.png";
				    	   }
				    	   else{
				    		   document.getElementById(book.Name).src = "../../Images/Liked.png"
				    	   }
				    	   for(var i = 0 ; i < $scope.books.length ; i++){
				    		   if(response.Book.Name == $scope.books[i].Name){
				    			   $scope.books[i] = response.Book;
				    			   document.getElementById('LikeNum' + response.Book.Name).innerHTML = $scope.books[i].LikesNum + " Likes";
				    			   document.getElementById('LikeNumTooltip' + response.Book.Name).innerHTML = GetLikes(response.Book.Likes);
				    			   localStorage.setItem('userBooks', JSON.stringify($scope.books));
				    			   break;
				    		   }
				    	   }
					  }else{
					  }
				},
					  error: function(xhr) {
					    //Do Something to handle error
					  }
					});
			}

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks the button, open the modal 
		$scope.MyButtonFunc = function(book) {
			localStorage.setItem('ChosenBook', JSON.stringify(book));
			var modal = document.getElementById('myModal');
		    modal.style.display = "block";
		}
		
		$scope.AnsweredModal = function() {
			var modal = document.getElementById('AnsweredModal');
		    modal.style.display = "block";
		}
		
		$scope.SentModal = function() {
			var modal = document.getElementById('SentModal');
		    modal.style.display = "block";
		}

		// When the user clicks on <span> (x), close the modal
		$scope.MyModalFunc = function() {
			var modal = document.getElementById('myModal');
		    modal.style.display = "none";
		}
		
		$scope.HelpMeCloseButton = function() {
			var modal = document.getElementById('HelpMeModal');
		    modal.style.display = "none";
		}
		
		$scope.CloseDeleteMessage = function(){
			var modal = document.getElementById('YesNoModal');
		    modal.style.display = "none";
		}
		
		$scope.AnsweredModalCloseFunc = function(){
			var modal = document.getElementById('AnsweredModal');
		    modal.style.display = "none";
		}
		
		$scope.SentModalCloseFunc = function(){
			var modal = document.getElementById('SentModal');
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('myModal');
			var msgsModal = document.getElementById('AnsweredModal');
			var sentModal = document.getElementById('SentModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		    if(event.target == msgsModal){
		    	msgsModal.style.display = "none";
		    }
		    if(event.target == sentModal){
		    	sentModal.style.display = "none";
		    }
		}
		
		document.getElementById("HelpMeSuccess").style.display = "none";
		document.getElementById("HelpMeError").style.display = "none";
		
		$scope.OpenBook = function(scroll){
			var book = JSON.parse(localStorage.getItem('ChosenBook'));
			localStorage.setItem('ScrollBook', scroll);
			window.location = book.URL;
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
						reloadMessages();
				  },
					  error: function(xhr) {
					    //Do Something to handle error
					  }
					});
		}
		
		$scope.ReadMessage = function(msg){
			if(msg.userread == 1){
				return;
			}
			var queryData = {
					ID : msg.id,
					AdminOrUser : "User"
			};
			$http.post("http://localhost:8080/BooksForAll/ReadMessageServlet", queryData)
			   .then(
			       function(response){
			    	   if(response.data.Result == "Success"){
				    	   $scope.NewMsgs = $scope.NewMsgs - 1;
				    	   var Msgs = "Messages";
				    	   if($scope.NewMsgs != 0){
				    		   Msgs = "Messages (" + $scope.NewMsgs + ")";
				    	   }
				    	   for(var i = 0; i < $scope.RepliedMsgs.length ; i++){
				    		   if($scope.RepliedMsgs[i].id == msg.id){
				    			   $scope.RepliedMsgs[i].userread = 1;
				    		   }
				    	   }
		   					document.getElementById("UserMessagesButton").innerHTML = Msgs;
		   					document.getElementById("NewMessages").innerHTML = Msgs;
			    	   }
			       }, 
			       function(response){
			         // failure callback
			       }
			    );
		}
		
		$scope.DeleteMessage = function(msg){
			localStorage.setItem('ChosenMessage', JSON.stringify(msg));
			var modal = document.getElementById('YesNoModal');
			modal.style.display = "block";
		}
		
		$scope.ConfirmDeleteMessage = function (){
			var ChosenMsg = JSON.parse(localStorage.getItem('ChosenMessage'));
			var queryData = {
					ID : ChosenMsg.id,
			};
			$http.post("http://localhost:8080/BooksForAll/DeleteUserMessageServlet", queryData)
			   .then(
			       function(response){
			    	   if(response.data.Result == "Success"){
				    	   for(var i = 0; i < $scope.RepliedMsgs.length ; i++){
				    		   if($scope.RepliedMsgs[i].id == ChosenMsg.id){
				    			   $scope.RepliedMsgs.splice(i, 1);
				    			   break;
				    		   }
				    	   }
		   					var modal = document.getElementById('YesNoModal');
		   				    modal.style.display = "none";
			    	   }
			       }, 
			       function(response){
			         // failure callback
			       }
			    );
		}
		$scope.GetDateFormat = function(DateTime){
			var date = DateTime.split(' ')[0];
 		   var time = DateTime.split(' ')[1].split(":")[0] + ":" + DateTime.split(' ')[1].split(":")[1];
 		   return date + ' at ' + time;
		}
	}]);

