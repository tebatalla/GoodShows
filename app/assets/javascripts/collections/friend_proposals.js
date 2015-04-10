GoodShows.Collections.FriendProposals = Backbone.Collection.extend({
  url: 'api/friend_proposals',
  initialize: function (models, options) {
    if (options) {
      this.master = options.master;
    }
  },
  model: GoodShows.Models.FriendProposal,

  user: function () {
    if (!this._user) {
      this._user = new GoodShows.Collections.Users([], {
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