angular.module('app',[])
	.controller('bookViewController',function($scope,$http){
		var viewBook = JSON.parse(localStorage.getItem('viewBook'));
		$scope.bookname = viewBook.Name;
		$scope.bookauthor = viewBook.Author;
		$scope.bookcover = viewBook.Photo;
		$scope.bookdesc = viewBook.Description;
		$(window).scroll(function() {
			   if($(window).scrollTop() + $(window).height() == $(document).height()) {
			       alert("bottom!");
			   }
			});
});

