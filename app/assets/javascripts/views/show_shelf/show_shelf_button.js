GoodShows.Views.ShowShelfButton = Backbone.View.extend({
  template: JST['show_shelf/button'],

  render: function () {
    var content = this.template({
      shelves: this.collection
    });
  
    this.$el.html(content);
  
    return this;
  },

  className: 'btn-group',

  initialize: function (options) {
    if (options.show) {
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
    shelfModel.addShow(this.show);
  }
});