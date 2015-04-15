GoodShows.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',

  user: function () {
    if (!this._user) {
      this._user = new GoodShows.Models.User([], { review: this });
    }
    return this._user;
  },

  show: function () {
    if (!this._show) {
      this._show = new GoodShows.Models.Show([], { review: this });
    }
    return this._show;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new GoodShows.Collections.Comments([], { review: this });
    }
    return this._comments;
  },

  parse: function (response) {
    if (response.user) {
      this.user().set(response.user, { parse: true });
      delete response.user;
    }
    if (response.show) {
      this.show().set(response.show, { parse: true });
      delete response.show;
    }
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    return response;
  }, 
});