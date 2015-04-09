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

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  }
});