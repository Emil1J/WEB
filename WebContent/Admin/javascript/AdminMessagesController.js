angular.module('app',[])
	.controller('adminMessagesController',function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		$scope.unread = 0;
		document.getElementById("SendSuccess").style.display = "none";
		document.getElementById("SendError").style.display = "none";
		
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet")
		   .then(
		       function(response){
		    	   $scope.UnrepliedMessages = response.data.Messages;
		    	   var unread = 0;
		    	   for(var i = 0; i < $scope.UnrepliedMessages ; i++){
		    		   if($scope.UnrepliedMessages[i].adminread == 0){
		    			   unread++;
		    		   }
		    	   }
		    	   $scope.unread = unread;
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
		    	   $scope.Repliedmessage = response.data.Messages;
		    	   $scope.unread = response.data.Messages.length;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		$scope.openTab = function(evt, cityName) {
		    var i, tabcontent, tablinks;
		    tabcontent = document.getElementsByClassName("tabcontent");
		    for (i = 0; i < tabcontent.length; i++) {
		        tabcontent[i].style.display = "none";
		    }
		    tablinks = document.getElementsByClassName("tablinks");
		    for (i = 0; i < tablinks.length; i++) {
		        tablinks[i].className = tablinks[i].className.replace(" active", "");
		    }
		    document.getElementById(cityName).style.display = "block";
		    evt.currentTarget.className += " active";
		}

		// Get the element with id="defaultOpen" and click on it
		document.getElementById("defaultOpen").click();
		
		$scope.GetDateFormat = function(CommentDateTime){
			var date = CommentDateTime.split(' ')[0];
 		   var time = CommentDateTime.split(' ')[1].split(":")[0] + ":" + CommentDateTime.split(' ')[1].split(":")[1];
 		   return date + ' ' + time;
		}
		
		 $scope.HelpMeButton = function(){
				var modal = document.getElementById('HelpMeModal');
				modal.style.display = "block";
			}

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];

			// When the user clicks the button, open the modal 
			$scope.MyButtonFunc = function(book) {
				localStorage.setItem('ChosenBook', JSON.stringify(book));
				var modal = document.getElementById('HelpMeModal');
			    modal.style.display = "block";
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
});

