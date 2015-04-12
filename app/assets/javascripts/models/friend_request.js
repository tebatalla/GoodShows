GoodShows.Models.FriendRequest = Backbone.Model.extend({
  urlRoot: '/api/friend_requests',

  accept: function(options) {
    return $.ajax({
      type: 'POST',
      url: this.url(),
      dataType: 'json',
      data: this.attributes,
      success: options.success,
      error: options.error
    });
  },

  user: function () {
    if (!this._user) {
      this._user = new GoodShows.Models.User({
        master: this.master
      });
    }
    return this._user;
  },

  parse: function (response) {
    if (response.user) {
      this.user().set(response.user);
      delete response.user;
    }
    return response;
  }
});