GoodShows.Views.FriendsList = Backbone.CompositeView.extend({
  template: JST['user/user_friends'],

  render: function () {
    var content = this.template({});
  
    this.$el.html(content);

    this.attachSubviews();

    return this;
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addFriendsListItem);
    this.listenTo(this.collection, 'remove', this.removeFriendsListItem);
    this.listenTo(this.collection, 'sync', this.render);
  },

  addFriendsListItem: function (model) {
    var friendsListItemView = new GoodShows.Views.FriendsListItem({
      model: model
    });

    this.addSubview('.friends-list', friendsListItemView);
  },

  removeFriendsListItem: function (friend) {
    _(this.subviews('.friends-list')).each(function (subview) {
      if(subview.model == friend) {
        this.removeSubview('.friends-list', subview);
      }
    }.bind(this));
  },
}); 