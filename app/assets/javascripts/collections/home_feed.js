GoodShows.Collections.HomeFeed = Backbone.Collection.extend({
  url: '/api/feed',
  model: GoodShows.Models.FeedEvent
});