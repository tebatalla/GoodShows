GoodShows.Views.UsersIndexItem = Backbone.View.extend({
  template: JST['home/users_index_item'],
  render: function () {
    var content = this.template({
      user: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },
  className: 'col-sm-2'
});