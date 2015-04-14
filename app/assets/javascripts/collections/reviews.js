GoodShows.Collections.Reviews = Backbone.Collection.extend({
  model: GoodShows.Models.Review,
  url: '/api/reviews',
  getOrFetch: function (id) {
    var review = this.get(id);

    if (!review) {
      review = new GoodShows.Models.Review({
        id: id
      });
      review.fetch({
        success: function () {
          this.add(review);
        }.bind(this)
      });
    } else {
      review.fetch();
    }

    return review;
  },
});