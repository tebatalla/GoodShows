GoodShows.Views.ShowShow = Backbone.CompositeView.extend({
  template: JST['show/show'],

  render: function () {
    var content = this.template({
      show: this.model
    });
  
    this.$el.html(content);

    this.$('.add-to-shelf').html(this.shelvesButton.$el);

    this.rating && this.rating.remove();
    this.rating = new GoodShows.Views.ShowRating({
      model: this.model,
      reviews: this.model.reviews()
    });

    this.$('.show-rating').html(this.rating.render().$el);
    this.attachSubviews();
  
    return this;
  },

  initialize: function (options) {
    if (options.shelves) {
      this.shelves = options.shelves;
    }

    this.shelvesButton = new GoodShows.Views.ShowShelfButton({
      collection: this.shelves,
      show: this.model
    });

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.reviews(), 'add', this.addReview)
  },

  className: 'row show-page',

  remove: function () {
    Backbone.CompositeView.prototype.remove.call(this);
    this.shelvesButton && this.shelvesButton.remove();
    this.rating && this.rating.remove();
  },

  addReview: function (review) {
    var view = new GoodShows.Views.ShowReviewIndexItem({
      model: review,
      user: review.user()
    });
    if (review.get('review')){
      this.addSubview('.reviews-index', view);
    }
  }
});