GoodShows.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['comment/index'],
  render: function () {
    var content = this.template({

    });
  
    this.$el.html(content);
    this.attachSubviews();
  
    return this;
  },

  initialize: function(options) {
    if (options) {
      this.review = options.review;
    }
    this.listenTo(this.collection, 'add', this.addComment);
    this.collection.each(this.addComment.bind(this));
  },

  addComment: function (comment) {
    var commentItem = new GoodShows.Views.CommentIndexItem({
      model: comment
    });

    this.addSubview('.comment-index', commentItem);
  },
  className: 'row comment-index-wrapper'
});