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
  // login: function (req, res) {
  //   res.view(null, {
  //       title: "Employee"
  //   });
  // }, 
	category: function (req, res) {
    res.view(null, {
        title: "Category"
    });
  },
  query: function (req, res) {
    Employee.find({sort:'updatedAt DESC', limit:1000}).exec(function (err, data){
      if (err) {
        return res.serverError(err);
      }

      currentUser = req.param('currentUser');
      for (var i = 0; i < data.length; i++) {
        if(typeof(data[i].likeList)=="undefined"){
          data[i].likeList=[];
        }
        data[i].like = data[i].likeList.indexOf(currentUser) > -1;
        data[i].likeAmt = data[i].likeList.length;
      }
      return res.json(data);
    });
  },
};

