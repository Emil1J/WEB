angular.module('app',[])
	.controller('purchaseController', ['$scope','$http', function($scope,$http){
		$scope.book = JSON.parse(localStorage.getItem('purchaseBook'));
		var user =  JSON.parse(localStorage.getItem('loginResponse'));

		document.getElementById("HelpMeSuccess").style.display = "none";
		document.getElementById("HelpMeError").style.display = "none";
		
		for(var i = 0 ; i < user.books.length; i++){
			if(user.books[i].Name == $scope.book.Name){
				window.location = "Ebooks.html";
			}
		}
		
		$('#cvv').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if ( this.value.length >= 3 || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});
		
		$('#cardnum1').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if ( this.value.length >= 4 || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});

		    
		$('#cardnum2').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if ( this.value.length >= 4 || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});
		    
		$('#cardnum3').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if ( this.value.length >= 4 || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});
		
		$('#cardnum4').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if ( this.value.length >= 4 || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});
		
		$('#holdname').keydown(function(e) {
			if(!((e.which >= '65' && e.which <= '90') || (e.which >= '97' && e.which <= '122') || e.which == '32' ||
					e.which == '46' || e.which == '8' || e.which == '9' || e.which == '13')){
		          e.preventDefault();
	    	}
		});
		
		$scope.submitForm = function(valid){
			var cctype = document.getElementById('CCType').value;
			var ccholder = document.getElementById('holdname').value;
			var ccnum = document.getElementById('cardnum1').value + document.getElementById('cardnum2').value
			+ document.getElementById('cardnum3').value + document.getElementById('cardnum4').value;
			var ccmonth = document.getElementById('ExpMonth').value;
			var ccyear = document.getElementById('ExpYear').value;
			var cvv = document.getElementById('cvv').value;
			var modal = document.getElementById('myModal');
			var monthNames = {
					"Jan" : "1",
					"Feb" : "2",
					"Mar" : "3",
					"Apr" : "4",
					"May" : "5",
					"Jun" : "6",
					"Jul" : "7",
					"Aug" : "8",
					"Sep" : "9",
					"Oct" : "10",
					"Nov" : "11",
					"Dec" : "12"
			};
			if(!valid){
				if(ccholder == ""){
					document.getElementById("errorLine").innerHTML = "Cardholder is required";
			        modal.style.display = "block";
					return;
				}
				if(ccnum.length < 16){
					document.getElementById("errorLine").innerHTML = "Incorrect credit card number";
			        modal.style.display = "block";
					return;
				}
				if(cvv.length < 3){
					document.getElementById("errorLine").innerHTML = "Incorrect cvv";
			        modal.style.display = "block";
					return;
				}
				document.getElementById("errorLine").innerHTML = "Incorrect details";
		        modal.style.display = "block";
				return;
			}
			var firstDigit = ccnum.substr(0,1);
			if(cctype == "American Express" && firstDigit != "3"){
				document.getElementById("errorLine").innerHTML = "Incorrect AMEX credit card number";
		        modal.style.display = "block";
				return;
			}
			else if(cctype == "Visa" && firstDigit != "4"){
				document.getElementById("errorLine").innerHTML = "Incorrect Visa credit card number";
		        modal.style.display = "block";
				return;
			}
			else if(cctype == "MasterCard" && firstDigit != "5"){
				document.getElementById("errorLine").innerHTML = "Incorrect MasterCard credit card number";
		        modal.style.display = "block";
				return;
			}
			else if(cctype == "Discover" && firstDigit != "6"){
				document.getElementById("errorLine").innerHTML = "Incorrect Discover credit card number";
		        modal.style.display = "block";
				return;
			}
			var d = new Date();
			if(ccyear <= d.getFullYear()){
				if(ccyear < d.getFullYear() ||
						(ccyear == d.getFullYear()
								&& monthNames[ccmonth] == d.getMonth()))
					{
						document.getElementById("errorLine").innerHTML = "Incorrect expiry date";
						modal.style.display = "block";
						return;
					}
			}
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/PurchaseBookServlet?",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: {
				    Username: user.username,
				    Bookname: $scope.book.Name
				  },
				  success: function(response) {
					  if(response.Result == "Success"){
						  
						  window.location="MyAccount.html";
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

		// When the user clicks on <span> (x), close the modal
		$scope.MyModalFunc = function() {
			var modal = document.getElementById('myModal');
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('myModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
		
		$scope.CloseError = function(){
			var modal = document.getElementById('myModal');
	        modal.style.display = "none";
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
			var subject = document.getElementById("MessageSubject").value;
			if(message == ""){
				$("#HelpMeError").show().delay(3000).fadeOut();
				return;
			}
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/NewUserMessageServlet?",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: {
					Username: user.username, 
				    Message: message,
				    Subject: subject
				  },
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