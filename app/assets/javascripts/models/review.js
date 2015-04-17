GoodShows.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',

  postComment: function(comment, options) {
    return $.ajax({
      type: 'POST',
      url: '/api/reviews/' + this.id + '/comment',
      dataType: 'json',
      data: comment,
      success: options.success,
      error: options.error
    });
  },

  user: function () {
    if (!this._user) {
      this._user = new GoodShows.Models.User({ review: this });
    }
    return this._user;
  },

  show: function () {
    if (!this._show) {
      this._show = new GoodShows.Models.Show({ review: this });
    }
    return this._show;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new GoodShows.Collections.Comments({ review: this });
    }
    return this._comments;
  },

  parse: function (response) {
    if (response.user) {
      this.user().set(response.user);
      delete response.user;
    }
    if (response.show) {
      this.show().set(this.show().parse(response.show));
      delete response.show;
    }
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    return response;
  }, 
});