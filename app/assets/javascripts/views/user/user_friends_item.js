GoodShows.Views.FriendsListItem = Backbone.View.extend({
  render: function () {
    var content = this.template({
      friend: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },

  template: JST['user/user_friends_item'],

  className: 'row friends-list-item',

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  }
});