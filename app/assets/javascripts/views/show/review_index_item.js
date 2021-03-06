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
    this.addCommentsIndex();
  
    return this;
  },
  template: JST['review/index_item'],
  initialize: function (options) {
    if(options) {
      this.user = options.user;
    }

    this.listenTo(this.model, 'sync', this.render);
  },

  addCommentsIndex: function () {
    if(!this.commentsView) {
      this.commentsView = new GoodShows.Views.CommentsIndex({
        collection: this.model.comments(),
        review: this.model
      });

      this.$('.review-body').after(this.commentsView.render().$el);
    }
  },
  className: 'col-lg-12 review-item',

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.commentsView && this.commentsView.remove();
  }
});