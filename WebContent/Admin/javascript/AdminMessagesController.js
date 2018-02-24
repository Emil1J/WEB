angular.module('app',[])
	.controller('adminMessagesController',function($scope,$http){
		
		//Initialize the page with new message open as default. Hide 'No messages' label.
		document.getElementById('OldMessages').style.display = "none";
		document.getElementById("defaultOpen").click();

		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		document.getElementById("SendSuccess").style.display = "none";
		document.getElementById("SendError").style.display = "none";
		
		//Get the admin's unreplied messages to check how many are unread in order to initialize navigation bar messages.
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
		    		   document.getElementById("TabMessages").innerText = "Messages (" + $scope.unread + ")";
		    		   document.getElementById("NewMessagesTab").innerText = "New Messages (" + $scope.unread + ")";
		    	   }
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		//Get all admin's old messages.
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
		
		//According to the message status, fill, or don't fill the circle.
		$scope.CheckCircle = function(msg, circle){
			if(msg.adminread == 0){
				return "filledCircle";
			}
			return "circle";
		}
		
		//Open tab upon click.
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
	    	var no_new_msgs = document.getElementById('no-new-msg');
		   	var no_old_msg = document.getElementById('no-old-msg');
		    if(modalName == "NewMessages"){
		    	if($scope.UnrepliedMessages.length == 0){
		    	no_new_msgs.style.display = "block";
		    	}
			    else{
			    	no_new_msgs.style.display = "none";
			    }
		    }
		    else{
		    	if($scope.Repliedmessages.length == 0){
	    		   	no_old_msg.style.display = "block";
	    	   }else{
	    		   	no_old_msg.style.display = "none";
	    	   }
		    }
		    
		}

		//Get date format from timestamp.		
		$scope.GetDateFormat = function(MessageDateTime){
			if(MessageDateTime == null){return;}
			var date = MessageDateTime.split(' ')[0];
 		   var time = MessageDateTime.split(' ')[1].split(":")[0] + ":" + MessageDateTime.split(' ')[1].split(":")[1];
 		   return date + ' ' + time;
		}
		
		//Once the admin clicks on a message, open the new modal and initialize it according to
		//whether it's a new message or an old message.
		$scope.MessageClick = function(message){
				document.getElementById("Submit").disabled = false;
				var modal = document.getElementById('MessageModal');
				modal.style.display = "block";
				$scope.receiptdate = message.receiptdate;
				$scope.subject = message.subject;
				$scope.message = message.message;
				$scope.username = message.username;
				$scope.reply = message.reply;
				$scope.id = message.id;
				if(message.adminread == 0){
					message.adminread = 1;
					var queryData = {
							ID : $scope.id,
							AdminOrUser : "Admin"
						};
						$http.post("http://localhost:8080/BooksForAll/ReadMessageServlet", queryData)
						   .then(
						       function(response){
									$scope.unread = $scope.unread - 1;
									if($scope.unread != 0){
							    		document.getElementById("TabMessages").innerHTML = "Messages (" + $scope.unread + ")";
							    		document.getElementById("NewMessagesTab").innerHTML = "New Messages (" + $scope.unread + ")";
									}
									else{
							    		document.getElementById("TabMessages").innerHTML = "Messages";
							    		document.getElementById("NewMessagesTab").innerHTML = "New Messages";
									}

									document.getElementById("Circle" + $scope.id).classList.remove('filledCircle');
									document.getElementById("Circle" + $scope.id).classList.add('circle');
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

			//When the admin clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				var modal = document.getElementById('MessageModal');
			    if (event.target == modal) {
					document.getElementById("TextAreaHelp").value = "";
			        modal.style.display = "none";
			    }
			}
			
			//When the admin clicks on X or on Close, the modal closes.
			$scope.Close = function(){
				var modal = document.getElementById('MessageModal');
				document.getElementById("TextAreaHelp").value = "";
				modal.style.display = "none";
			}
			
			//When the admin fills in a reply and clicks Send, send the message.
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
							document.getElementById("Submit").disabled = true;
							for(var i = 0; i < $scope.UnrepliedMessages.length ; i++){
								if($scope.UnrepliedMessages[i].id == $scope.id){
									$scope.UnrepliedMessages[i].adminread = 1;
									$scope.UnrepliedMessages[i].adminreply = 1;
									$scope.UnrepliedMessages[i].reply = reply;
									$scope.Repliedmessages.push($scope.UnrepliedMessages[i]);
									$scope.UnrepliedMessages.splice(i,1);
								}
							}
							if($scope.UnrepliedMessages.length == 0){
						    	var no_new_msgs = document.getElementById('no-new-msg');
						    	no_new_msgs.style.display = "block";
							}
					},
						  error: function(xhr) {
						    //Do Something to handle error
						  }
					});
			}
			
});

