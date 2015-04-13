GoodShows.Views.ShowShow = Backbone.View.extend({
  template: JST['show/show'],

  render: function () {
    var content = this.template({
      show: this.model
    });
  
    this.$el.html(content);

    this.$('.add-to-shelf').html(this.shelvesButton.$el);
  
    return this;
  },

  initialize: function (options) {
    if (options.shelves) {
      this.shelves = options.shelves;
    }

    this.shelvesButton = new GoodShows.Views.ShowShelfButton({
      collection: this.shelves,
      show: this.model
    });

    this.listenTo(this.model, 'sync', this.render);

  },

  className: 'row show-page',

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.shelvesButton && this.shelvesButton.remove();
  }
});