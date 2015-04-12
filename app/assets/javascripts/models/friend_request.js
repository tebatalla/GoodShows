GoodShows.Models.FriendRequest = Backbone.Model.extend({
  urlRoot: '/api/friend_requests',

  accept: function(options) {
    return $.ajax({
      type: 'POST',
      url: this.url(),
      dataType: 'json',
      data: this.attributes,
      success: options.success,
      error: options.error
    });
  }
});