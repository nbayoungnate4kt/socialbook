import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.profile.helpers({
	profAll(){
		return userDB.find({});
	}
});

Template.profile.events({
  'click .js-like'(event, instance) {    
    var profID = this._id;
    var numlikes = userDB.findOne({_id: profID}).like;
    if (!numlikes){
    	numlikes = 0;
    }
    numlikes = numlikes + 1;
    console.log("YoU GoT",numlikes);
    userDB.update({_id:profID},{$set:{'like':numlikes}});
  },
  'click .js-dislike'(event, instance) {
    var profID = this._id;
    var numdislikes = userDB.findOne({_id: profID}).dislike;
    if (!numdislikes){
    	numdislikes = 0;
    }
    numdislikes = numdislikes + 1;
    console.log("YoU GoT",numdislikes);
    userDB.update({_id:profID},{$set:{'dislike':numdislikes}});
  },
  'click .js-delete'(event, instance){
  	var profID = this._id;
  	$("#" + profID).fadeOut("slow", "swing", function () {
  	userDB.remove({_id: profID});
  });
    $('#edited').modal('hide');
  },
  'click .js-edituser'(event, instance){
  	$("#edited").modal('show');
  	userID = this._id;
	$('#usrID').val(userID);
  	$("#modalimg").attr('src', userDB.findOne({_id:userID}).imgsec);
  	$("#First").html(userDB.findOne({_id:userID}).firstName);
  	$("#Last").html(userDB.findOne({_id:userID}).lastName);
  	$("#like").html(userDB.findOne({_id:userID}).like);
  	$("#dislike").html(userDB.findOne({_id:userID}).dislike);
  	console.log("open modal");
  }
});

Template.addProfile.events({
	'click .js-saveProfile'(event, instance){
	var fName = $("#exampleModal input[name='firstName']").val();
	var lName = $("#exampleModal input[name='lastName']").val();
	var pName = $("#exampleModal input[name='photoName']").val();
  var spName = $("#exampleModal input[name='secphotoName']").val();
	if (pName == ""){
		pName="logo2.jpg";
	}
	console.log("The First Name is",fName)
	console.log("The Last Name is",lName)
	console.log("The Photo Name is",pName)
	//rest the form
	$("#exampleModal input[name='firstName']").val('');
	$("#exampleModal input[name='lastName']").val('');
	$("#exampleModal input[name='photoName']").val('');
  $("#exampleModal input[name='secphotoName']").val('');
	//close the modal
  	$("#exampleModal").modal("hide");
  	userDB.insert({'firstName':fName,
  		'lastName':lName, 'img':pName , 'imgsec':spName});
  },
});
