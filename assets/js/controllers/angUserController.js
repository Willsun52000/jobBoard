define(function() {
  return ['$scope', '$http', '$location', function($scope, $http, $location) {

    function resetItem() {
      $scope.user = {
        userid: '',
        password: '',
        repeatpassword: '',
        error: ''
      };
      $scope.displayForm = '';
    }
    resetItem();

    $scope.signup = function() {
      var user = $scope.user;

      $http.get('/user/find?userid=' + user.userid).success(function(data) {
        if (data != null && data.length > 0) {
          user.error = "用户名已存在";
        } else {
          $http.post('/user/create', user, {
            headers: {
              'X-CSRF-Token': $scope.csrf
            }
          }).success(function(data) {}).
          error(function(data) {
            console.log(data);
          });
          removeModal();
        }
      });
    };

    $scope.login = function() {
      var user = $scope.user;

      $http.get('/user/find?userid=' + user.userid+'&password＝'+user.password).success(function(data) {
        if (data == null) {
          user.error = "用户名密码错误";
        } else {
          // $location.path('manage');
        }
      });
    };

    $scope.addItem = function() {
      resetItem();
      $scope.displayForm = true;
    }


    $http.get('/csrfToken').success(function(data) {
      $scope.csrf = data._csrf;
    });
    // $http.get('/user/find',user).success(function(data) {
    // });

    function removeModal() {
      $('.modal').modal('hide');
    }

  }];
});