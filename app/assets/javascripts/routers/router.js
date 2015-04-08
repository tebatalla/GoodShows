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
    this.showShelves = new GoodShows.Collections.ShowShelves();
    this.showShelves.fetch();
    var view = new GoodShows.Views.Home({
      showShelves: this.showShelves
    });

    this._swapView(view);
  },

  profile: function (id) {

  },

  showShelf: function(id, shelfId){
    this.showShelves = new GoodShows.Collections.ShowShelves({});
    this.showShelves.fetch({
      data: {
        user_id: id
      }
    });

    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.showShelves,
      userId: id,
      model: this._shelfModel(id, shelfId)
    });

    this._swapView(view);
  },

  showMyShelves: function () {
    this.showShelves = new GoodShows.Collections.ShowShelves();
    this.showShelves.fetch();
    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.showShelves,
      model: this._shelfModel()
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
      model: this._shelfModel(id),
      userId: id
    });

    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _shelfModel: function(id, shelfId) {
    var shelf;
    if (shelfId) {
      shelf = this.showShelves.getOrFetch(shelfId);
    } else if (id) {
      shelf = new GoodShows.Models.ShowShelf({});
      shelf.fetch({
        data: {
          "user_id": id
        }
      });
    } else {
      shelf = new GoodShows.Models.ShowShelf({});
      shelf.fetch();
    }

    return shelf;
  }
});