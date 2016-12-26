/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title:{
      type:"string",
      required:false
    },      
    company:{
      type:"string",
      required:false
    },
    jobDesc:{
      type:"longtext",
      required:true
    },      
    type:{
      type:"string",
      required:false
    },     
    createdBy:{
      type:"string",
      required:false
    },
    likeList:{
      type:"array",
      required:false
    }
  }
};

