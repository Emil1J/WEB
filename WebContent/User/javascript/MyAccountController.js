angular.module('app',[])
	.controller('myAccountController',['$scope','$http', function($scope,$http){

		//Initialize local variables.
		var user =  JSON.parse(localStorage.getItem('loginResponse'));
		var dataQuery = {
				Username : user.username
		}
		
		//Initialize HTML variables.
		$scope.user = user;

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
		
		//Get the user books.
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
		
  	   	//Get the user messages.
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
	 				if($scope.RepliedMsgs.length == 0){
	 					var nomsg = document.getElementById('no-msg');
	 				    nomsg.style.display = "block";
	 				}else{
	 					var nomsg = document.getElementById('no-msg');
	 				    nomsg.style.display = "none";
	 				}
	 				if($scope.SentMsgs.length == 0){
	 					var nomsg2 = document.getElementById('no-msg2');
	 				    nomsg2.style.display = "block";
	 				}else{
	 					var nomsg2 = document.getElementById('no-msg2');
	 				    nomsg2.style.display = "none";
	 				}
	 				$scope.NewMsgs = newmsgs;
	 				if($scope.NewMsgs != 0){
	 					document.getElementById("NewMessages").innerHTML = "Messages (" + $scope.NewMsgs + ")";
	 					document.getElementById("AnsweredButton").innerText = "Answered(" + $scope.NewMsgs + ")";
	 				}
	 			}, 
	 			function(response){
	 				// failure callback
	 			}
	 	);
	  	
	  	//After the page loads, initialize the likes number on each book.
		window.onload = function(){
			for(var i = 0; i< $scope.books.length ; i++){
 					if($scope.books[i].LikesNum == 0){
    				   document.getElementById('LikeNumTooltip' + $scope.books[i].Name).style.display = "none";
 					}
 				}
		}
		
		//Get the relevant format of message from timestamp.
		$scope.GetTimeFormat = function(CommentDateTime){
			var date = CommentDateTime.split(' ')[0];
	 		var time = CommentDateTime.split(' ')[1].split(":")[0] + ":" + CommentDateTime.split(' ')[1].split(":")[1];
	 		return date + ' ' + time;
	 	}

		//Reload the message after a new help me is sent.
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
	   				if($scope.RepliedMsgs.length == 0){
	   					var nomsg = document.getElementById('no-msg');
	   				    nomsg.style.display = "block";
	   				}else{
	   					var nomsg = document.getElementById('no-msg');
	   				    nomsg.style.display = "none";
	   				}
	   				if($scope.SentMsgs.length == 0){
	   					var nomsg2 = document.getElementById('no-msg2');
	   				    nomsg2.style.display = "block";
	   				}else{
	   					var nomsg2 = document.getElementById('no-msg2');
	   				    nomsg2.style.display = "none";
	   				}
	   				$scope.NewMsgs = newmsgs;
	   				if($scope.NewMsgs != 0){
	   					document.getElementById("UserMessagesButton").innerHTML = "Messages (" + $scope.NewMsgs + ")";
	   					document.getElementById("NewMessages").innerHTML = "Messages (" + $scope.NewMsgs + ")";
	   					document.getElementById("AnsweredButton").innerText = "Answered (" + $scope.NewMsgs + ")";
	   				}
	   			}, 
	   			function(response){
	   				// failure callback
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

		//Get a string of likes for the book
		function GetLikes(likes){
			var likeNames = "";
			var arrayLength = likes.length;
			for (var i = 0; i < arrayLength; i++) {
				var obj = likes[i];
				likeNames = likeNames + obj.username + "\n";
			}
			return likeNames;
		}
		
		//Decide what image to show on the like.
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
		
		//If a user clicks on the like/dislike image, decide what to do and update the server and DB.
		$scope.LikeBook = function(book){
			var queryData = {
					Username : user.username,
					Nickname : user.nickname,
					Bookname : book.Name
				};
			var wasZero = false;
			if(book.LikesNum == 0){
				wasZero = true;
			}
			var query = "LikeBookServlet";
		   	if(document.getElementById(book.Name).src.endsWith("Liked.png")){
				query = "DislikeBookServlet";
		   	}
			
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
				    			   document.getElementById('LikeNum' + response.Book.Name).innerText = $scope.books[i].LikesNum + " Likes";
				    			   document.getElementById('LikeNumTooltip' + response.Book.Name).innerText = GetLikes(response.Book.Likes);
				    			   if($scope.books[i].LikesNum == 0){
				    				   document.getElementById('LikeNumTooltip' + response.Book.Name).style.display = "none";
				    			   }
				    			   else{
				    				   document.getElementById('LikeNumTooltip' + response.Book.Name).style.display = "block";
				    			   }
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

		//When the user click the read me button, open the readmemodal
		$scope.ReadBook = function(book) {
			localStorage.setItem('ChosenBook', JSON.stringify(book));
			var modal = document.getElementById('ReadMeModal');
		    modal.style.display = "block";
		}
		
		//When the user clicks on X, close the read me modal.
		$scope.CloseReadBook = function() {
			var modal = document.getElementById('ReadMeModal');
		    modal.style.display = "none";
		}
		
		//Open book.
		$scope.OpenBook = function(scroll){
			var book = JSON.parse(localStorage.getItem('ChosenBook'));
			localStorage.setItem('ScrollBook', scroll);
			window.location = book.URL;
		}
		
		//Once a user clicks on help me, open helpmemodal.
		$scope.HelpMeButton = function(){
			var modal = document.getElementById('HelpMeModal');
			modal.style.display = "block";
		}
		
		//Cloce by X or by Close.
		$scope.HelpMeCloseButton = function(){
			var modal = document.getElementById('HelpMeModal');
			modal.style.display = "none";
		}
		
		//Submit help me message.
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
		
		//Once the user clicks on asnwered, open this modal.
		$scope.AnsweredModal = function() {
			var modal = document.getElementById('AnsweredModal');
		    modal.style.display = "block";
		}
		
		//Once the user clicks on sent, open this modal.
		$scope.SentModal = function() {
			var modal = document.getElementById('SentModal');
		    modal.style.display = "block";
		}
		
		//Close the delete modal.
		$scope.CloseDeleteMessage = function(){
			var modal = document.getElementById('YesNoModal');
		    modal.style.display = "none";
		}
		
		//Close the answered modal.
		$scope.AnsweredModalCloseFunc = function(){
			var modal = document.getElementById('AnsweredModal');
		    modal.style.display = "none";
		}
		
		//Close the sent modal.
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
		
		//Read message update upon click.
		$scope.ReadMessage = function(msg){
			if(msg.userread == 1 || msg.adminread == 0){
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
				    	   var Answered = "Answered";
				    	   if($scope.NewMsgs != 0){
				    		   Msgs = "Messages (" + $scope.NewMsgs + ")";
				    		   Answered = "Answered (" + $scope.NewMsgs + ")";
				    	   }
				    	   for(var i = 0; i < $scope.RepliedMsgs.length ; i++){
				    		   if($scope.RepliedMsgs[i].id == msg.id){
				    			   $scope.RepliedMsgs[i].userread = 1;
				    		   }
				    	   }
		   					document.getElementById("NewMessages").innerHTML = Msgs;
		   					document.getElementById("AnsweredButton").innerText = Answered;
		   				}
			       }, 
			       function(response){
			         // failure callback
			       }
			    );
		}
		
		//Pop up the modal to confirm that the user wishes to delete the message.
		$scope.DeleteMessage = function(msg){
			localStorage.setItem('ChosenMessage', JSON.stringify(msg));
			var modal = document.getElementById('YesNoModal');
			modal.style.display = "block";
		}
		
		//Confirm the message has been deleted.
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
		
		//View book upon click on image.
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="BookView.html";
		}
	}]);

