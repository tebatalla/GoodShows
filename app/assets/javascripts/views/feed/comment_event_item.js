GoodShows.Views.CommentEventItem = Backbone.View.extend({
  template: JST['home/feed_comment_item'],
  render: function () {
    var content = this.template({
      activity: this.model,
      comment: this.model.comment(),
      review: this.model.comment().review(),
      reviewAuthor: this.model.comment().review().user(),
      show: this.model.comment().review().show(),
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
        collection: this.model.comment().review().comments(),
        review: this.model.comment().review()
      });

      this.$('.review-body').after(this.commentsView.render().$el);
    }
  },
});