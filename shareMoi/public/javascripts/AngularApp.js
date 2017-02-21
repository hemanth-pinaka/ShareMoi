var app = angular.module('flapperNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })

   .state('posts',{
    	url:'/posts/{id}',
    	templateUrl: '/posts.html',
    	controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts',[function(){
	var o = {
		posts:[{title:'hello',link:'',upvotes:0}]
	};
		return o;
	}]);

app.controller('MainCtrl',['$scope','posts',function($scope,posts){

	$scope.posts = posts.posts;
	$scope.addPost = function() {
		if($scope.title==='') {return;}
		$scope.posts.push(
			{title:$scope.title,
			link:$scope.link,
			upvotes:0,
			comments:[
				{author:'Joe',body:'cool post',upvotes:0},
				{author:'Hem',body:"He'll beat this",upvotes:100}

		]});

		$scope.title = ""
		$scope.link = ""
	}

	$scope.incrementUpvotes = function(post) {
		post.upvotes+=1;
	}
  }
]);

app.controller('PostsCtrl',['$scope','$stateParams','posts',function($scope,$stateParams,posts){
	$scope.post = posts.posts[$stateParams.id];
	$scope.addComment = function(){
		if ($scope.body==''){
			return;
		}
		$scope.post.comments.push(
			{
				author:'user',
				body:$scope.body,
				upvotes:0
			}
		);
		$scope.body='';
	}

}]);
