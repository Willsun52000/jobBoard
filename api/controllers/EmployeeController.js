/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
    res.view(null, {
        title: "Employee"
    });
  },
  login: function (req, res) {
    res.view(null, {
        title: "Employee"
    });
  },
	category: function (req, res) {
    res.view(null, {
        title: "Category"
    });
  }
};

