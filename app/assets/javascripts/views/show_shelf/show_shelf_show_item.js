GoodShows.Views.ShowShelfShowItem = Backbone.View.extend({
  template: JST['show_shelf/show_item'],

  render: function () {
    var content = this.template({
      show: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  }
});