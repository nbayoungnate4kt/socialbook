import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';



Template.profile.events({
  'click .js-like'(event, instance) {
    console.log("you click like");
  },
  'click .js-dislike'(event, instance) {
    console.log("you click dislike");
  },
});
