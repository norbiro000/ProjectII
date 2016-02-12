angular.module('myPlace', [])
.controller('MyPlaceCtrl', function($scope, $http) {
	$http.get('http://localhost:5000/getPlaceData',{cache: false})
		.success(function(data){
			// alert(data);
			$scope.name = data["name"];
			$scope.price = data["price"][0];
			$scope.items = data["contents"];
			$scope.address = data["address"];
		})
		.error(function(data, status){
			alert(data);
		});
	// $scope.netprice = temp["price"][0]["netprice"];

});