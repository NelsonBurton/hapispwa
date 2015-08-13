Meteor.publish("tokens", function () {
  return Tokens.find({});
});

Meteor.methods({
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