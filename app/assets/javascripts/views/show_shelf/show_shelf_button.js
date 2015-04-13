GoodShows.Views.ShowShelfButton = Backbone.View.extend({
  template: JST['show_shelf/button'],

  render: function () {
    var content = this.template({
      shelves: this.collection,
      show: this.show,
      hasShow: this.hasShow
    });
  
    this.$el.html(content);
  
    return this;
  },

  className: 'btn-group',

  initialize: function (options) {
    if (options) {
      this.show = options.show;
    }

    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    'click .add-show-to-shelf': "addShowToShelf"
  },

  addShowToShelf: function (event) {
    event.preventDefault();
    var shelfId = $(event.currentTarget).data('id');
    var shelfModel = this.collection.getOrFetch(shelfId);
    shelfModel.addShow(this.show, function() {
      shelfModel.shows().add(this.show);
      this.render();
    }.bind(this));
  },

  hasShow: function(shelf, show) {
    return _.contains(shelf.shows().pluck('id'), show.id);
  }
});