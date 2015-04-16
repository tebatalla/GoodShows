GoodShows.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['comment/index'],
  render: function () {
    var content = this.template({

    });
  
    this.$el.html(content);
    this.attachSubviews();
  
    return this;
  },

  events: {
    'click .add-comment-form-button': 'renderCommentForm',
    'click form .add-comment-cancel': 'removeCommentForm',
    'submit form': 'addNewComment'
  },

  renderCommentForm: function (event) {
    event.preventDefault();
    if (!this.newComment) {
      this.newComment = new GoodShows.Views.CommentForm({
        review: this.review
      });

      this.$('.comment-index').append(this.newComment.render().$el);
      this.delegateEvents();
    }
  },

  addNewComment: function (event) {
    event.preventDefault();
    var comment = $(event.currentTarget).serializeJSON();
    this.review.postComment(comment, {
      success: function (response) {
        this.collection.add(response, { parse: true });
        this.removeCommentForm();
      }.bind(this)
    });
  },

  removeCommentForm: function (event) {
    event && event.preventDefault();
    this.newComment.remove();
    this.newComment = null;
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
  className: 'row comment-index-wrapper',

  remove: function () {
    Backbone.CompositeView.prototype.remove.call(this);
    this.newComment && this.newComment.remove();
  }
});