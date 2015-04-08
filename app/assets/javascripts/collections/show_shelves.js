GoodShows.Collections.ShowShelves = Backbone.Collection.extend({
  model: GoodShows.Models.ShowShelf,
  url: '/show_shelves/',

  getOrFetch: function (id) {
    var showShelf = this.get(id);

    if (!showShelf) {
      showShelf = new GoodShows.Models.ShowShelf({ id: id });
      showShelf.fetch({
        success: function () {
          this.add(showShelf);
        }.bind(this),
        error: function () {
          Backbone.history.navigate('', { trigger: true });
        }
      });
    } else {
      showShelf.fetch();
    }

    return showShelf;
  },

  parse: function (response) {
    var shows = [];
    _.each(response, function (shelf) {
      _.each(shelf.shows, function (show) {
        shows.push(show);
      });
    });
    this.allShowsShelf().set('shows', shows);

    return response;
  },

  allShowsShelf: function () {
    if(!this._allShowsShelf) {
      this._allShowsShelf = new GoodShows.Models.ShowShelf({
        title: 'All',
        id: 0
      });
    }

    return this._allShowsShelf;
  }
});