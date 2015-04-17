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
  
    return this;
  },
  className: 'row',
});