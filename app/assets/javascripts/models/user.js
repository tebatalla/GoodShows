GoodShows.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users/',

  showShelves: function () {
    if (!this._showShelves) {
      this._showShelves = new GoodShows.Collections.ShowShelves([], { owner: this });
    }
    return this._showShelves;
  },

  friends: function () {
    if (!this._friends) {
      this._friends = new GoodShows.Collections.Users([], { master: this });
    }
    return this._friends;
  },

  friendRequests: function () {
    if (!this._friendRequests) {
      this._friendRequests = new GoodShows.Collections.FriendRequests([], { master: this });
    }
    return this._friendRequests;
  },

  friendProposals: function () {
    if (!this._friendProposals) {
      this._friendProposals = new GoodShows.Collections.FriendProposals([], { master: this });
    }
    return this._friendProposals;
  },

  parse: function (response) {
    if (response.show_shelves) {
      this.showShelves().set(response.show_shelves, { parse: true });
      delete response.show_shelves;
    }
    if (response.friends) {
      this.friends().set(response.friends, { parse: true });
      delete response.friends;
    }
    if (response.friend_proposals) {
      this.friendProposals().set(response.friend_proposals, { parse: true });
      delete response.friend_proposals;
    }
    if (response.friend_requests) {
      this.friendRequests().set(response.friend_requests, {parse: true });
      delete response.friend_requests;
    }

    return response;
  },

  initialize: function(options) {
    if (options && options.url) {
      this.url = options.url;
    }
  }
});