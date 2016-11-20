define(function () {
    return ['$scope', '$http', function($scope, $http) {
  
    function resetItem(){
       $scope.user = {
          email : '',
          password : '',
          repeatpassword : '',
          id : ''
       };    
   $scope.displayForm = '';
    }
    resetItem();
     
    $scope.signup = function () {
      var user = $scope.user;
      $http.post('/user/create', user).success(function(data) {
      }).
      error(function(data) {
        console.log(data);
      });
    };
      
$scope.editItem = function () { 
        $scope.displayForm = true;
}
    // $http.get('/user/find',user).success(function(data) {
    // });
 
    }]; 
});