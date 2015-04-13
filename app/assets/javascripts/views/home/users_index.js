GoodShows.Views.UsersIndex = Backbone.CompositeView.extend({
  template: JST['home/users_index'],
  render: function () {
    var content = this.template({});
  
    this.$el.html(content);
  
    return this;
  },
});