GoodShows.Views.ShowSearchResultIndexItem = Backbone.View.extend({
  template: JST['show_search_result/index_item'],

  render: function () {
    var content = this.template({
      show: this.model
    });
  
    this.$el.html(content);
  
    return this;
  }
});