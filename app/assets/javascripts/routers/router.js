GoodShows.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'show-shelves': 'showMyShelves',
    'shows/:id': 'showShow',
    'users/:id': 'profile',
    'users/:id/show-shelves': 'showShelves',
    'users/:id/show-shelves/:shelfId': 'showShelf',
    'show-search?*queryString': 'showSearch'
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

  showSearch: function(queryString) {
    this.showResults = new GoodShows.Collections.ShowSearchResults();
    this.showResults.fetch({
      data: queryString
    });
    var view = new GoodShows.Views.ShowSearchResultIndex({
      collection: this.showResults,
      query: $.parseParams(queryString)
    });

    this._swapView(view);
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

  showShow: function(id) {
    this.show = new GoodShows.Models.Show({
      id: id
    });
    this.shelves = new GoodShows.Collections.ShowShelves();
    this.shelves.fetch();
    this.show.fetch();
    var view = new GoodShows.Views.ShowShow({
      model: this.show,
      shelves: this.shelves
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