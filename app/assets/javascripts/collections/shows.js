GoodShows.Collections.Shows = Backbone.Collection.extend({
  model: GoodShows.Models.Show,
  url: '/shows'
});