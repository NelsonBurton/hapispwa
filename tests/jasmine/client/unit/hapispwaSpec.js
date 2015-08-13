describe('UsersService', function () {
  'use strict';

  describe('Be able to add user', function () {
    it('should add a user', function () {
      var result = undefined;
      Meteor.call("addUser", "nelsonb@gmail.com", "heyheyhi78")
      expect(Users.findOne({username: "ab@gmail.com"})).toBe(result);
    });
  });
});