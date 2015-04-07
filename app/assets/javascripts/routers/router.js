GoodShows.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'user/:id': 'profile',
    'user/:id/show-shelves': 'showShelves'
  },

  home: function () {
    this.showShelves = new GoodShows.Collections.ShowShelves();
    this.showShelves.fetch();
    var view = new GoodShows.Views.Home({
      showShelves: this.showShelves
    });

    this._swapView(view);
  },

  profile: function (id) {

  },

  showShelves: function(id) {
    this.showShelves = new GoodShows.Collections.ShowShelves({
      userId: id
    });
    this.showShelves.fetch();
    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.showShelves
    });

    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});