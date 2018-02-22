angular.module('app',[])
	.controller('adminMessagesController',function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		document.getElementById("SendSuccess").style.display = "none";
		document.getElementById("SendError").style.display = "none";
		
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet")
		   .then(
		       function(response){
		    	   $scope.UnrepliedMessages = response.data.Messages;
		    	   if($scope.UnrepliedMessages.length == 0){
		    		   	var no_new_msgs = document.getElementById('no-new-msg');
		    		   	no_new_msgs.style.display = "block";
		    	   }else{
		    		   var no_new_msgs = document.getElementById('no-new-msg');
		    		   no_new_msgs.style.display = "none";
		    	   }
		    	   var unread = 0;
		    	   for(var i = 0; i < $scope.UnrepliedMessages.length ; i++){
		    		   if($scope.UnrepliedMessages[i].adminread == 0){
		    			   unread++;
		    		   }
		    	   }
		    	   $scope.unread = unread;
		    	   if($scope.unread != 0){
		    		   document.getElementById("TabMessages").innerHTML = "Messages (" + $scope.unread + ")";
		    		   document.getElementById("NewMessagesTab").innerHTML = "New Messages (" + $scope.unread + ")";
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
		
		$http.post("http://localhost:8080/BooksForAll/AllAdminRepliedMessagesServlet")
		   .then(
		       function(response){
		    	   $scope.Repliedmessages = response.data.Messages;
		    	   $scope.read = response.data.Messages.length;
		    	   if($scope.Repliedmessages.length == 0){
		    		   	var no_old_msg = document.getElementById('no-old-msg');
		    		   	no_old_msg.style.display = "block";
		    	   }else{
		    		   var no_old_msg = document.getElementById('no-old-msg');
		    		   no_old_msg.style.display = "none";
		    	   }
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		$scope.CheckCircle = function(msg, circle){
			if(msg.adminread == 0){
				return "filledCircle";
			}
			return "circle";
		}
		
		$scope.openTab = function(evt, modalName) {
		    var i, tabcontent, tablinks;
		    tabcontent = document.getElementsByClassName("tabcontent");
		    for (i = 0; i < tabcontent.length; i++) {
		        tabcontent[i].style.display = "none";
		    }
		    tablinks = document.getElementsByClassName("tablinks");
		    for (i = 0; i < tablinks.length; i++) {
		        tablinks[i].className = tablinks[i].className.replace(" active", "");
		    }
		    document.getElementById(modalName).style.display = "block";
		    evt.currentTarget.className += " active";
		}

		// Get the element with id="defaultOpen" and click on it
		document.getElementById("defaultOpen").click();
		
		$scope.GetDateFormat = function(MessageDateTime){
			if(MessageDateTime == null){return;}
			var date = MessageDateTime.split(' ')[0];
 		   var time = MessageDateTime.split(' ')[1].split(":")[0] + ":" + MessageDateTime.split(' ')[1].split(":")[1];
 		   return date + ' ' + time;
		}
		
		 $scope.MessageClick = function(message){
				var modal = document.getElementById('MessageModal');
				modal.style.display = "block";
				$scope.receiptdate = message.receiptdate;
				$scope.subject = message.subject;
				$scope.message = message.message;
				$scope.username = message.username;
				$scope.reply = message.reply;
				$scope.id = message.id;
				if(message.adminread == 0){
					var queryData = {
							ID : $scope.id,
							AdminOrUser : "Admin"
						};
						$http.post("http://localhost:8080/BooksForAll/ReadMessageServlet", queryData)
						   .then(
						       function(response){
									$scope.unread = $scope.unread - 1;
									document.getElementByID("Circle" + $scope.id).classList.remove('filledCircle');
									document.getElementByID("Circle" + $scope.id).classList.add('circle');
						       }, 
						       function(response){
						         // failure callback
						       }
						    );
				}
				if(message.adminreply == 0){
					document.getElementById("TextAreaHelp").style.display = "block";
					document.getElementById("AdminReply").style.display = "none";
					document.getElementById("Submit").style.visibility = "visible"
				}
				else{
					document.getElementById("TextAreaHelp").style.display = "none";
					document.getElementById("AdminReply").style.display = "block";
					document.getElementById("Submit").style.visibility = "hidden"
				}
			}

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];

			// When the user clicks the button, open the modal 
			$scope.MyButtonFunc = function(book) {
				localStorage.setItem('ChosenBook', JSON.stringify(book));
				var modal = document.getElementById('MessageModal');
			    modal.style.display = "block";
			}

			// When the user clicks on <span> (x), close the modal
			$scope.MyModalFunc = function() {
				var modal = document.getElementById('MessageModal');
			    modal.style.display = "none";
			}

			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				var modal = document.getElementById('MessageModal');
			    if (event.target == modal) {
			        modal.style.display = "none";
			    }
			}
			
			$scope.Close = function(){
				var modal = document.getElementById('MessageModal');
				modal.style.display = "none";
				if(document.getElementById("Submit").style.visibility != "hidden"){
					location.reload();
				}
			}
			
			$scope.Send = function(){
				var reply = document.getElementById("TextAreaHelp").value;
				if(reply == ""){
					$("#SendError").show().delay(3000).fadeOut();
					return;
				}
				var queryData = {
						ID: $scope.id, 
					    Reply: reply
				}
				
				$.ajax({
					  url: "http://localhost:8080/BooksForAll/AdminReplyMessageServlet",
					  type: "POST", //send it through get method
			          dataType: 'json',
					  data: JSON.stringify(queryData),
					  success: function(response) {
							$("#SendSuccess").show().delay(3000).fadeOut();
							document.getElementById("TextAreaHelp").value = "";
					},
						  error: function(xhr) {
						    //Do Something to handle error
						  }
						});
			}
			
			document.getElementById('OldMessages').style.display = "none";
			$('.circle').on('click', function(){
				  $(this).toggleClass('filled');
				});
});

