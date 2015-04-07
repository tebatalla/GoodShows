GoodShows.Models.ShowShelf = Backbone.Model.extend({
  urlRoot: '/show_shelves/',

  initialize: function(options) {
    this.userId = options.userId;
  }
});