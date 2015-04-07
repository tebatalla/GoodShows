GoodShows.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'show-shelves': 'showMyShelves',
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

  showMyShelves: function () {
    this.showShelves = new GoodShows.Collections.ShowShelves();
    this.showShelves.fetch();
    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.showShelves
    });

    this._swapView(view);
  },

  showShelves: function(id) {
    this.showShelves = new GoodShows.Collections.ShowShelves({});
    this.showShelves.fetch({
      data: {
        user_id: id
      }
    });
    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.showShelves,
      userId: id
    });

    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});