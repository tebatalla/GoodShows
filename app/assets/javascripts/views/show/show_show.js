GoodShows.Views.ShowShow = Backbone.View.extend({
  template: JST['show/show'],

  render: function () {
    var content = this.template({
      show: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  className: 'row show-page'
});