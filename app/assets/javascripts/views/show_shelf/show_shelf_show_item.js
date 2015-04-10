GoodShows.Views.ShowShelfShowItem = Backbone.View.extend({
  template: JST['show_shelf/show_item'],

  render: function () {
    var content = this.template({
      show: this.model,
      shelves: this.shelves,
      shelf: this.shelf,
      shelvesWithShow: this.shelvesWithShow.bind(this)
    });
  
    this.$el.html(content);
  
    return this;
  },

  initialize: function (options) {
    if (options) {
      this.shelves = options.shelves;
      this.shelf = options.shelf;
    }
    this.listenTo(this.shelves, 'sync', this.render);
  },

  tagName: 'tr',

  events: {
    'click .remove-show': 'removeShowFromShelf'
  },

  removeShowFromShelf: function() {
    this.model.removeFromShelf({
      success: function () {
        this.collection.remove(this.model);
      }.bind(this)
    });
  },

  hasShow: function(shelf, show) {
    return _.contains(shelf.shows().pluck('id'), show.id);
  },

  shelvesWithShow: function(shelves, show) {
    var shelvesWithShow = [];
    shelves.each(function (shelf) {
      this.hasShow(shelf, show) && shelvesWithShow.push(shelf);
    }.bind(this));

    return shelvesWithShow;
  }
});