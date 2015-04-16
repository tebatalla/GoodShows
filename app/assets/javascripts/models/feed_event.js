GoodShows.Models.FeedEvent = Backbone.Model.extend({
  parse: function (response) {
    if(response.user) {
      this.user().set(response.user, { parse: true });
      delete response.user;
    }

    if(response.comment) {
      this.comment().set(response.comment, { parse: true });
      delete response.comment;
    }

    if(response.review) {
      this.review().set(response.review, { parse: true });
      delete response.review;
    }

    if(response.shelving) {
      this.shelving().set(response.shelving, { parse: true });
      delete response.shelving;
    }

    return response;
  },

  user: function () {
    if (!this._user) {
      this._user = new GoodShows.Models.User([], { event: this });
    }
    return this._user;
  },

  comment: function () {
    if (!this._comment) {
      this._comment = new GoodShows.Models.Comment([], { event: this });
    }
    return this._comment;
  },

  review: function () {
    if (!this._review) {
      this._review = new GoodShows.Models.Review([], { event: this });
    }
    return this._review;
  },

  shelving: function () {
    if (!this._shelving) {
      this._shelving = new GoodShows.Models.Shelving([], { event: this });
    }
    return this._shelving;
  }
});