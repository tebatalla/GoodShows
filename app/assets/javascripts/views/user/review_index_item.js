GoodShows.Views.UserReviewIndexItem = Backbone.View.extend({
  template: JST['user/review_index_item'],
  render: function () {
    var content = this.template({
      show: this.model.show(),
      review: this.model
    });
  
    this.$el.html(content);

    this.$(".show-rating-stars").rating({
      showCaption: false,
      readonly: true,
      showClear: false,
      ratingClass: ' readonly'
    });
  
    return this;
  },
  initialize: function () {
    this.listenTo(this.model.show(), 'change', this.render);
  },
  className: 'row review-item'
});