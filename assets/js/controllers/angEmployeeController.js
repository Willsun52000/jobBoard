define(function() {
  return ['$scope', '$http', function($scope, $http) {
    function resetItem() {
      $scope.employee = {
        title: '',
        company: '',
        jobDesc: '',
        type: '',
        createdBy: '',
        id: ''
      };
      $scope.displayForm = '';
      $scope.selectedType = '01';
      $scope.like = false;
    }
    resetItem();
    $scope.validate = function(item) {
      return $scope.selectedType == '' ? item.type == '' : item.type == $scope.selectedType;
    }

    $scope.addItem = function() {
      resetItem();
      $scope.displayForm = true;
    }


    $scope.saveItem = function() {
      if (!$scope.employee.createdBy) {
        $scope.employee.createdBy = $scope.currentUser;
      }
      var emp = $scope.employee;
      if (emp.id.length == 0) {
        $http.post('/employee/create', emp, {
          headers: {
            'X-CSRF-Token': $scope.csrf
          }
        }).success(function(data) {
          $scope.items.unshift(data);
          $scope.displayForm = '';
          removeModal();
        }).
        error(function(data) {
          console.log(data);
        });
      } else {
        $http.post('/employee/update/' + emp.id, emp, {
          headers: {
            'X-CSRF-Token': $scope.csrf
          }
        }).success(function(data) {
          $scope.displayForm = '';
          removeModal();
        }).error(function(data, status, headers, config) {
          alert(data.summary);
        });
      }
    };

    $scope.editItem = function(data) {
      $scope.employee = data;
      $scope.displayForm = true;
    }

    $scope.removeItem = function(data) {
      // if (confirm('Do you really want to delete?')){
      $http['delete']('/employee/' + data.id, {
        headers: {
          'X-CSRF-Token': $scope.csrf
        }
      }).success(function() {
        $scope.items.splice($scope.items.indexOf(data), 1);
      });
      // }
    };

    $scope.toggleLike = function(data) {

      data.like=!data.like;

      if(data.like){
        data.likeAmt=data.likeAmt+1;
        data.likeList.unshift($scope.currentUser);
      }else{
        data.likeAmt=data.likeAmt-1;
        data.likeList.splice(data.likeList.indexOf($scope.currentUser), 1);
      }
      $http.post('/employee/update/' + data.id, {likeList:data.likeList}, {
        headers: {
          'X-CSRF-Token': $scope.csrf
        }
      }).success(function(data) {
        // console.log(data);
      }).error(function(data, status, headers, config) {
        alert(data.summary);
      });
    };

    $http.get('/csrfToken').success(function(data) {
      $scope.csrf = data._csrf;
    });

    if(QC.Login.check()){
      QC.Login.getMe(function(openId, accessToken){ 
        $scope.authorized=true;
        $scope.currentUser=openId;
        $http.get('/employee/query?currentUser='+$scope.currentUser).success(function(data) {
          $scope.items = data;
        });
      });
    }else{
      $scope.authorized=false;
      $scope.currentUser='';
      $http.get('/employee/find?sort=updatedAt DESC&limit=500').success(function(data) {
        $scope.items = data;
      });
    }

    function removeModal() {
      $('.modal').modal('hide');
    }

  }];
});