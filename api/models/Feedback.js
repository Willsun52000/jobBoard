/**
 * Feedback.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	userid:{
      type:"string",
      required:true
    },      
    jobid:{
      type:"string",
      required:true
    }
  }
};

