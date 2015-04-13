GoodShows.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',

  user: function () {
    if (!this._user) {
      this._user = new GoodShows.Models.User([], { review: this });
    }
    return this._user;
  },

  parse: function (response) {
    if (response.user) {
      this.user().set(response.user, { parse: true });
      delete response.user;
    }

    return response;
  }, 
});