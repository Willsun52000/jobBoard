define(function (require) {
   
  var angular = require('angular'),
      Controllers = angular.module('controllers', []);
   
  Controllers.controller('angEmpController', require('controllers/angEmployeeController'));
  Controllers.controller('angUsrController', require('controllers/angUserController'));
   
  return Controllers;
   
});