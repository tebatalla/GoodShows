GoodShows.Collections.FriendRequests = Backbone.Collection.extend({
  url: 'api/friend_requests',
  initialize: function (models, options) {
    if (options) {
      this.master = options.master;
    }
  },
  model: GoodShows.Models.FriendRequest,

  user: function () {
    if (!this._user) {
      this._user = new GoodShows.Models.Users([], {
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