GoodShows.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['user/user_profile'],

  render: function () {
    var content = this.template({
      user: this.model
    });
  
    this.$el.html(content);
    this.attachSubviews();
  
    return this;
  },

  initialize: function (options) {
    if(options) {

    }
    this.listenTo(this.model, "sync", this.render);
    this.addFriendsList();
  },

  addFriendsList: function () {

    var friendsListView = new GoodShows.Views.FriendsList({
      collection: this.model.friends()
    });

    this.addSubview('.friends-list-wrapper', friendsListView);
  }
});