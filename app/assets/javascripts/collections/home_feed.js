GoodShows.Collections.HomeFeed = Backbone.Collection.extend({
  url: '/api/feed',
  model: GoodShows.Models.FeedEvent,

  comparator: function (a, b) {
    if (a.get('updated_at') > b.get('updated_at')) {
      return -1;
    } else {
      return 1;
    }
  }
});