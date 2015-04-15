GoodShows.Views.CommentIndexItem = Backbone.View.extend({
  template: JST['comment/index_item'],
  render: function () {
    var content = this.template({
      comment: this.model,
      author: this.model.author()
    });
    this.$el.html(content);
    return this;
  },

  initialize: function() {
    this.listenTo(this.model, 'reset change', this.render);
  },
  className: 'row comment-index-item'
});