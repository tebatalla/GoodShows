GoodShows.Views.ShowRating = Backbone.View.extend({
  template: JST['review/rating'],
  render: function () {

    var typeOfRating;
    if (this.model.get('user_rating')) {
      typeOfRating = 'user';
    } else {
      typeOfRating = 'average';
    }
    var rating = this.model.get('user_rating') || this.model.get('avg_rating') || 0;

    var content = this.template({
      rating: rating,
      typeOfRating: typeOfRating,
      avgRating: this.model.get('avg_rating'),
      userRating: this.model.get('user_rating')
    });
  
    this.$el.html(content);
  
    this.$(".show-rating-stars").rating({
      showCaption: false,
      ratingClass: ' ' + typeOfRating + '-rating-stars'
    });
    return this;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  }
});