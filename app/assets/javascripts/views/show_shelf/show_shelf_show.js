GoodShows.Views.ShowShelfShow = Backbone.CompositeView.extend({
  template: JST['show_shelf/show'],
  render: function () {
    var content = this.template({
      shelf: this.model,
      collection: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  initialize: function () {
    this.listenTo(this.model.shows(), 'add', this.addShowsToShelfShow);
    this.listenTo(this.model, 'sync', this.render);
    this.model.shows().each(this.addShowsToShelfShow.bind(this));
  },

  events: {
    'click .delete-shelf': 'deleteShelf'
  },

  deleteShelf: function (event) {
    event.preventDefault();
    if (this.model.id !== 0) {
      this.model.destroy({
        success: function () {
          Backbone.history.navigate('show-shelves', { trigger: true });
        }
      });
    } 
  },

  addShowsToShelfShow: function (show) {
    var showShelfShowItem = new GoodShows.Views.ShowShelfShowItem({
      model: show,
      shelves: this.collection,
      shelf: this.model
    });
    this.addSubview('.shelf-show-items', showShelfShowItem);
  }
});