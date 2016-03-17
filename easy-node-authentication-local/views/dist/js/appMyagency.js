angular.module('myAgency', [])
.controller('RequestCtrl', function($scope, $http) {

	load();
	function load(){
		$scope.$emit('LOAD');
	    $http.get("agencyRequest")
	    .then(
	    	function (response) {
	    		console.dir(response);
	    	$scope.requests = response.data;
	   		$scope.$emit('UNLOAD');
		});

		$http.get("myAgencyList")
	    .then(
	    	function (response) {
	    		console.dir(response);
	    	$scope.myAgencyList = response.data;
	   		$scope.$emit('UNLOAD');
		});

	}

    $scope.confirmPartner= function (request_id, req_status){
    	alert(req_status)
    	$scope.$emit('LOAD');
    	$http.put('/responseToRequest', {"request_id":request_id, "req_status":req_status} ,{cache:false})
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
.controller('MyAgencyCtrl', function($scope, $http) {

	load();
	function load(){
		$scope.$emit('LOAD');
		$http.get("/myAgencyList")
	    .then(
	    	function (response) {
	    		console.dir(response);
	    	$scope.myAgencyList = response.data;
	   		$scope.$emit('UNLOAD');
		});

	}
})

.controller('appCtrl',['$scope',function($scope){
		$scope.$on('LOAD',function(){$scope.loading=true});
		$scope.$on('UNLOAD',function(){$scope.loading=false});
	}]);




