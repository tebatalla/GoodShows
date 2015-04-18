GoodShows.Views.ShelvingEventItem = Backbone.View.extend({
  template: JST['home/feed_shelving_item'],
  render: function () {
    var content = this.template({
      activity: this.model,
      shelf: this.model.shelving().showShelf(),
      show: this.model.shelving().show(),
      user: this.model.user()
    });
  
    this.$el.html(content);
    this.addShelvesButton();
  
    return this;
  },
  className: 'row feed-item',

  initialize: function (options) {
    if (options) {
      this.shelves = options.shelves;
    }
  },

  addShelvesButton: function () {
    if(!this.shelvesButton) {
      this.shelvesButton = new GoodShows.Views.ShowShelfButton({
        collection: this.shelves,
        show: this.model.shelving().show()
      });

    }
    this.$('.add-to-shelf').html(this.shelvesButton.render().$el);
  },
});