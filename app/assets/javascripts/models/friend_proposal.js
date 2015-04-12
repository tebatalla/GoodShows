GoodShows.Models.FriendProposal = Backbone.Model.extend({
  urlRoot: '/api/friend_proposals',

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