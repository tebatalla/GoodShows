GoodShows.Collections.ShowShelves = Backbone.Collection.extend({
  model: function (attrs, options) {
    if(this.owner_id) {
      return new GoodShows.Models.ShowShelf(attrs, {
        owner_id: this.owner_id
      });
    } else {
      return new GoodShows.Models.ShowShelf(attrs,options);
    }
  },

  url: '/api/show_shelves/',

  getOrFetch: function (id) {
    var showShelf = this.get(id);

    if (!showShelf) {
      showShelf = new GoodShows.Models.ShowShelf({
        id: id,
        owner_id: this.owner_id
      });
      showShelf.fetch({
        data: {
          user_id: this.owner_id
        },
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

    this.allShowsShelf().shows().set(shows);

    return response;
  },

  allShowsShelf: function () {
    if(!this._allShowsShelf) {
      this._allShowsShelf = new GoodShows.Models.ShowShelf({
        url: 'api/show_shelves_all'
      });
    }

    return this._allShowsShelf;
  },

  initialize: function(attrs, options) {
    if(options) {
      this.owner_id = options.owner_id;
    }
  },

  comparator: 'created_at'
});