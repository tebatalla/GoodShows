GoodShows.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'show-shelves': 'showMyShelves',
    'user/:id': 'profile',
    'user/:id/show-shelves': 'showShelves',
    'user/:id/show-shelves/:shelfId': 'showShelf'
  },

  home: function () {
    this.shelves = new GoodShows.Collections.ShowShelves();
    this.shelves.fetch();
    var view = new GoodShows.Views.Home({
      showShelves: this.shelves
    });

    this._swapView(view);
  },

  profile: function (id) {

  },

  showShelf: function(id, shelfId){
    this.shelves = new GoodShows.Collections.ShowShelves({});
    this.shelves.fetch({
      data: {
        user_id: id
      }
    });

    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.shelves,
      userId: id,
      model: this._shelfModel(shelfId)
    });

    this._swapView(view);
  },

  showMyShelves: function () {
    this.shelves = new GoodShows.Collections.ShowShelves();
    this.shelves.fetch();
    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.shelves,
      model: this._shelfModel(),
      userId: this._shelfModel().get('owner_id')
    });

    this._swapView(view);
  },

  showShelves: function(id) {
    this.shelves = new GoodShows.Collections.ShowShelves({});
    this.shelves.fetch({
      data: {
        user_id: id
      }
    });
    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.shelves,
      model: this._shelfModel(),
      userId: id
    });

    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _shelfModel: function(shelfId) {
    var shelf;
    if (shelfId) {
      shelf = this.shelves.getOrFetch(shelfId);
    } else {
      shelf = this.shelves.allShowsShelf();
    }

    return shelf;
  }
});