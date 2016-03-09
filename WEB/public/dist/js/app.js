var address = "http://localhost:8888";

angular.module('myPlace', [])
.controller('MyPlaceCtrl', function($scope, $http) {
	$http.get(address+'/api/place',{cache: false})
		.success(function(data){
			$scope.name = data[0]["placename"];
			$scope.price = data[0]["price"][0];
			$scope.contents = data[0]["contents"];
			$scope.items = data[0]["items"];
			$scope.address = data[0]["address"];
			console.dir(data);
		})
		.error(function(data, status){
			alert(data);
		});
	// $scope.netprice = temp["price"][0]["netprice"];


	$scope.updatePrice = function(price) {
		$http.put(address+'/api/place/56bdba2b5a03147305878a1f', JSON.stringify({price}) ,{cache:false})
			.success(function (data){
				alert("Update Seccess.");
			})
			.error(function (data, status){
				alert(status);
			});
    };
});