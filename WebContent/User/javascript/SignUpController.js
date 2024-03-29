angular.module('app',[])
	.controller('signUpController', ['$scope','$http', function($scope,$http){
		
		//Hide error message.
		document.getElementById('usernameTaken').style.display= "none";
		
		//Load countries to select.
		$.getJSON('../Countries.json', function(countries) {         
			$scope.countries = countries;
		});

		//Listener for postal code input.
		$('#postalsu').keydown(function(e) {
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
		
		//Listener for password input length.
		$('#passwordsu').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
				      // Allow: home, end, left, right, down, up
				      (e.keyCode >= 35 && e.keyCode <= 40)) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if (this.value.length >= 8) {
		    	e.preventDefault();
		    }
		});
		
		//Listener for postal phone number input.
		$('#phonesu').keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
				      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
				      // Allow: home, end, left, right, down, up
				      (e.keyCode >= 35 && e.keyCode <= 40)) {
				      // let it happen, don't do anything
				      return;
				    }
				    // Ensure that it is a number and stop the keypress
		    if ( this.value.length >= 10 || (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		    	e.preventDefault();
		    }
		});
		
		//Listener for house number input.
		$('#housesu').keydown(function(e) {
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
		
		//Listener for city input.
		$('#citysu').keydown(function(e) {
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
		
		//Listener for street name input.
		$('#streetsu').keydown(function(e) {
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
		
		//Validate the sign up fields.
		function validateFields(valid1, valid2){
			if(!valid1){
				var fields = ["usernamesu", "nicknamesu", "phonesu", "citysu", "streetsu", "housesu", "postalsu", "countrysu",];
				var names = ["Username", "Nickname", "Phone number", "City", "Street", "House number", "Postal code", "Country",];
				var i, l = fields.length;
				var fieldname;
				for (i = 0; i < l; i++) {
				    fieldname = fields[i];
				    if (document.forms["userForm1"][fieldname].value === "") {
						var modal = document.getElementById('myModal');
				    	document.getElementById("errorLine").innerHTML = names[i] + " can not be empty";
				        modal.style.display = "block";
				      	break;
				    }
				}
				return false;
			}
			else if(!valid2){
				if (document.forms["userForm2"]["passwordsu"].value === "") {
					var modal = document.getElementById('myModal');
					document.getElementById("errorLine").innerHTML = "Password can not be empty";
			        modal.style.display = "block";
				}
				return false;
			}
			return true;
		}

		//Sign up button. Get the data and validate them then sign up and redirect to main page.
		$scope.signUp = function (valid1, valid2) {
			var username = document.getElementById('usernamesu').value;
			var nickname = document.getElementById('nicknamesu').value;
			var email = document.getElementById('emailsu').value;
			var phone = document.getElementById('phonesu').value;
			var city = document.getElementById('citysu').value;
			var street = document.getElementById('streetsu').value;
			var houseNumber = document.getElementById('housesu').value;
			var postal = document.getElementById('postalsu').value;
			var country = document.getElementById('countrysu').value;
			var description = document.getElementById('descriptionsu').value;
			var street = document.getElementById('streetsu').value;
			var photo = document.getElementById('photosu').value;
			var password = document.getElementById('passwordsu').value;
			var valid = validateFields(valid1, valid2);
			if(valid){
				if(email == ""){
					email = "";
				}
				if(description == ""){
					description = "";
				}
				if(photo == ""){
					photo = "https://image.freepik.com/free-icon/male-user-profile-picture_318-37825.jpg";
				}
				var queryData = {
					    Username: username,
					    Email: email, 
					    Street: street, 
					    HouseNum: houseNumber, 
					    City: city, 
					    Country: country, 
					    PostalCode: postal, 
					    PhoneNumber: phone, 
					    Password: password, 
					    Nickname: nickname, 
					    Description: description, 
					    Photo: photo
						};
				$.ajax({
					  url: "http://localhost:8080/BooksForAll/RegisterServlet",
					  type: "POST", //send it through get method
			          dataType: 'json',
					  data: JSON.stringify(queryData),
					  success: function(response) {
						  if(response.Result == "Success"){
							  response.User.books = [];
							  localStorage.setItem('loginResponse', JSON.stringify(response.User));
							  window.location="LandingPage.html";
						  }
	
					  },
					  error: function(xhr) {
					    //Do Something to handle error
					  }
					});
			}
		}

		//Once the user rewrites a username, remove the username taken error.
		$scope.removeError = function () {
			document.getElementById('usernameTaken').style.display= "none";
		}
	
		//Email field error remove when the length of the input is zero.
		$scope.emailField = function () {
			if(document.getElementById('emailsu').value.length == 0){
				document.getElementById('emailValid').style.display= "none";
		        document.getElementById('emailsu').style.border = "none";
			}
		}
		
		//Once the user de-highlights the username fields, check if the username exists and show message.
		$scope.validateUsername = function () {
			$.ajax({
			  url: "http://localhost:8080/BooksForAll/CheckUsernameServlet?",
			  type: "POST", //send it through get method
	          dataType: 'json',
			  data: {
			    Username: $scope.usernamesu 
			  },
			  success: function(response) {
				  if(response.Result == "Failure"){
					  document.getElementById('usernameTaken').style.display= "block";
				  }
				  else{
					  document.getElementById('usernameTaken').style.display= "none";
				  }
			  },
			  error: function(xhr) {
			    //Do Something to handle error
			  }
			});		
		}
	
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('myModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
		
		//Basically closes the error modal.
		$scope.CloseError = function(){
			var modal = document.getElementById('myModal');
	        modal.style.display = "none";
		}

}]);
