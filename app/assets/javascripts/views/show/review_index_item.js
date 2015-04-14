GoodShows.Views.ShowReviewIndexItem = Backbone.View.extend({
  render: function () {
    var content = this.template({
      review: this.model,
      user: this.user
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
  template: JST['review/index_item'],
  initialize: function (options) {
    if(options) {
      this.user = options.user;
    }

    this.listenTo(this.model, 'sync', this.render);
  },
  className: 'row review-index-item'
});