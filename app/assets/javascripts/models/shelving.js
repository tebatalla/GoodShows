GoodShows.Models.Shelving = Backbone.Model.extend({
  showShelf: function () {
    if (!this._showShelf) {
      this._showShelf = new GoodShows.Models.ShowShelf([], { shelving: this });
    }
    return this._showShelf;
  },

  show: function () {
    if (!this._show) {
      this._show = new GoodShows.Models.Show([], { shelving: this });
    }
    return this._show;
  },

  parse: function(response) {
    if (response.shelf) {
      this.showShelf().set(response.shelf, { parse: true });
      delete response.shelf;
    }

    if (response.show) {
      this.show().set(response.show, { parse: true });
      delete response.show;
    }

    return response;
  }
});