GoodShows.Views.ShowSearchResultIndex = Backbone.CompositeView.extend({
  template: JST['show_search_result/index'],

  render: function () {
    var content = this.template({
      query: this.query
    });
  
    this.$el.html(content);

    this.collection.each( function (searchResult) {
      var searchResultItemView = new GoodShows.Views.ShowSearchResultIndexItem({
        model: searchResult,
        collection: this.collection
      });
      this.addSubview('.search-results', searchResultItemView);
    }.bind(this));
  
    return this;
  },

  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
    if (options.query) {
      this.query = options.query;
    }
  }
});