GoodShows.Views.ProfileOptionView = Backbone.View.extend({
  render: function () {
    var content = this.template({
      user: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },

  template: JST['user/user_profile_option'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  tagName: 'span',

  events: {
    'click .unfriend-request': 'unfriend',
    'click .send-friend-request': 'friend',
    'click .pending-friend-request': 'acceptFriend'
  },

  unfriend: function() {
    event.preventDefault();
    $(event.currentTarget).toggleClass('active');
  },

  friend: function (event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass('active');
    var friendProposal = new GoodShows.Models.FriendProposal({
      target_id: this.model.id
    });
    friendProposal.save({}, {
      success: function (friendProposal) {
        $(event.currentTarget).toggleClass('active');
        this.model.friendProposals().add(friendProposal);
      }.bind(this),
      error: function () {
        $(event.currentTarget).toggleClass('active');
      }
    });
  },

  acceptFriend: function () {
    event.preventDefault();
    $(event.currentTarget).toggleClass('active');
    var friendRequest = new GoodShows.Models.FriendRequest({
      requester_id: this.model.id
    });
    friendRequest.accept({
      success: function (friend) {
        $(event.currentTarget).toggleClass('active');
        this.model.friends().add(friend);
      }.bind(this),
      error: function () {
        $(event.currentTarget).toggleClass('active');
      }
    });
  }
});