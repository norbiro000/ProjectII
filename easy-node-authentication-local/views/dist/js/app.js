angular.module('myPlace', [])
.controller('MyPlaceCtrl', function($scope, $http) {
	// $scope.email = window.palceRederData[0]["email"];
	// $scope.price = window.palceRederData[0]["price"];
	// $scope.items = window.placeContent;
	// $scope.address = window.palceRederData[0]["address"];


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

    $scope.save = function(service){
    	console.dir(service);
    	$http.post('/service',  service ,{cache:false})
			.success(function (data){
				alert("Add Seccess.");
			})
			.error(function (data, status){
				alert(status);
			});
    };


    $scope.apush = function(){
    	$scope.newservice.tranfer.push({});
    }

    $scope.push = function(){
    	$scope.newservice.price.push({});
    }
})
.controller('MyServiceCtrl', function($scope, $http) {
	init();


	function init(){
		$http.get('/service' ,{cache:false})
			.success(function (data){
				$scope.services = data;
				console.dir($scope.services)
			})
			.error(function (data, status){
				alert(status);
			});
	}

	$scope.getAllService = function() {
		$http.get('/service' ,{cache:false})
			.success(function (data){
				$scope.services = data;
			})
			.error(function (data, status){
				alert(status);
			});
    };

    $scope.edit = function(items) {
		$scope.editcontent = items;
    };

    $scope.delete = function(c_id) {
		$http.delete('/service/'+c_id ,{cache:false})
			.success(function (data){
				init()
			})
			.error(function (data, status){
				alert(status);
			});
    };

    $scope.push = function(){
    	alert();
    	$scope.newservice.tranfer.push('');
    }
});


angular.module('myCustomer', [])
.controller('customersCtrl', function($scope, $http) {

	load();
	function load(){
		$scope.$emit('LOAD');
	    $http.get("voucher")
	    .then(
	    	function (response) {
	    		console.dir(response.data);
	    	$scope.names = response.data;
	   		$scope.$emit('UNLOAD');
		});

	}

    $scope.filterType0  = function(item){
    	return item.state === 0;
    }

    $scope.filterType1  = function(item){
    	return item.state === 1;
    }

    $scope.filterType2  = function(item){
    	return item.state === 2;
    }

    $scope.filterType3  = function(item){
    	return item.state === 3;
    }

    $scope.confirmBooking= function (item_id, state){
    	$scope.$emit('LOAD');
    	$http.put('/voucher/state/'+item_id, JSON.stringify({state}) ,{cache:false})
			.success(function (data){
				load();
				$scope.$emit('UNLOAD');
			})
			.error(function (data, status){
				alert(status);
				$scope.$emit('UNLOAD');
			});
    }

})
.controller('appCtrl',['$scope',function($scope){
		$scope.$on('LOAD',function(){$scope.loading=true});
		$scope.$on('UNLOAD',function(){$scope.loading=false});
	}]);




