GoodShows.Views.ReviewForm = Backbone.View.extend({
  template: JST['review/form'],
  render: function () {
    var content = this.template({
      show: this.show,
      review: this.model
    });
  
    this.$el.html(content);
    this.addShowRating();
  
    return this;
  },

  initialize: function (options) {
    if (options) {
      this.show = options.show;
    }

    this.listenToOnce(this.show, 'sync', this.render);
    this.listenTo(this.show, 'sync', this.addShowRating);
  },

  events: {
    'keyup .review-write': 'updatePreview'
  },

  addShowRating: function () {

    var showRating = new GoodShows.Views.ShowRating({
      model: this.show,
      reviews: this.show.reviews()
    });

    this.$('.show-rating').html(showRating.render().$el);
  },

  updatePreview: function (event) {
    event.preventDefault();
    var text = $(event.currentTarget).val();

    this.$('.review-preview').html(marked(text));
  }
});