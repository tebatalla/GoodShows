GoodShows.Collections.Shows = Backbone.Collection.extend({
  model: GoodShows.Models.Show,
  url: '/api/shows'
});