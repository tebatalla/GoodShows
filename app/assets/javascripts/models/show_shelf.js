GoodShows.Models.ShowShelf = Backbone.Model.extend({
  urlRoot: '/show_shelves/',

  initialize: function(options) {
    if(options.userId){
      this.userId = options.userId;
    }
  }
});