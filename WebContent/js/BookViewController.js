angular.module('app',[])
	.controller('bookViewController',function($scope,$http){
		var viewBook = JSON.parse(localStorage.getItem('viewBook'));
		var user = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.username = user.username;
		$scope.bookname = viewBook.Name;
		$scope.bookauthor = viewBook.Author;
		$scope.bookcover = viewBook.Photo;
		$scope.bookdesc = viewBook.Description;
		$scope.bookcomments = viewBook.Comments;
		var purchased = "True";
		var counter = 0;
		var x = document.getElementById("reviewField");
		var y = document.getElementById("infoMsg");
		y.style.display = "none";
		var input = document.getElementById("review");
		
		$scope.SubmitReview = function(){
			$("#infoMsg").show().delay(3000).fadeOut();
	    	$http.post("http://localhost:8080/BooksForAll/CommentBookServlet?Username=" + $scope.username +
	    			"&Bookname=" + $scope.bookname + "&Description=" + input.value)
			   .then(
			       function(response){
				    	input.value = '';
			       }, 
			       function(response){
			       }
			    );
		}
		
		input.addEventListener("keyup", function(event) {
		    event.preventDefault();
		    if (event.keyCode === 13) {
		    	$scope.SubmitReview();
		    }
		});
		
		if(purchased == "False"){
		    x.style.display = "none";
		}else{
			 x.style.display = "block";
		}
		
		$scope.GetDateFormat = function(CommentDateTime){
			var date = CommentDateTime.split(' ')[0];
 		   var time = CommentDateTime.split(' ')[1].split(":")[0] + ":" + CommentDateTime.split(' ')[1].split(":")[1];
 		   return date + ' at ' + time;
		}
		
		$(window).scroll(function() {
			   if($(window).scrollTop() + $(window).height() == $(document).height() || $(window).scrollTop() + $(window).height() > $(document).height() - 0.8) {
				   $http.post("http://localhost:8080/BooksForAll/TenCommentsServlet?Bookname=" + $scope.bookname + "&CommentId=" + $scope.bookcomments[counter-1].id)
				   .then(
				       function(response){
				    	   var length = response.data.Comments.length;
				    	   counter += length;
				    	   var div = document.getElementById('append');
				    	   if(length > 0){
				    		   var date = response.data.Comments[0].time.split(' ')[0];
				    		   var time = response.data.Comments[0].time.split(' ')[1].split(":")[0] + ":" + response.data.Comments[0].time.split(' ')[1].split(":")[1];
				    		   var timedate = date + ' at ' + time;
				    		   var txt1 = '<div class="col-sm-6 col-sm-offset-3"> <div class="commentbox"><div class="row"><div class="col-sm-2"><img class="ProfilePic" src="' + response.data.Comments[0].photo + '"></div><div class="col-sm-5"><p id="commentusername">' + response.data.Comments[0].username + '</p></div><div class="col-sm-5"><p id="commenttime">' + timedate + '</p></div><div class="col-sm-8"></div><div class="col-sm-6"><div class="commenttextinc"><p id="commenttext">' + response.data.Comments[0].description + '</p></div></div></div></div>'; 
				    		   $("#append").append(txt1);
				    	   }
				    	   if(length > 1){
				    		   var date = response.data.Comments[1].time.split(' ')[0];
				    		   var time = response.data.Comments[1].time.split(' ')[1].split(":")[0] + ":" + response.data.Comments[1].time.split(' ')[1].split(":")[1];
				    		   var timedate = date + ' at ' + time;
				    		   var txt2 = '<div class="col-sm-6 col-sm-offset-3"> <div class="commentbox"><div class="row"><div class="col-sm-2"><img class="ProfilePic" src="' + response.data.Comments[1].photo + '"></div><div class="col-sm-5"><p id="commentusername">' + response.data.Comments[1].username + '</p></div><div class="col-sm-5"><p id="commenttime">' + timedate + '</p></div><div class="col-sm-8"></div><div class="col-sm-6"><div class="commenttextinc"><p id="commenttext">' + response.data.Comments[1].description + '</p></div></div></div></div>';
				    		   $("#append").append(txt2);
				    	   }
				    	   if(length > 2){
				    		   var date = response.data.Comments[2].time.split(' ')[0];
				    		   var time = response.data.Comments[2].time.split(' ')[1].split(":")[0] + ":" + response.data.Comments[2].time.split(' ')[1].split(":")[1];
				    		   var timedate = date + ' at ' + time;
				    		   var txt3 = '<div class="col-sm-6 col-sm-offset-3"> <div class="commentbox"><div class="row"><div class="col-sm-2"><img class="ProfilePic" src="' + response.data.Comments[2].photo + '"></div><div class="col-sm-5"><p id="commentusername">' + response.data.Comments[2].username + '</p></div><div class="col-sm-5"><p id="commenttime">' + timedate + '</p></div><div class="col-sm-8"></div><div class="col-sm-6"><div class="commenttextinc"><p id="commenttext">' + response.data.Comments[2].description + '</p></div></div></div></div>';
				    		   $("#append").append(txt3);
				    	   }
				    	   if(length > 3){
				    		   var date = response.data.Comments[3].time.split(' ')[0];
				    		   var time = response.data.Comments[3].time.split(' ')[1].split(":")[0] + ":" + response.data.Comments[3].time.split(' ')[1].split(":")[1];
				    		   var timedate = date + ' at ' + time;
				    		   var txt4 = '<div class="col-sm-6 col-sm-offset-3"> <div class="commentbox"><div class="row"><div class="col-sm-2"><img class="ProfilePic" src="' + response.data.Comments[3].photo + '"></div><div class="col-sm-5"><p id="commentusername">' + response.data.Comments[3].username + '</p></div><div class="col-sm-5"><p id="commenttime">' + timedate + '</p></div><div class="col-sm-8"></div><div class="col-sm-6"><div class="commenttextinc"><p id="commenttext">' + response.data.Comments[3].description + '</p></div></div></div></div>'; 
				    		   $("#append").append(txt4);
				    	   }
				    	   if(length > 4){
				    		   var date = response.data.Comments[4].time.split(' ')[0];
				    		   var time = response.data.Comments[4].time.split(' ')[1].split(":")[0] + ":" + response.data.Comments[4].time.split(' ')[1].split(":")[1];
				    		   var timedate = date + ' at ' + time;
				    		   var txt5 = '<div class="col-sm-6 col-sm-offset-3"> <div class="commentbox"><div class="row"><div class="col-sm-2"><img class="ProfilePic" src="' + response.data.Comments[4].photo + '"></div><div class="col-sm-5"><p id="commentusername">' + response.data.Comments[4].username + '</p></div><div class="col-sm-5"><p id="commenttime">' + timedate + '</p></div><div class="col-sm-8"></div><div class="col-sm-6"><div class="commenttextinc"><p id="commenttext">' + response.data.Comments[4].description + '</p></div></div></div></div>';
				    		   $("#append").append(txt5);
				    	   }
				       }, 
				       function(response){
				       }
				    );
			   }
			});
		
		 $scope.quantity = 5;
		 
		 $( document ).ready( function() {
			    $('div.commentbox').each(function(i, d) {
			        draw.call($(this));
			    });
			});
		 
		 function draw()
		 {
		     counter++;
		 }
});

