GoodShows.Views.CommentForm = Backbone.View.extend({
  template: JST['comment/form'],
  render: function () {
    var content = this.template();
  
    this.$el.html(content);
  
    return this;
  },

  initialize: function (options) {
    if (options) {
      this.review = options.review;
    }
  },
  className: 'form-inline add-new-comment-form',
  tagName: 'form'
});