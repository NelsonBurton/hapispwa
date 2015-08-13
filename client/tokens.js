Meteor.subscribe("tokens");

Template.token.events({
  "click .delete": function () {
    Meteor.call("deleteToken", this._id);
  }
});  

Template.body.helpers({
  tokens: function (userID) {
    return Tokens.find({user: userID}, {sort: {createdAt: -1}});
  }
});