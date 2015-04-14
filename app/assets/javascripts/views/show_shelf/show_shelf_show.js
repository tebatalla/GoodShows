GoodShows.Views.ShowShelfShow = Backbone.CompositeView.extend({
  template: JST['show_shelf/show'],
  render: function () {
    var content = this.template({
      shelf: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  initialize: function (options) {
    if (options) {
      this.shows = options.shows;
    }

    this.listenTo(this.shows, 'add', this.addShowsToShelfShow);
    this.shows.each(this.addShowsToShelfShow.bind(this));
    this.listenTo(this.shows, 'remove', this.removeShowFromShelf.bind(this));
    this.listenTo(this.model, 'sync', this.render);
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

  removeShowFromShelf: function (show) {
    _(this.subviews('.shelf-show-items')).each(function (subview) {
      if(subview.model == show) {
        this.removeSubview('.shelf-show-items', subview);
      }
    }.bind(this));
  },

  addShowsToShelfShow: function (show) {
    var showShelfShowItem = new GoodShows.Views.ShowShelfShowItem({
      model: show,
      collection: this.shows,
      shelves: this.collection,
      shelf: this.model
    });
    this.addSubview('.shelf-show-items', showShelfShowItem);
  },
  className: 'shelf-show-wrapper'
});