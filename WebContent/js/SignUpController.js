angular.module('app2',[])
	.controller('signUpController', ['$scope','$http', function($scope,$http){
	document.getElementById('usernameTaken').style.display= "none";

	function validateFields(valid1, valid2){
		if(!valid1){
			var fields = ["usernamesu", "nicknamesu", "phonesu", "citysu", "streetsu", "housesu", "postalsu", "countrysu",];
			var names = ["Username", "Nickname", "Phone number", "City", "Street", "House", "Postal code", "Country",];
			var i, l = fields.length;
			var fieldname;
			for (i = 0; i < l; i++) {
			    fieldname = fields[i];
			    if (document.forms["userForm1"][fieldname].value === "") {
			    	alert(names[i] + " can not be empty.");
			      	break;
			    }
			}
			return false;
		}
		else if(!valid2){
			if (document.forms["userForm1"]["passwordsu"].value === "") {
		    	alert("Password can not be empty.");
		    }
			return false;
		}
		return true;
	}

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
		var balance = '0';
		var valid = validateFields(valid1, valid2);
		if(valid){
			if(email == ""){
				email = "Empty";
			}
			else if(description == ""){
				description = "Empty";
			}
			else if(photo == ""){
				photo = "URL";
			}
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/RegisterServlet?",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: {
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
				    Photo: password,
				    Balance: balance
				  },
				  success: function(response) {
					  if(response.Result == "Success"){
						  localStorage.setItem('loginResponse', JSON.stringify({response}))
						  window.location="LandingPage.html";
					  }

				  },
				  error: function(xhr) {
				    //Do Something to handle error
				  }
				});
		}
		
	}

	$scope.removeError = function () {
		document.getElementById('usernameTaken').style.display= "none";
	}

	$scope.emailField = function () {
		if(document.getElementById('emailsu').value.length == 0){
			document.getElementById('emailValid').style.display= "none";
	        document.getElementById('emailsu').style.border = "none";
		}
	}

	$scope.validateUsername = function () {
		// use $.param jQuery function to serialize data from JSON 
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

}]);
