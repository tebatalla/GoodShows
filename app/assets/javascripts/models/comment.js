GoodShows.Models.Comment = Backbone.Model.extend({
  author: function () {
    if (!this._author) {
      this._author = new GoodShows.Models.User([], { comment: this });
    }
    return this._author;
  },

  review: function () {
    if (!this._review) {
      this._review = new GoodShows.Models.Review([], { comment: this });
    }
    return this._review;
  },

  parse: function (response) {
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }
    if (response.review) {
      this.review().set(this.review().parse(response.review));
      delete response.review;
    }

    return response;
  }
});