GoodShows.Views.FriendRequestsList = Backbone.CompositeView.extend({
  template: JST['user/user_friend_requests'],

  render: function () {
    var content = this.template({
      user: this.user
    });
  
    this.$el.html(content);

    this.attachSubviews();

    return this;
  },

  initialize: function(options) {
    if (options) {
      this.user = options.user;
    }
    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addFriendsListItem);
    this.listenTo(this.collection, "remove", this.removeRequest);
  },

  addFriendsListItem: function (model) {
    var friendsListItemView = new GoodShows.Views.FriendsListItem({
      model: model.user()
    });

    this.addSubview('.friend-requests-list', friendsListItemView);
  },

  removeRequest: function (request) {
    _(this.subviews('.friend-requests-list')).each(function (subview) {
      if(subview.model == request) {
        this.removeSubview('.friend-requests-list', subview);
      }
    }.bind(this));
  },
}); 