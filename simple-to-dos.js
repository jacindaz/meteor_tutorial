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

  Template.task.events({
    // what is this click .toggle-checked ???
    // is it registering an event to listen for ???
    "click .toggle-checked": function() {
      // set the checked property to the opposite of its current value
      // this is an individual task object
      // _id is the id of the task document, which can be used to refer to that document
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });
}
