validateEmail = function (email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

validatePassword = function (password) {
  var re = /^(?=.*\d).{8,}$/i;
  return re.test(password);
}

Meteor.publish("users", function () {
  return Users.find({});
});

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
  }
});