GoodShows.Views.ReviewEventItem = Backbone.View.extend({
  template: JST['home/feed_review_item'],
  render: function () {
    var content = this.template({
      activity: this.model,
      review: this.model.review()
    });
  
    this.$el.html(content);
  
    return this;
  },
});