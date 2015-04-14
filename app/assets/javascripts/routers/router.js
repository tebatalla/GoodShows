GoodShows.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'show-shelves': 'showMyShelves',
    'profile': 'profile',
    'shows/:id': 'showShow',
    'users/:id': 'profile',
    'users/:id/show-shelves': 'showShelves',
    'users/:id/show-shelves/:shelfId': 'showShelf',
    'show-search?*queryString': 'showSearch'
  },

  home: function () {
    this.user = new GoodShows.Models.User({
      url: 'api/profile'
    });
    this.user.fetch();
    this.users = new GoodShows.Collections.Users([], {
      url: 'api/users'
    });
    var view = new GoodShows.Views.Home({
      model: this.user,
      showShelves: this.user.showShelves(),
      users: this.users
    });

    this._swapView(view);
  },

  profile: function (id) {
    if (!id) {
      this.user = new GoodShows.Models.User({
        url: 'api/profile'
      });
    } else {
      this.user = new GoodShows.Models.User({
        id: id
      });
    }
    this.user.fetch({});
    var view = new GoodShows.Views.UserProfile({
      model: this.user
    });

    this._swapViewWithoutRender(view);
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
    if(this._currentView && this._currentView.shelfView && this._currentView.userId === id) {
      this._currentView.swapShowShelfView(this._shelfModel(shelfId));
    } else {
      this.shelves = new GoodShows.Collections.ShowShelves([], {
        owner_id: id
      });
      this.shelves.fetch({
        data: {
          user_id: id
        }
      });
      this.shelves.allShowsShelf().fetch({
        data: {
          user_id: id
        }
      });
      var view = new GoodShows.Views.ShowShelvesIndex({
        collection: this.shelves,
        userId: id,
        allShelf: this.shelves.allShowsShelf(),
        model: this._shelfModel(shelfId)
      });

      this._swapView(view);
    }
  },

  showMyShelves: function () {
    this.shelves = new GoodShows.Collections.ShowShelves();
    this.shelves.fetch();
    this.shelves.allShowsShelf().fetch();
    var view = new GoodShows.Views.ShowShelvesIndex({
      collection: this.shelves,
      model: this._shelfModel(),
      allShelf: this.shelves.allShowsShelf(),
      userId: this._shelfModel().get('owner_id')
    });

    this._swapView(view);
  },

  showShelves: function(id) {
    if (this._currentView && this._currentView.shelfView && this._currentView.userId === id) {
      this._currentView.swapShowShelfView(this._shelfModel());
    } else {
      this.shelves = new GoodShows.Collections.ShowShelves([],{
        owner_id: id
      });
      this.shelves.fetch({
        data: {
          user_id: id
        }
      });
      this.shelves.allShowsShelf().fetch({
        data: {
          user_id: id
        }
      });
      var view = new GoodShows.Views.ShowShelvesIndex({
        collection: this.shelves,
        model: this._shelfModel(),
        allShelf: this.shelves.allShowsShelf(),
        userId: id
      });

      this._swapView(view);
    }
  },

  showShow: function(id) {
    this.show = new GoodShows.Models.Show({
      id: id
    });
    this.shelves = new GoodShows.Collections.ShowShelves();
    this.show.fetch();
    this.shelves.fetch();
    var view = new GoodShows.Views.ShowShow({
      model: this.show,
      shelves: this.shelves
    });

    this._swapViewWithoutRender(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _swapViewWithoutRender: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
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