GoodShows.Views.ReviewEventItem = Backbone.View.extend({
  template: JST['home/feed_review_item'],
  render: function () {
    var content = this.template({
      activity: this.model,
      review: this.model.review(),
      show: this.model.review().show(),
      user: this.model.user()
    });
  
    this.$el.html(content);

    this.$(".show-rating-stars").rating({
      showCaption: false,
      readonly: true,
      showClear: false,
      ratingClass: ' readonly'
    });
    this.addCommentsIndex();
  
    return this;
  },
  className: 'row',

  addCommentsIndex: function () {
    if(!this.commentsView) {
      this.commentsView = new GoodShows.Views.CommentsIndex({
        collection: this.model.review().comments(),
        review: this.model.review()
      });

      this.$('.review-body').after(this.commentsView.render().$el);
    }
  },
});