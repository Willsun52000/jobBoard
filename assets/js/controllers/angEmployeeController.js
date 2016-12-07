define(function() {
  return ['$scope', '$http', function($scope, $http) {

    function resetItem() {
      $scope.employee = {
        title: '',
        company: '',
        jobDesc: '',
        type: '',
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
        }).
        error(function(data, status, headers, config) {
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

    $http.get('/csrfToken').success(function(data) {
      $scope.csrf = data._csrf;
    });

    $http.get('/employee/find?sort=updatedAt DESC&limit=1000').success(function(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].index = i;
      }
      $scope.items = data;
    });

    function removeModal() {
      $('.modal').modal('hide');
    }

  }];
});