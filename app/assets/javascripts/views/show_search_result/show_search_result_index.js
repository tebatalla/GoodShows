GoodShows.Views.ShowSearchResultIndex = Backbone.CompositeView.extend({
  template: JST['show_search_result/index'],

  render: function () {
    var content = this.template({});
  
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

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  }
});