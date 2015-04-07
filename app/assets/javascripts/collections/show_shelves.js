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
  }
});