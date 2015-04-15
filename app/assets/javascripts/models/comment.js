GoodShows.Models.Comment = Backbone.Model.extend({
  author: function () {
    if (!this._author) {
      this._author = new GoodShows.Models.User([], { comment: this });
    }
    return this._author;
  },

  parse: function (response) {
    if (response.author) {
      this.author().set(response.author, { parse: true });
      delete response.author;
    }

    return response;
  }
});