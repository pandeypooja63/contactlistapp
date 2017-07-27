var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
console.log("hello world from controller");
$scope.flag= false;
var refresh = function() {
$http.get('/contactlist').then(function  (response) {
	console.log('I got the data I requested');
	var data = response.data;
	
		$scope.contactlist= data;
		console.log(data);

	

	});
console.log($scope.flag);

};
$scope.contact={};
refresh();

$scope.addContact=function (){
	console.log($scope.contact);
	var add ={ name : $scope.contact.name,number :$scope.contact.number, email: $scope.contact.email};
	$http.post('/contactlist', add).then(function(response) {
    console.log(response.data);
    refresh();
    
    
    });

};

$scope.remove= function(id){
	console.log(id);
	$http.delete('/contactlist/'+id).then(function(response){
	refresh();
	});
};	
$scope.edit= function(id){
	console.log(id);
	$scope.flag=true;
	$http.get('/contactlist/'+id).then(function(response){
	console.log(response);	
	$scope.contact = response.data;
	refresh();
	});
};

$scope.update=function(){
console.log($scope.contact._id);
	$scope.flag=false;
	$http.put('/contactlist/'+$scope.contact._id,$scope.contact).then(function(response){
	$scope.contactlist=response;
	refresh();

	});
};	
$scope.deselect =function(){
		$scope.flag= false;
		$scope.contact={
			name: "",
			email: "",
			number: ""
		};
	};


}]);