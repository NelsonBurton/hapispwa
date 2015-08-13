Users = new Mongo.Collection("users");
Tokens = new Mongo.Collection("tokens");

validateEmail = function (email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

validatePassword = function (password) {
  var re = /^(?=.*\d).{8,}$/i;
  return re.test(password);
}

if (Meteor.isServer) {
  Meteor.publish("users", function () {
    return Users.find({});
  });
  Meteor.publish("tokens", function () {
    return Tokens.find({});
  });
}

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  Meteor.subscribe("tokens");

  Template.body.helpers({
    users: function () {
      return Users.find({}, {sort: {createdAt: -1}});
    },
    userCount: function () {
      return Users.find({}).count();
    },
    tokens: function (userID) {
      return Tokens.find({user: userID}, {sort: {createdAt: -1}});
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
    "click .add-token": function () {
      Meteor.call("addToken", this._id);
    },
    "click .text": function () {
      currUser = "visible" + this._id      
      Session.set(currUser, !Session.get(currUser));
    }
  });

  Template.token.events({
    "click .delete": function () {
      Meteor.call("deleteToken", this._id);
    }
  });  
}

Meteor.methods({
  addUser: function (email, password) {
    if (!validateEmail(email)) {
      return "Invalid email format";
    } 
    else if(!validatePassword(password)) {
      return "Password must be at least 8 characters and contain a number";
    }
    else {
      // Insert a user into the collection
      if (Users.findOne({username: email}) == null) {
        Users.insert({
          username: email,
          pw: password,
          createdAt: new Date(),
          updatedAt: new Date() 
        });
      }
      else {
        return "User already exists";
      }
    }
  },
  editUser: function(userID, newEmail) {
    if (!validateEmail(newEmail)) {
      return "Invalid email format";
    }
    else {
      Users.update({_id: userID}, 
                   {$set: {username: newEmail, 
                           updatedAt: new Date() }})
    }
  },
  deleteUser: function(userID) {
    Users.remove({_id: userID});   
    Tokens.remove({user: userID});
  },
  addToken: function(userID) {
    token = Random.hexString(20).toLowerCase();
    console.log(token); //why is this different?
    if (Tokens.findOne({tokenString: token}) == null) {
      Tokens.insert({
        tokenString: token,
        user: userID, 
        createdAt: new Date()
      });
    }
  },
  deleteToken: function(tokenID) {
    Tokens.remove({_id: tokenID});
  }

});
