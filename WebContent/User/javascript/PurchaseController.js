angular.module('app',[])
	.controller('purchaseController', ['$scope','$http', function($scope,$http){
		
		//Controller variables.
		var user =  JSON.parse(localStorage.getItem('loginResponse'));

		//HTML scope variables.
		$scope.book = JSON.parse(localStorage.getItem('purchaseBook'));
		
		//Hide modal messages.
		document.getElementById("HelpMeSuccess").style.display = "none";
		document.getElementById("HelpMeError").style.display = "none";

		//If the user somehow got to this page although he already purchased the book. Redirect to ebooks page.
		if(typeof user.books !== 'undefined'){
			for(var i = 0 ; i < user.books.length; i++){
				if(user.books[i].Name == $scope.book.Name){
					window.location = "Ebooks.html";
				}
			}
		}
		//Initialize countries drop down list.
		$.getJSON('../Countries.json', function(countries) {         
			$scope.countries = countries;
		});

		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
			.then(function (response){
				if(response.data.Result == "Failure"){
					window.location = "../../Login.html";
				}
			},function(xhr){
		});

		//CVV listener. Limit length and input type.
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
		
		//CC listener. Limit length and input type.
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

		//CC listener. Limit length and input type.
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
		    
		//CC listener. Limit length and input type.
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
		
		//CC listener. Limit length and input type.
		$('#cardnum4').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
			var listCC = document.getElementById('CCType');
			var cctype = listCC.options[listCC.selectedIndex].value;
		    if ( this.value.length >= 4 || (cctype == "American Express" && this.value.length >= 3) || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});
		
		//hold name. Limit input type.
		$('#holdname').keydown(function(e) {
			if(!((e.which >= '65' && e.which <= '90') || (e.which >= '97' && e.which <= '122') || e.which == '32' ||
					e.which == '46' || e.which == '8' || e.which == '9' || e.which == '13')){
		          e.preventDefault();
	    	}
		});
		
		//city. Limit input type.
		$('#cityPurchase').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if (!(e.keyCode == 32 || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122))) {
		    	e.preventDefault();
		    }
		});
		
		//street. Limit input type.
		$('#streetPurchase').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true))) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if (!(e.keyCode == 32 || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122))) {
		    	e.preventDefault();
		    }
		});
		
		//House num. Limit length and input type.
		$('#housenumPurchase').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
				      // Allow: home, end, left, right, down, up
				      (e.keyCode >= 35 && e.keyCode <= 40)) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if ( this.value.length >= 6 || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});
		
		//Postal number. Limit length and input type.
		$('#postalPurchase').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
				      // Allow: home, end, left, right, down, up
				      (e.keyCode >= 35 && e.keyCode <= 40)) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if ( this.value.length >= 7 || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});
		
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
		
		//Submit the purchase. check that all fields are correct.
		$scope.submitForm = function(valid){
			var listCC = document.getElementById('CCType');
			var cctype = listCC.options[listCC.selectedIndex].innerText;
			var ccholder = document.getElementById('holdname').value;
			var ccnum = document.getElementById('cardnum1').value + document.getElementById('cardnum2').value
			+ document.getElementById('cardnum3').value + document.getElementById('cardnum4').value;
			var ccmonth = document.getElementById('ExpMonth').value;
			var ccsubject = document.getElementById('ExpSubject').value;
			var ccyear = document.getElementById('ExpYear').value;
			var cvv = document.getElementById('cvv').value;
			var city = document.getElementById('cityPurchase').value;
			var street = document.getElementById('streetPurchase').value;
			var housenum = document.getElementById('housenumPurchase').value;
			var postal = document.getElementById('postalPurchase').value;
			var country = document.getElementById('countryPurchase').value;

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
				if(city == ""){
					document.getElementById("errorLine").innerHTML = "City is required";
			        modal.style.display = "block";
					return;
				}
				if(street == ""){
					document.getElementById("errorLine").innerHTML = "Street is required";
			        modal.style.display = "block";
					return;
				}
				if(housenum == ""){
					document.getElementById("errorLine").innerHTML = "House number is required";
			        modal.style.display = "block";
					return;
				}
				if(postal == ""){
					document.getElementById("errorLine").innerHTML = "Postal code is required";
			        modal.style.display = "block";
					return;
				}
				if(country == ""){
					document.getElementById("errorLine").innerHTML = "Country is required";
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
			var secondDigit = ccnum.substr(1,1);

			if(cctype == "American Express" && (firstDigit != "3" || (secondDigit != "4" && secondDigit != "7") ||
					ccnum.length != 15)){
				document.getElementById("errorLine").innerHTML = "Incorrect AMEX credit card number";
		        modal.style.display = "block";
				return;
			}
			else if(cctype == "Visa" && (firstDigit != "4" || ccnum.length != 16)){
				document.getElementById("errorLine").innerHTML = "Incorrect Visa credit card number";
		        modal.style.display = "block";
				return;
			}
			else if(cctype == "MasterCard" && (firstDigit != "5" || ccnum.length != 16)){
				document.getElementById("errorLine").innerHTML = "Incorrect MasterCard credit card number";
		        modal.style.display = "block";
				return;
			}
			else if(cctype == "Discover" && (firstDigit != "6" || ccnum.length != 16)){
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
			var dataQuery = {
				    Username: user.username,
				    Bookname: $scope.book.Name
				  }
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/PurchaseBookServlet",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: JSON.stringify(dataQuery),
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

		// When the user clicks on X or Close, close the modal
		$scope.HelpMeCloseButton = function() {
			var modal = document.getElementById('HelpMeModal');
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('myModal');
			var HelpMeModal = document.getElementById('HelpMeModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		    else if(event.target == HelpMeModal){
		    	HelpMeModal.style.display = "none"
		    }
		}
		
		// When the user clicks on X or Close, close the error modal
		$scope.CloseError = function(){
			var modal = document.getElementById('myModal');
	        modal.style.display = "none";
		}
		
		//Open help me modal.
		$scope.HelpMeButton = function(){
			var modal = document.getElementById('HelpMeModal');
			modal.style.display = "block";
		}
		
		//Submit the message of the modal. 
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

		//Clear the CC fields upon selection of a different CC type.
		$scope.ClearCC = function(){
			document.getElementById('cardnum1').value = "";
			document.getElementById('cardnum2').value = "";
			document.getElementById('cardnum3').value = "";
			document.getElementById('cardnum4').value = "";
		}
	}]);