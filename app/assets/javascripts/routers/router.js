GoodShows.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'profile': 'profile',
    'shows/:id': 'showShow',
    'shows/:showId/reviews/new': 'newReview',
    'shows/:showId/reviews/:reviewId': 'showReview',
    'shows/:showId/reviews/:reviewId/edit': 'editReview',
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

  newReview: function(showId) {
    this.show = new GoodShows.Models.Show({
      id: showId
    });
    this.show.fetch();
    var view = new GoodShows.Views.ReviewForm({
      show: this.show
    });

    this._swapViewWithoutRender(view);
  },

  editReview: function(showId, reviewId) {
    this.show = new GoodShows.Models.Show({
      id: showId
    });
    this.show.fetch();
    var view = new GoodShows.Views.ReviewForm({
      show: this.show,
      model: this.show.reviews().getOrFetch(reviewId)
    });

    this._swapView(view);
  },

  showReview: function(showId, reviewId) {
    this.show = new GoodShows.Models.Show({
      id: showId
    });
    this.show.fetch();
    var view = new GoodShows.Views.ReviewShow({
      show: this.show,
      model: this.show.reviews().getOrFetch(reviewId)
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
      this.user = new GoodShows.Models.User({
        id: id
      });
      this.user.fetch();
      this.user.showShelves().allShowsShelf().fetch({
        data: {
          user_id: id
        }
      });
      var view = new GoodShows.Views.ShowShelvesIndex({
        collection: this.user.showShelves(),
        model: this._shelfModel(shelfId),
        allShelf: this.user.showShelves().allShowsShelf(),
        user: this.user
      });

      this._swapViewWithoutRender(view);
    }
  },

  showShelves: function(id) {
    if (this._currentView && this._currentView.shelfView && this._currentView.userId === id) {
      this._currentView.swapShowShelfView(this._shelfModel());
    } else {
      this.user = new GoodShows.Models.User({
        id: id
      });
      this.user.fetch();
      this.user.showShelves().allShowsShelf().fetch({
        data: {
          user_id: id
        }
      });
      var view = new GoodShows.Views.ShowShelvesIndex({
        collection: this.user.showShelves(),
        model: this._shelfModel(),
        allShelf: this.user.showShelves().allShowsShelf(),
        user: this.user
      });

      this._swapViewWithoutRender(view);
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
      shelf = this.user.showShelves().getOrFetch(shelfId);
    } else {
      shelf = this.user.showShelves().allShowsShelf();
    }

    return shelf;
  }
});