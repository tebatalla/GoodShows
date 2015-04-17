GoodShows.Models.FeedEvent = Backbone.Model.extend({
  parse: function (response) {
    if(response.user) {
      this.user().set(response.user);
      delete response.user;
    }

    if(response.comment) {
      this.comment().set(this.comment().parse(response.comment));
      delete response.comment;
    }

    if(response.review) {
      this.review().set(this.review().parse(response.review));
      delete response.review;
    }

    if(response.shelving) {
      this.shelving().set(this.shelving().parse(response.shelving));
      delete response.shelving;
    }

    return response;
  },

  user: function () {
    if (!this._user) {
      this._user = new GoodShows.Models.User([], { feedEvent: this });
    }
    return this._user;
  },

  comment: function () {
    if (!this._comment) {
      this._comment = new GoodShows.Models.Comment([], { feedEvent: this });
    }
    return this._comment;
  },

  review: function () {
    if (!this._review) {
      this._review = new GoodShows.Models.Review([], { feedEvent: this });
    }
    return this._review;
  },

  shelving: function () {
    if (!this._shelving) {
      this._shelving = new GoodShows.Models.Shelving([], { feedEvent: this });
    }
    return this._shelving;
  }
});