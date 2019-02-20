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
    console.log("you click like");
  },
  'click .js-dislike'(event, instance) {
    console.log("you click dislike");
  },
  'click .js-delete'(event, instance){
  	var profID = this._id;
  	$("#" + profID).fadeOut("slow", "swing", function () {
  	userDB.remove({_id: profID});
  });
  }
});

Template.addProfile.events({
	'click .js-saveProfile'(event, instance){
	var fName = $("#exampleModal input[name='firstName']").val();
	var lName = $("#exampleModal input[name='lastName']").val();
	var pName = $("#exampleModal input[name='photoName']").val();
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
	//close the modal
  	$("#exampleModal").modal("hide");
  	userDB.insert({'firstName':fName,
  		'lastName':lName, 'img':pName});
  },
});
