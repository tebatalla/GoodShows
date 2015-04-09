GoodShows.Views.ShowSearchResultIndex = Backbone.CompositeView.extend({
  template: JST['show_search_result/index'],

  render: function () {
    var content = this.template({
      query: this.query
    });
  
    this.$el.html(content);

    this.attachSubviews();    
  
    return this;
  },

  initialize: function (options) {
    if (options.query) {
      this.query = options.query;
    }
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addSearchResultItemView);
    this.collection.each(this.addSearchResultItemView.bind(this));
  },

  addSearchResultItemView: function (searchResult) {
    var searchResultItemView = new GoodShows.Views.ShowSearchResultIndexItem({
      model: searchResult,
      collection: this.collection
    });
    this.addSubview('.search-results', searchResultItemView);
  }
});