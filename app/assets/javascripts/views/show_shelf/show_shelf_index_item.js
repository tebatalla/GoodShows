GoodShows.Views.ShowShelvesIndexItem = Backbone.View.extend({
  template: JST['show_shelf/index_item'],
  render: function () {
    var content = this.template({
      shelf: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },
  className: 'shelf-sidebar-item'
});