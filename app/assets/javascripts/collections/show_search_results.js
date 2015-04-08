GoodShows.Collections.ShowSearchResults = Backbone.Collection.extend({
  url: 'http://api.themoviedb.org/3/search/tv?api_key=000110ac013031af0d42ddce25465b9f&',
  sync: function(method, model, options) {
    var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: this.url,
        processData: false
    }, options);

    return $.ajax(params);
  },

  model: GoodShows.Models.ShowSearchResult,

  parse: function(response) {
    return response.results;
  }
});