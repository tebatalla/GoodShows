GoodShows.Views.ShowShelfShow = Backbone.CompositeView.extend({
  template: JST['show_shelf/show'],
  render: function () {
    var content = this.template({
      shelf: this.model
    });
  
    this.$el.html(content);

    // this.model.shows().each( function (show) {

    // })
  
    return this;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  }
});