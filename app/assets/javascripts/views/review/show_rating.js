GoodShows.Views.ShowRating = Backbone.View.extend({
  template: JST['review/rating'],
  render: function () {

    var content = this.template({
      rating: this.rating,
      typeOfRating: this.typeOfRating,
      avgRating: this.model.get('avg_rating'),
      userRating: this.model.get('user_rating')
    });
  
    this.$el.html(content);
  
    this.$(".show-rating-stars").rating({
      showCaption: false,
      ratingClass: ' ' + this.typeOfRating + '-rating-stars'
    });

    return this;
  },

  events: {
    'rating.change': 'changeRating',
    'rating.clear': 'changeRating'
  },

  changeRating: function (event, value) {
    var newRating = this.reviews.select( function (review) {
      return review.user().get('current_user');
    });
    if (newRating.length > 0) {
      newRating = newRating[0];
    } else{
      newRating = new GoodShows.Models.Review({
        show_id: this.model.id
      });
    }
    value = value || null;
    newRating.save({ rating: value }, {
      success: function() {
        this.model.fetch();
      }.bind(this),
      patch: true
    });
  },

  initialize: function (options) {
    if (options) {
      this.reviews = options.reviews;
    }

    if (this.model.get('user_rating')) {
      this.typeOfRating = 'user';
    } else {
      this.typeOfRating = 'average';
    }
    this.rating = this.model.get('user_rating') || this.model.get('avg_rating') || 0;
  }
});
