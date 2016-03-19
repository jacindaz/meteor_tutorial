Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // this code only runs on the client
  Template.body.helpers({
    tasks: function () {
      // shows newest tasks at the top
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // prevent default browser form submit
      event.preventDefault();

      // get value from form element
      // this is what I type in the text box
      var text = event.target.text.value;

      // insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
    }
  });
}
