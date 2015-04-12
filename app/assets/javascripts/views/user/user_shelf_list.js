GoodShows.Views.ShelfList = Backbone.View.extend({
  template: JST['user/shelf_list'],
  render: function () {
    var content = this.template({
      shelves: this.collection,
      user: this.user
    });
  
    this.$el.html(content);
  
    return this;
  },
  initialize: function (options) {
    if (options) {
      this.user = options.user;
    }
    this.listenTo(this.user, "sync", this.render);
  }
});