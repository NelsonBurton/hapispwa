Meteor.subscribe("users");

Template.body.helpers({
  users: function () {
    return Users.find({}, {sort: {createdAt: -1}});
  },
  userCount: function () {
    return Users.find({}).count();
  },
  visible: function(userID) {
    return Session.get("visible" + userID);
  }
});


Template.body.events({
  "submit .new-user": function (event) {
    // Prevent default browser form submit
    // hitting enter at form doesn't add vars to url
    event.preventDefault();

    // Get value from form element
    var email = event.target.email.value.toLowerCase();
    var password = event.target.password.value;

    Meteor.call("addUser", email, password, function (error, result) {
      if(error || result != null) {
        alert(result);
        console.log(error);
      }
    });
    
    // Clear form
    event.target.email.value = "";
    event.target.password.value = "";
  }
});

Template.user.events({
  "click .delete": function () {
    Meteor.call("deleteUser", this._id);
  },
  "click .edit": function () {
    //Meteor.call("deleteUser", this._id);
    newEmail = prompt("Please enter the new email address");
    console.log("newEmail");
    Meteor.call("editUser", this._id, newEmail, function (error, result) {
      if(error || result != null) {
        alert(result);
        console.log(error);
      }
    });
  },
  "click .text": function () {
    currUser = "visible" + this._id;
    Session.set(currUser, !Session.get(currUser));
  },
  "click .add-token": function () {
    Meteor.call("addToken", this._id);
  }
});