

angular.module('myPlace', [])
.controller('MyPlaceCtrl', function($scope, $http) {
	$scope.email = window.palceRederData[0]["email"];
	$scope.price = window.palceRederData[0]["price"];
	$scope.items = window.placeContent;
	$scope.address = window.palceRederData[0]["address"]



	$scope.updatePrice = function(price) {
		$http.put('', JSON.stringify({price}) ,{cache:false})
			.success(function (data){
				alert("Update Seccess.");
			})
			.error(function (data, status){
				alert(status);
			});
    };

    $scope.updateAddress = function(address) {
		$http.put('/myPlace', JSON.stringify({address}) ,{cache:false})
			.success(function (data){
				alert("Update Seccess.");
			})
			.error(function (data, status){
				alert(status);
			});
    };

 $scope.delete = function(c_id) {
 		alert(c_id);
		$http.delete('/content/'+c_id ,{cache:false})
			.success(function (data){
				alert("Update Seccess.");
			})
			.error(function (data, status){
				alert(status);
			});
    };

    $scope.edit = function(items) {
		$scope.editcontent = items;
    };

    $scope.update = function(id) {
    	$http.put('/content/'+id, $scope.editcontent.content,{cache:false})
    		.success(function (data){
    			alert("add Success");
    		})
    		.error(function (data, status){
    			alert(status);
    		});
    };

    $scope.clear = function() {
		$scope.newcontent.type = "image";
		$scope.newcontent.title = "";
		$scope.newcontent.description = "";
		$scope.newcontent.url = "";
    };

    $scope.save = function(content){
    	console.dir(content);
    	$http.post('/content',  content ,{cache:false})
			.success(function (data){
				alert("Add Seccess.");
			})
			.error(function (data, status){
				alert(status);
			});
    };

});


