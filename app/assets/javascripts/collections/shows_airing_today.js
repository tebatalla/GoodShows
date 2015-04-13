GoodShows.Collections.ShowsAiringToday = Backbone.Collection.extend({
  url: 'http://api.themoviedb.org/3/tv/airing_today?api_key=000110ac013031af0d42ddce25465b9f&',
  sync: function(method, model, options) {
    var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: this.url,
        processData: false
    }, options);

    return $.ajax(params);
  },

  model: GoodShows.Models.Show,

  parse: function(response) {
    return response.results;
  }
});