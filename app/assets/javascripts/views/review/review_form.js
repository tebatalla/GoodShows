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
    if (this.model) {
      this.listenTo(this.model, 'sync', this.render);
    }
    this.listenTo(this.show, 'sync', this.addShowRating);
  },

  events: {
    'keyup .review-write': 'updatePreview',
    'submit form': 'updateReview'
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
  },

  updateReview: function (event) {
    event.preventDefault();
    var review = $(event.currentTarget).serializeJSON().review;

    var newRating = this.show.reviews().select( function (review) {
      return review.user().get('current_user');
    });
    if (newRating.length > 0) {
      newRating = newRating[0];
    } else{
      newRating = new GoodShows.Models.Review({
        show_id: this.show.id
      });
    }

    newRating.save({ review: review }, {
      success: function() {
        Backbone.history.navigate('shows/' + this.show.id, { trigger: true });
      }.bind(this),
      patch: true
    });
  }
});