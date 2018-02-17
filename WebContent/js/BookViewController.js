angular.module('app',[])
	.controller('bookViewController',function($scope,$http){
		var viewBook = JSON.parse(localStorage.getItem('viewBook'));
		$scope.bookname = viewBook.Name;
		$scope.bookauthor = viewBook.Author;
		$scope.bookcover = viewBook.Photo;
		$scope.bookdesc = viewBook.Description;
		$scope.bookcomments = viewBook.Comments;
		var counter = 0;
		
		$(window).scroll(function() {
			   if($(window).scrollTop() + $(window).height() == $(document).height()) {
				   $http.post("http://localhost:8080/BooksForAll/AllBooksServlet?")
				   .then(
				       function(response){
				    	   $scope.books = response.data.BookList;
				       }, 
				       function(response){
				         // failure callback
				       }
				    );
			   }
			});
		
		 $scope.quantity = 2;
		 
		 $( document ).ready( function() {
			    $('div.commentbox').each(function(i, d) {
			        draw.call($(this));
			    });
			});
		 
		 function draw()
		 {
		     counter++;
		     alert(counter);
		 }
});

